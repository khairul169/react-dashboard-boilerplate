import React from 'react';

const DetailItem = ({ label, value, className }) => (
  <div className={['grid grid-cols-3 gap-3 py-3 border-b border-slate-200', className].join(' ')}>
    <p className="text-xs font-medium">{label}</p>
    <p className="text-sm col-span-2">{value || '-'}</p>
  </div>
);

export default DetailItem;
