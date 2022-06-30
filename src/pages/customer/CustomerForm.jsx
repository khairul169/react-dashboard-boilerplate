import React from 'react';
import TextInput from '../../partials/components/TextInput';
import FormModal from '../../partials/containers/FormModal';
import { useFormData } from '../../utils/Utils';

const CustomerForm = ({
  data, onSave, onClose,
}) => {
  const [formData, setData] = useFormData(data, true);

  return (
    <FormModal
      title="Form Customer"
      data={data}
      onClose={onClose}
      onSave={() => onSave(formData)}
    >
      {formData && (
        <div className="grid grid-cols-2 gap-4">

          <TextInput
            label="Nama Lengkap"
            value={formData.name}
            onChangeText={setData('name')}
          />
          <TextInput
            label="No. Telepon"
            value={formData.phone}
            onChangeText={setData('phone')}
          />
        </div>
      )}
    </FormModal>
  );
};

export default CustomerForm;
