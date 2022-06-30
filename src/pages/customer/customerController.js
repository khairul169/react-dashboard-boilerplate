import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/http_service';
import { useFormData } from '../../utils/Utils';

const useCustomerController = () => {
  const [items, setItems] = useState();
  const [form, setForm] = useState();
  const [modalDelete, setModalDelete] = useState(false);

  const [query, setQuery] = useFormData({
    search: '',
    limit: 10,
    page: 1,
  });

  const fetchData = async () => {
    try {
      const { result } = await api.get('/customer', { params: query });
      setItems(result);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveData = async (formData) => {
    try {
      if (!formData?.id) {
        await api.post('/customer', formData);
      } else {
        await api.patch(`/customer/${formData.id}`, formData);
      }

      fetchData();
      setForm();
      toast.success(`Sukses ${formData?.id ? 'mengubah' : 'menambah'} customer!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteItem = async () => {
    if (!modalDelete) {
      return;
    }

    try {
      await api.delete(`/customer/${modalDelete}`);
      fetchData();
      setModalDelete(false);
      toast.success('Sukses menghapus customer!');
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

export default useCustomerController;
