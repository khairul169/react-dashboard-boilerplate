import React, { useEffect, useState } from 'react';

const Switch = ({
  value, caption, label, onChange, className, readOnly,
}) => {
  const [switchValue, setValue] = useState(value);

  useEffect(() => {
    if (value !== undefined && value !== switchValue) {
      setValue(value);
    }
  }, [value]);

  const onValueChange = () => {
    const newValue = !switchValue;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  let switchLabel = label;
  if (Array.isArray(label)) {
    switchLabel = switchValue ? label[0] : label[1];
  }

  return (
    <div className={className}>
      {caption && <p className="text-xs mb-1 block">{caption}</p>}
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only" onChange={!readOnly ? onValueChange : null} />
          <div className={`block w-14 h-8 rounded-full transition ${switchValue ? 'bg-primary-500' : 'bg-primary-300'}`} />
          <div
            className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
            style={switchValue ? { transform: 'translateX(100%)' } : null}
          />
        </div>
        {label && (
        <div className="ml-3 text-gray-700 text-sm">
          { switchLabel }
        </div>
        )}
      </label>
    </div>
  );
};

export default Switch;
