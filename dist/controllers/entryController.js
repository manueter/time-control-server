"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = exports.createEntry = void 0;
const entryModel_1 = require("../models/entryModel");
const createEntry = async (req, res) => {
    const { user_uuid, entry_type_id, clock_id } = req.body;
    try {
        await (0, entryModel_1.addEntry)(user_uuid, entry_type_id, clock_id);
        res.status(201).json({ message: "Entry created successfully" });
    }
    catch (error) {
        console.error("Error creating entry:", error);
        res.status(500).json({ message: "Failed to create entry" });
    }
};
exports.createEntry = createEntry;
const getEntries = async (req, res) => {
    const { user_uuid, start_date, end_date } = req.query;
    if (!user_uuid) {
        res.status(400).json({ message: "user_uuid is required" });
        return;
    }
    try {
        const entries = await (0, entryModel_1.getEntriesForUser)(user_uuid, start_date, end_date);
        res.status(200).json(entries);
    }
    catch (error) {
        console.error("Error fetching entries:", error);
        res.status(500).json({ message: "Failed to fetch entries" });
    }
};
exports.getEntries = getEntries;
