import { Request, Response } from "express";
import { addEntry, getEntriesForUser } from "../models/entryModel";

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
  const { user_uuid, start_date, end_date } = req.query;

  if (!user_uuid) {
    res.status(400).json({ message: "user_uuid is required" });
    return;
  }

  try {
    const entries = await getEntriesForUser(
      user_uuid as string,
      start_date as string,
      end_date as string
    );
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};