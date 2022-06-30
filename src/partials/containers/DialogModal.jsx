import React from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';

const DialogModal = ({ visible, setVisible, onConfirm }) => (
  <Modal visible={visible} setVisible={setVisible}>
    <div className="px-8 py-6 shadow-md">
      <h2 className="text-xl text-center">Hapus item?</h2>
    </div>
    <div className="p-8 pt-16">
      <p className="text-center">
        Apakah anda yakin ingin menghapus item ini?
        <br />
        item yang sudah terhapus tidak dapat dikembalikan.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-16">
        <Button alt onClick={() => setVisible(false)}>
          Batal
        </Button>
        <Button
          onClick={() => {
            onConfirm && onConfirm();
            setVisible(false);
          }}
        >
          Hapus Item
        </Button>
      </div>
    </div>
  </Modal>
);

export default DialogModal;
