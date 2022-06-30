/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import TextInput from './TextInput';

const AutoCompleteInput = ({
  label, value, onChange, items, onLookup, onClose,
  onSelect, itemRender, className, inputClassName,
}) => {
  const containerRef = useRef();
  const delayRef = useRef();

  const handleMouseUp = useCallback((event) => {
    if (!items) {
      return;
    }

    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClose && onClose();
    }
  }, [items]);

  useEffect(() => {
    if (!items) {
      return null;
    }

    const handler = document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handler);
    };
  }, [items]);

  const onInputChange = (text) => {
    onChange && onChange(text);

    if (onLookup) {
      delayRef.current && clearTimeout(delayRef.current);
      delayRef.current = setTimeout(() => onLookup(text), 500);
    }
  };

  const defaultRender = useMemo((item) => (
    <p className="text-sm">{item?.label || ''}</p>
  ), []);

  return (
    <div className={['relative', className].join(' ')}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onInputChange}
        className={inputClassName}
      />
      {items?.length > 0 && (
      <div
        ref={containerRef}
        className="absolute z-10 top-16 w-full bg-white rounded-sm border border-slate-200 shadow-md"
        style={{ maxHeight: 300, overflowY: 'auto' }}
      >
        {items.map((item, idx) => (
          <a
            key={`item-${idx}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect && onSelect(idx);
              onClose && onClose();
            }}
            href="#"
            className={`px-4 py-2 w-full block ${idx > 0 ? 'border-t border-slate-200' : ''}`}
          >
            {itemRender ? itemRender(item) : defaultRender(item)}
          </a>
        ))}
      </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
