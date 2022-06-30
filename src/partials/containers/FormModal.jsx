import React from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';

const FormModal = ({
  title, data, onClose, onSave, children,
}) => (
  <Modal
    visible={data != null}
    setVisible={onClose}
  >
    {title && (
    <div className="px-8 py-3 shadow-md">
      <h2 className="text-xl text-center">{title}</h2>
    </div>
    )}

    <div className="p-6">
      {children}
      <hr className="my-4" />
      <div className="flex gap-3">
        <Button alt className="flex-1" onClick={onClose}>
          Kembali
        </Button>
        {onSave && (
          <Button className="flex-1" onClick={onSave}>
            Simpan
          </Button>
        )}
      </div>
    </div>
  </Modal>
);

export default FormModal;
