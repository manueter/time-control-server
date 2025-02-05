import { format, toZonedTime } from 'date-fns-tz';

const localTimeZone = 'America/Argentina/Buenos_Aires';

/**
 * Converts a Date object to a full DateTime string in local timezone.
 * @param {Date} date
 * @returns {string} Local DateTime (YYYY-MM-DD HH:mm:ss)
 */
export const convertToLocalDateTime = (date: Date): string => {
  const localDateTime = toZonedTime(date, localTimeZone);
  return format(localDateTime, 'yyyy-MM-dd HH:mm:ss', { timeZone: localTimeZone });
};


export const formatDateToStringDDMMYYYY = (date: Date): string => {
  const yyyy = date.getFullYear();
  const month = date.getMonth() + 1; // Months start at 0!
  const day = date.getDate();

  let mm = `${month}`;
  let dd = `${day}`;
  if (month < 10) {
    mm = "0" + mm;
  }
  if (day < 10) {
    dd = "0" + dd;
  }

  return `${dd}/${mm}/${yyyy}`;
};

export const isValidDate = (date: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
};

export const formatDatePostgres = (date: string): string => {
  const [day, month, year] = date.split("/");
  return `${year}/${month}/${day}`;
};
