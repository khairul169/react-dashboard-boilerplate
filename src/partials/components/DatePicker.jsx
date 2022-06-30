import React from 'react';
import Flatpickr from 'react-flatpickr';

const DatePicker = ({
  label, value, className, inputClassName, onChange,
  multi = false, readOnly = false,
}) => {
  const today = new Date();

  const options = {
    mode: multi ? 'range' : 'single',
    // position: 'below right',
    // static: true,
    monthSelectorType: 'static',
    dateFormat: multi ? 'd/m/y' : 'M j, Y',
    // defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
    defaultDate: [today, today],
    prevArrow:
      '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      instance.element.value = dateStr.replace('to', '-');
    },
    onChange: (selectedDates, dateStr, instance) => {
      instance.element.value = dateStr.replace('to', '-');
    },
  };

  return (
    <div className={className}>
      {label && <label className="text-xs mb-1 block">{label}</label>}
      <div className="relative">
        <Flatpickr
          className={['form-input w-full pl-9 text-slate-500 hover:text-slate-600 focus:border-slate-300', inputClassName].join(' ')}
          options={options}
          onChange={!readOnly ? (values) => {
            onChange && onChange(multi ? values : values[0]);
          } : null}
          value={value}
          disabled={readOnly}
        />
        <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 fill-current text-slate-500 ml-3"
            viewBox="0 0 16 16"
          >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
