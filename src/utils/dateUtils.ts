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

  export const formatDateToStringDDMMYYYY = (date: Date): string => {

    const yyyy = date.getFullYear();
    const month = date.getMonth() + 1; // Months start at 0!
    const day = date.getDate();

    let mm=`${month}`
    let dd=`${day}`
    if(month<10){mm='0'+mm}
    if(day<10){dd='0'+dd}

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
