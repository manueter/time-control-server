import { toZonedTime, format } from 'date-fns-tz';

const localTimeZone = 'America/Argentina/Buenos_Aires'; 

/**
 * Converts the given time to the specified time zone and formats it to a string.
 * 
 * @param {Date} date
 * @returns {string}
 */

  export const convertToLocalTime = (date: Date): string => {
    const localDate = toZonedTime(date, localTimeZone);
    return format(localDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: localTimeZone });
  };