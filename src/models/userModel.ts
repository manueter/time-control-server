import pool from '../config/db';
// Define the structure of a user
export interface User {
  uuid: string;
  username: string;
  email?: string;
  password: string;
}

// Define the structure of a profile
export interface Profile {
  user_uuid: string;
  work_schedule: object;
  createdAt: string;
  workingSince: string;
  active: boolean;
}

export const getUsers = async (): Promise<User[]> => {

  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

export const userExists = async (username: string): Promise<boolean> => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rowCount? res.rowCount > 0 : false;
};

export const addUser = async (username: string, password: string): Promise<string> => {
  const uuid = crypto.randomUUID(); // Node.js 14.17+ or use `uuid` package
  await pool.query(
    'INSERT INTO users (uuid, username, password) VALUES ($1, $2, $3)',
    [uuid, username, password]
  );
  return uuid;
};