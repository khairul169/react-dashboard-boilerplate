import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../partials/components/Button';
import TextInput from '../../partials/components/TextInput';
import Auth from '../../partials/layout/Auth';
import { fetchUser } from '../../redux/states/auth';
import { api, setAccessToken } from '../../services/http_service';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', // 'user',
    password: '', // '123',
  });

  const updateForm = (state) => setFormData((s) => ({ ...s, ...state }));

  const onLogin = async () => {
    try {
      const { result } = await api.post('/auth/login', formData);

      if (!result?.token) {
        throw new Error('Login gagal!');
      }

      setAccessToken(result.token);
      dispatch(fetchUser());

      navigate('/', { replace: true });
    } catch (err) {
      toast.error(`Login gagal! err: ${err.message}`);
    }
  };

  return (
    <Auth title="Masuk">
      <TextInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(val) => updateForm({ username: val })}
        onSubmit={onLogin}
        large
      />
      <TextInput
        placeholder="Password"
        type="password"
        className="mt-5"
        value={formData.password}
        onChangeText={(val) => updateForm({ password: val })}
        onSubmit={onLogin}
        large
      />

      <Button className="mt-8 w-full" onClick={onLogin}>
        Masuk
      </Button>
    </Auth>
  );
};

export default Login;
