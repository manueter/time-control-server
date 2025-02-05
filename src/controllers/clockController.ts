import { Request, Response } from "express";
import {
  getClocks as getClocksModel,
  getEntryTypes as getEntryTypesModel,
} from "../models/clockModel";
import { convertToLocalDateTime } from "../utils/dateUtils";

export const getServerTime = (_req: Request, res: Response): void => {
  const serverTime_Local = convertToLocalDateTime(new Date());
  res.status(200).json({ serverTime_Local });
};

export const getClocks = async (_req: Request, res: Response) => {
  try {
    const clocks = await getClocksModel();
    res.status(200).json(clocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clocks." });
  }
};

export const getEntryTypes = async (_req: Request, res: Response) => {
  try {
    const entryTypes = await getEntryTypesModel();
    res.status(200).json(entryTypes);
  } catch (error) {
    console.error('Error fetching entry types:', error);
    res.status(500).json({ message: 'Error fetching entry types.' });
  }
};
