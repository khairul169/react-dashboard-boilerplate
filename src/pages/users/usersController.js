import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/http_service';
import { useFormData } from '../../utils/Utils';

const useUsersController = () => {
  const [items, setItems] = useState();
  const [form, setForm] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [query, setQuery] = useFormData({
    name: '',
    role: null,
    limit: 10,
    page: 1,
  });

  const fetchData = async () => {
    try {
      const { result } = await api.get('/user/search', { params: query });
      setItems(result);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveData = async (formData) => {
    try {
      if (!formData?.id) {
        await api.post('/user', formData);
      } else {
        await api.patch(`/user/${formData.id}`, formData);
      }

      fetchData();
      setForm();
      toast.success(`Sukses ${formData?.id ? 'mengubah' : 'menambah'} user!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteItem = async () => {
    if (!modalDelete) {
      return;
    }

    try {
      await api.delete(`/user/${modalDelete}`);
      fetchData();
      setModalDelete(false);
      toast.success('Sukses menghapus user!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return {
    items,
    form,
    query,
    modalDelete,
    setModalDelete,
    setForm,
    setQuery,
    saveData,
    deleteItem,
  };
};

export default useUsersController;
