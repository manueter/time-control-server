// utils/dateUtils.ts
import { toZonedTime, format } from 'date-fns-tz';

/**
 * Converts the given time to the specified time zone and formats it to a string.
 * 
 * @param {Date} date - The date object to convert.
 * @param {string} timeZone - The time zone to convert the date to.
 * @returns {string} - The formatted time string in the specified time zone.
 */
export const convertToLocalTime = (date: Date, timeZone: string): string => {
  // Convert the date to the target time zone and then format it
  const localDate = toZonedTime(date, timeZone);
  return format(localDate, 'yyyy-MM-dd HH:mm:ss', { timeZone });};
