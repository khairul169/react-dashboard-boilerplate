import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Routes, BrowserRouter, Navigate,
} from 'react-router-dom';
import { fetchUser } from './redux/states/auth';

// Import pages
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import UsersPage from './pages/users/UsersPage';
import CustomerPage from './pages/customer/CustomerPage';

const Router = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.loggedIn) {
      dispatch(fetchUser());
    }
  }, [auth.loggedIn]);

  if (auth.loggedIn && !auth.user) {
    return null;
  }

  return (
    <BrowserRouter>
      {!auth.loggedIn ? (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
