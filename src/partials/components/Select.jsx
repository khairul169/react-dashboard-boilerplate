import React, { useEffect, useMemo } from 'react';
import ReactSelect from 'react-select';

const Select = ({
  label,
  placeholder,
  value,
  defaultValue,
  items,
  onChange,
  className,
  containerClassName,
  full = false,
  required = false,
  isSearchable = false,
}) => {
  useEffect(() => {
    if (required && !value && items?.length > 0) {
      onChange(items[0]?.value);
    }
  }, [value]);

  const listItems = useMemo(() => {
    if (!items) {
      return [];
    }

    return items.map((item) => ({ value: item.value, label: item.name }));
  }, [items]);

  return (
    <div className={containerClassName}>
      {label && <label className="text-xs mb-1 block">{label}</label>}

      <ReactSelect
        className={`text-sm ${className}`}
        placeholder={placeholder}
        options={listItems}
        value={listItems.find((item) => item.value === value)}
        onChange={(e) => onChange(e.value)}
        isSearchable={isSearchable}
      />
    </div>
  );
};

export default Select;
