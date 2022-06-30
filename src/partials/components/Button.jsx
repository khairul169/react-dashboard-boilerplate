import React from 'react';

const Button = ({
  children, alt = false, onClick, icon: Icon, className, full,
  disabled = false,
}) => (
  <button
    type="button"
    className={[
      'btn text-white px-3 py-2 text-sm shadow-md',
      !className?.includes('bg-') && !alt
        ? 'bg-secondary-500 hover:bg-secondary-600 '
        : null,
      alt ? 'bg-white shadow-none text-gray-900 hover:bg-gray-200' : null,
      full ? 'w-full' : null,
      className,
    ].join(' ')}
    onClick={onClick}
    disabled={disabled}
  >
    {Icon && <Icon />}
    {children?.length && (
      <span className={Icon ? 'ml-2' : null}>{children}</span>
    )}
  </button>
);

export default Button;
