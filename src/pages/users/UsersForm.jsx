import React from 'react';
import Select from '../../partials/components/Select';
import TextInput from '../../partials/components/TextInput';
import FormModal from '../../partials/containers/FormModal';
import { useFormData } from '../../utils/Utils';

const UserForm = ({
  data, onSave, onClose,
}) => {
  const [formData, setData] = useFormData(data, true);

  return (
    <FormModal
      title="Form User"
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
            label="Username"
            value={formData.username}
            onChangeText={setData('username')}
          />
          <TextInput
            label="Password"
            type="password"
            value={formData.password || ''}
            onChangeText={setData('password')}
          />
        </div>
      )}
    </FormModal>
  );
};

export default UserForm;
