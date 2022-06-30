import React from 'react';
import './css/style.scss';

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Router from './Router';
import { store } from './redux/store';

const App = () => (
  <Provider store={store}>
    <Router />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>
);

export default App;
