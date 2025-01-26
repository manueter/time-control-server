"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToLocalTime = void 0;
// utils/dateUtils.ts
const date_fns_tz_1 = require("date-fns-tz");
/**
 * Converts the given time to the specified time zone and formats it to a string.
 *
 * @param {Date} date - The date object to convert.
 * @param {string} timeZone - The time zone to convert the date to.
 * @returns {string} - The formatted time string in the specified time zone.
 */
const convertToLocalTime = (date, timeZone) => {
    // Convert the date to the target time zone and then format it
    const localDate = (0, date_fns_tz_1.toZonedTime)(date, timeZone);
    return (0, date_fns_tz_1.format)(localDate, 'yyyy-MM-dd HH:mm:ss', { timeZone });
};
exports.convertToLocalTime = convertToLocalTime;
