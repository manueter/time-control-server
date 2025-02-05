"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = exports.createEntry = void 0;
const entryModel_1 = require("../models/entryModel");
const dateUtils_1 = require("../utils/dateUtils");
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
    // const { user_uuid, start_date as string, end_date } = req.query;
    const user_uuid = req.query.user_uuid;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    if (!user_uuid) {
        res.status(400).json({ message: "user_uuid is required" });
        return;
    }
    if (start_date && end_date) {
        if (!(0, dateUtils_1.isValidDate)(start_date) || !(0, dateUtils_1.isValidDate)(end_date)) {
            throw new Error("Invalid date format. Expected DD/MM/YYYY.");
        }
        try {
            const entries = await (0, entryModel_1.getEntriesForUser)(user_uuid, (0, dateUtils_1.formatDatePostgres)(start_date), (0, dateUtils_1.formatDatePostgres)(end_date));
            const formattedEntries = entries.map(entry => ({
                ...entry,
                date: (0, dateUtils_1.formatDateToStringDDMMYYYY)(entry.date),
            }));
            res.status(200).json(formattedEntries);
        }
        catch (error) {
            console.error("Error fetching entries:", error);
            res.status(500).json({ message: "Failed to fetch entries" });
        }
    }
};
exports.getEntries = getEntries;
