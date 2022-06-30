import React from 'react';

const Panel = ({
  title, actions, children, className,
}) => (
  <div
    className={[
      'flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden',
      className,
    ].join(' ')}
  >
    {title && (
    <div className="flex gap-3 items-center px-5">
      <header className="flex-1 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      {actions}
    </div>
    )}
    {children}
  </div>
);

export default Panel;
