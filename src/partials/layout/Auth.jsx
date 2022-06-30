import React from 'react';
import logo from '../../images/logo.png';

const Auth = ({ title, children }) => (
  <div className="flex w-full h-screen overflow-hidden items-center justify-center" style={{ background: '#f6f5fa' }}>
    <div
      className="bg-white flex flex-col shadow-md rounded-md px-6 py-6 md:px-12 md:py-10 flex-1"
      style={{ maxWidth: 500 }}
    >
      {/* <div className="self-center">
        <img src={logo} className="w-20" />
        <p
          className="text-xl font-bold text-center mt-3"
          style={{ color: '#0096A6' }}
        >
          SISPAN
        </p>
      </div> */}
      <h1 className="text-2xl border-b border-muted-300 mt-0 pb-3 mb-8">
        {title}
      </h1>
      {children}
    </div>
  </div>
);

export default Auth;
