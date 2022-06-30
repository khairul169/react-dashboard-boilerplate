import { useCallback, useEffect, useState } from 'react';

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const useFormData = (values, refresh = false, formatter = null) => {
  const [state, setState] = useState(formatter ? formatter(values) : values);

  const updateState = useCallback((stx, replace = false) => {
    setState(replace ? stx : (st) => ({ ...st, ...stx }));
  }, []);

  const updater = useCallback((key, formatFn) => (value) => {
    updateState({ [key]: formatFn ? formatFn(value) : value });
  }, []);

  useEffect(() => {
    if (refresh && values != null) {
      setState(formatter ? formatter(values) : values);
    }
  }, [values]);

  return [state, updater, updateState];
};

export const formatNumber = (number) => {
  const text = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number || 0);

  return text.replace(/\xa0/g, ' ').replace(/\u202f/g, ' ');
};

export const formatDate = (date, hideTime = false, short = false) => {
  let dateObj = Date.parse(date);

  if (!dateObj) {
    dateObj = new Date(Date.now());
  }

  return new Intl.DateTimeFormat('id', {
    weekday: !short ? 'long' : undefined,
    day: 'numeric',
    month: !short ? 'long' : 'short',
    year: 'numeric',
    hour: !hideTime ? 'numeric' : undefined,
    minute: !hideTime ? 'numeric' : undefined,
  }).format(dateObj);
};

export const formatTime = (date) => {
  const dateObj = Date.parse(date);

  if (!dateObj) {
    return '-';
  }

  return new Intl.DateTimeFormat('id', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(dateObj);
};
