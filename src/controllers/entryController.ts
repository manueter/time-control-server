import { Request, Response } from "express";
import { addEntry, getEntriesForUser } from "../models/entryModel";
import { formatDatePostgres, formatDateToStringDDMMYYYY, isValidDate } from "../utils/dateUtils";

interface GetEntriesQuery {
  user_uuid: string;
  start_date?: string;
  end_date?: string;
}

export const createEntry = async (req: Request, res: Response): Promise<void> => {
  const { user_uuid, entry_type_id, clock_id } = req.body;
  try {
    await addEntry(user_uuid, entry_type_id, clock_id);
    res.status(201).json({ message: "Entry created successfully" });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

export const getEntries = async (req: Request, res: Response): Promise<void> => {
  // const { user_uuid, start_date as string, end_date } = req.query;
  const user_uuid = req.query.user_uuid as string;
  const start_date = req.query.start_date as string;
  const end_date = req.query.end_date as string;

  if (!user_uuid) {
    res.status(400).json({ message: "user_uuid is required" });
    return;
  }

  if (start_date && end_date) {
    if (!isValidDate(start_date) || !isValidDate(end_date)) {
      throw new Error("Invalid date format. Expected DD/MM/YYYY.");
    }
    try {
      const entries = await getEntriesForUser(
        user_uuid,
        formatDatePostgres(start_date),
        formatDatePostgres(end_date)
      );
      const formattedEntries = entries.map(entry => ({
        ...entry,
        date: formatDateToStringDDMMYYYY(entry.date),
      }));
      res.status(200).json(formattedEntries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).json({ message: "Failed to fetch entries" });
    }
  }

  
};
