import React from 'react';

const TextInput = ({
  type,
  placeholder,
  label,
  defaultValue,
  value,
  className,
  inputClassName,
  // small = false,
  icon: Icon,
  onChangeText,
  onSubmit,
  readOnly,
  disabled,
}) => (
  <div className={className}>
    {label && <label className="text-xs mb-1 block">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-0 top-0 ml-3 mt-3" />}
      <input
        type={type || 'text'}
        className={[
        // `border border-slate-400 rounded-md text-xs ${
        //   small ? 'py-2 px-3' : 'p-3'
        // } text-black w-full`,
          'form-input w-full',
          disabled ? 'bg-gray-100 text-gray-500' : null,
          Icon ? 'pl-8' : null,
          inputClassName,
        ].join(' ')}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value === null ? '' : value}
        onChange={(e) => onChangeText && onChangeText(e.target.value)}
        onKeyDown={
          onSubmit
            ? (event) => {
              if (event.key === 'Enter') {
                onSubmit(event.target.value);
              }
            }
            : null
        }
        readOnly={readOnly}
        disabled={disabled || readOnly}
      />
    </div>
  </div>
);

export default TextInput;
