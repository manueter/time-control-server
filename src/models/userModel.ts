import pool from "../config/db";

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

export const getUserCredential = async (uuid: string): Promise<string> => {
  try {
    const res = await pool.query("SELECT password FROM users WHERE uuid = $1", [
      uuid,
    ]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0].password; // Extract the password field
  } catch (error) {
    console.error("Error querying users table:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await pool.query("SELECT uuid, username, email FROM users"); // Use a valid query
    return res.rows;
  } catch (error) {
    console.error("Error querying users table:", error);
    throw error; // Propagate the error to the controller
  }
};

export const userExists = async (email: string): Promise<boolean> => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
    return res.rowCount ? res.rowCount > 0 : false;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw error; // Propagate to the controller for consistent error handling
  }
};

export const addUser = async (
  email: string,
  username: string,
  password: string
): Promise<string> => {
  const uuid = crypto.randomUUID();
  try {
    await pool.query(
      "INSERT INTO users (uuid, email, username, password) VALUES ($1, $2, $3, $4)",
      [uuid, email, username, password]
    );
    return uuid;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user"); // Provide a meaningful error message
  }
};
