// eslint-disable-next-line import/no-unresolved
// import { registerSW } from 'virtual:pwa-register';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

// registerSW({
//   onNeedRefresh() {},
//   onOfflineReady() {},
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
