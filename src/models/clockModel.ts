import pool from '../config/db';

export interface Clock {
  id: number;
  number: string;
  ip: string;
}

export interface EntryType {
  id: number;
  value: string;
  description: string;
}

export const getClocks = async (): Promise<Clock[]> => {
  const res = await pool.query('SELECT * FROM clocks');
  return res.rows;
};

export const addClock = async (number: string, ip: string): Promise<number> => {
  const res = await pool.query(
    'INSERT INTO clocks (number, ip) VALUES ($1, $2) RETURNING id',
    [number, ip]
  );
  return res.rows[0].id;
};

export const getEntryTypes = async (): Promise<EntryType[]> => {
  const res = await pool.query('SELECT * FROM entry_types');
  return res.rows;
};

// export const getEntryTypesForClock = async (clockId: number): Promise<EntryType[]> => {
//   const res = await pool.query('SELECT * FROM entry_types WHERE clock_id = $1', [clockId]);
//   return res.rows;
// };

export const addEntryType = async (
  clockId: number,
  value: string,
  description: string
): Promise<void> => {
  await pool.query(
    'INSERT INTO entry_types (clock_id, value, description) VALUES ($1, $2, $3)',
    [clockId, value, description]
  );
};