import React from 'react';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import Dashboard from '../../partials/layout/Dashboard';
import Table from '../../partials/containers/Table';
import TextInput from '../../partials/components/TextInput';
import Button from '../../partials/components/Button';
import useCustomerController from './customerController';
import CustomerForm from './CustomerForm';
import DialogModal from '../../partials/containers/DialogModal';
import { formatDate } from '../../utils/Utils';

const initialFormValues = {
  name: '',
  phone: '',
};

const CustomerPage = () => {
  const controller = useCustomerController();

  return (
    <Dashboard title="Customers">
      <div className="mb-5 grid sm:grid-cols-2 md:grid-cols-4 lg:flex gap-3 items-center">
        <TextInput
          className="lg:w-48"
          placeholder="Cari customer..."
          large
          onSubmit={controller.setQuery('search')}
        />
        <div className="hidden lg:block lg:flex-1" />
        <Button className="bg-primary-500" icon={FaPlus} onClick={() => controller.setForm(initialFormValues)}>
          Tambah
        </Button>
      </div>
      <Table
        headers={[
          { key: 'name', title: 'Nama Lengkap' },
          { key: 'phone', title: 'No. Telepon' },
          {
            key: 'createdAt',
            title: 'Ditambahkan',
            format: (date) => formatDate(date, false, true),
          },
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
      <CustomerForm
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

export default CustomerPage;
