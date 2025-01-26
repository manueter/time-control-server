"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNote = exports.getNotes = void 0;
const fileHandler_1 = require("../utils/fileHandler");
const uuid_1 = require("uuid");
const path = require("path");
const filePath = path.join(__dirname, '../data/jsondb/notes.json');
const getNotes = async () => await (0, fileHandler_1.readFile)(filePath);
exports.getNotes = getNotes;
const addNote = async (user_uuid, value, day, time) => {
    const notes = (await (0, fileHandler_1.readFile)(filePath)) || { notes: [] };
    const newNote = {
        note_id: (0, uuid_1.v4)(),
        createdAt: new Date().toISOString(),
        user_uuid,
        value,
        day,
        time,
    };
    notes.notes.push(newNote);
    await (0, fileHandler_1.writeFile)(filePath, notes);
};
exports.addNote = addNote;
