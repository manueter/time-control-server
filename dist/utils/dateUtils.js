"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToLocalTime = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const localTimeZone = 'America/Argentina/Buenos_Aires';
/**
 * Converts the given time to the specified time zone and formats it to a string.
 *
 * @param {Date} date
 * @returns {string}
 */
const convertToLocalTime = (date) => {
    const localDate = (0, date_fns_tz_1.toZonedTime)(date, localTimeZone);
    return (0, date_fns_tz_1.format)(localDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: localTimeZone });
};
exports.convertToLocalTime = convertToLocalTime;
