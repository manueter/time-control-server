import pool from '../config/db';

export interface User {
  uuid: string;
  username: string;
  email?: string;
  password: string;
}

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
  const uuid = crypto.randomUUID(); 
  await pool.query(
    'INSERT INTO users (uuid, username, password) VALUES ($1, $2, $3)',
    [uuid, username, password]
  );
  return uuid;
};