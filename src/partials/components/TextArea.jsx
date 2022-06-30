import React from 'react';

const TextArea = ({
  placeholder,
  label,
  defaultValue,
  value,
  className,
  inputClassName,
  onChangeText,
  readOnly = false,
  minHeight = 120,
  // small = false,
}, ref) => (
  <div className={className}>
    {label && <label className="text-xs mb-1 block">{label}</label>}
    <textarea
      className={[
        // `border border-slate-400 rounded-md text-xs ${
        //   small ? 'py-2 px-3' : 'p-3'
        // } text-black w-full`,
        'form-input w-full',
        inputClassName,
      ].join(' ')}
      style={{ minHeight }}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value === null ? '' : value}
      onChange={(e) => onChangeText && onChangeText(e.target.value)}
      disabled={readOnly}
      readOnly={readOnly}
      ref={ref}
    />
  </div>
);

export default React.forwardRef(TextArea);
