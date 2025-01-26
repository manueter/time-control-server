"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const clockRoutes_1 = __importDefault(require("./routes/clockRoutes"));
const entryRoutes_1 = __importDefault(require("./routes/entryRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT ?? 4500;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/login', authRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/entries', entryRoutes_1.default);
app.use('/clocks', clockRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Hello, TimeControl Api is running!');
});
app.use((_req, res) => {
    res.status(500).send('Algo salio mal!'); // Sends the error response to the client
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
