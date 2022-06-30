import React from 'react';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import Dashboard from '../../partials/layout/Dashboard';
import Table from '../../partials/containers/Table';
import TextInput from '../../partials/components/TextInput';
import Button from '../../partials/components/Button';
import useUsersController from './usersController';
import UsersForm from './UsersForm';
import DialogModal from '../../partials/containers/DialogModal';

const initialFormValues = {
  name: '',
  username: '',
  password: '',
};

const UsersPage = () => {
  const controller = useUsersController();

  return (
    <Dashboard title="Pengguna">
      <div className="mb-5 grid sm:grid-cols-2 md:grid-cols-4 lg:flex gap-3 items-center">
        <TextInput
          className="lg:w-48"
          placeholder="Cari pengguna..."
          large
          onSubmit={controller.setQuery('name')}
        />
        <div className="hidden lg:block lg:flex-1" />
        <Button className="bg-primary-500" icon={FaPlus} onClick={() => controller.setForm(initialFormValues)}>
          Tambah
        </Button>
      </div>
      <Table
        headers={[
          { key: 'name', title: 'Nama Lengkap' },
          { key: 'username', title: 'Username' },
        ]}
        items={controller.items}
        query={controller.query}
        actions={(item) => (
          <>
            <Button icon={FaPencilAlt} onClick={() => controller.setForm(item)} />
            <Button
              className="bg-red-500"
              icon={FaTrash}
              onClick={() => controller.setModalDelete(item.id)}
            />
          </>
        )}
        onChangePage={controller.setQuery('page')}
      />
      <UsersForm
        data={controller.form}
        onSave={controller.saveData}
        onDelete={controller.deleteItem}
        onClose={() => controller.setForm()}
      />
      <DialogModal
        visible={!!controller.modalDelete}
        setVisible={controller.setModalDelete}
        onConfirm={controller.deleteItem}
      />
    </Dashboard>
  );
};

export default UsersPage;
