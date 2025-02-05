"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDatePostgres = exports.isValidDate = exports.formatDateToStringDDMMYYYY = exports.convertToLocalDateTime = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const localTimeZone = 'America/Argentina/Buenos_Aires';
/**
 * Converts a Date object to a full DateTime string in local timezone.
 * @param {Date} date
 * @returns {string} Local DateTime (YYYY-MM-DD HH:mm:ss)
 */
const convertToLocalDateTime = (date) => {
    const localDateTime = (0, date_fns_tz_1.toZonedTime)(date, localTimeZone);
    return (0, date_fns_tz_1.format)(localDateTime, 'yyyy-MM-dd HH:mm:ss', { timeZone: localTimeZone });
};
exports.convertToLocalDateTime = convertToLocalDateTime;
const formatDateToStringDDMMYYYY = (date) => {
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
exports.formatDateToStringDDMMYYYY = formatDateToStringDDMMYYYY;
const isValidDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
};
exports.isValidDate = isValidDate;
const formatDatePostgres = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}/${month}/${day}`;
};
exports.formatDatePostgres = formatDatePostgres;
