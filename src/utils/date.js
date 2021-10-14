const today = new Date();
const defaultLocale = 'en-us';
const defaultOption = { day: '2-digit', month: '2-digit', year: '2-digit' };

export const getFirstDay = () => new Date(today.getFullYear(), today.getMonth(), 1);

export const getYesterday = () => new Date(new Date().setDate(today.getDate() - 1));

export const toDateString = (date, opts = { separator: '-' }) => {
  if (!date || Number.isNaN(new Date(date).getTime())) return date;
  const d = new Date(date);
  return d.getFullYear() + opts.separator
  + (`0${d.getMonth() + 1}`).slice(-2) + opts.separator
  + (`0${d.getDate()}`).slice(-2);
};

export const formatDate = (date, locale = defaultLocale, option = defaultOption) => {
  try {
    return new Intl.DateTimeFormat(locale, option).format(new Date(date || '')) || '-';
  } catch (err) {
    return '-';
  }
};

export const prefixDate = (str = '') => {
  const today = new Date();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  return `${today.getFullYear()}-${month}-${str}`;
};
