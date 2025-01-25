import pool from "../config/db";
import { convertToLocalTime } from '../utils/dateUtils';

export interface Entry {
  id: number;
  user_uuid: string;
  entry_type_id: number;
  date: Date;
  time: string;
}

// export const getEntriesForUser = async (userUuid: string): Promise<Entry[]> => {
//   const res = await pool.query("SELECT * FROM entries WHERE user_uuid = $1", [
//     userUuid,
//   ]);
//   return res.rows;
// };

export const getEntriesForUser = async (
  userUuid: string,
  startDate?: string,
  endDate?: string
): Promise<Entry[]> => {
  let query = "SELECT * FROM entries WHERE user_uuid = $1";
  const params: (string | undefined)[] = [userUuid];

  if (startDate && endDate) {
    query += " AND date BETWEEN $2 AND $3";
    params.push(startDate, endDate);
  }

  const res = await pool.query(query, params);
  return res.rows;
};
// export const addEntry = async (
//   userUuid: string,
//   entryTypeId: number,
//   clockId:number
// ): Promise<void> => {
//   await pool.query(
//     "INSERT INTO entries (user_uuid, entry_type_id, clock_id, date, time) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIME)",
//     [userUuid, entryTypeId, clockId]
//   );
// };
export const addEntry = async (
  userUuid: string,
  entryTypeId: number,
  clockId: number
): Promise<void> => {
  // Get the current time in your desired local time zone (e.g., 'America/Argentina/Buenos_Aires')
  const localTime = new Date();
  const localTimeZone = 'America/Argentina/Buenos_Aires'; // Change to your country's time zone
  const formattedTime = convertToLocalTime(localTime, localTimeZone);  // Use the utility function

  // Insert the entry into the database with the local time
  await pool.query(
    "INSERT INTO entries (user_uuid, entry_type_id, clock_id, date, time) VALUES ($1, $2, $3, CURRENT_DATE, $4)",
    [userUuid, entryTypeId, clockId, formattedTime]
  );
};
export const getEntriesForUserByMonth = async (userUuid: string, month:number, year:number): Promise<Entry[]> => {
  
  const date = new Date(year, month);

  const res = await pool.query("SELECT * FROM entries WHERE user_uuid = $1 AND MONTH(date) = $2 AND YEAR(date) = $3", [
    userUuid, month, year
  ]);
  return res.rows;
};