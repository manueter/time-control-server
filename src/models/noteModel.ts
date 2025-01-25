import { readFile, writeFile } from '../utils/fileHandler';
import { v4 as uuidv4 } from 'uuid';

const path = require("path");

const filePath = path.join(__dirname, '../data/jsondb/notes.json');


export const getNotes = async () => await readFile(filePath);

export const addNote = async (user_uuid: string, value: string, day: string, time: string) => {
  const notes = (await readFile(filePath)) || { notes: [] };

  const newNote = {
    note_id: uuidv4(),
    createdAt: new Date().toISOString(),
    user_uuid,
    value,
    day,
    time,
  };

  notes.notes.push(newNote);
  await writeFile(filePath, notes);
};
