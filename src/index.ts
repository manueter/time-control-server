import express, { Express, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import clockRoutes from "./routes/clockRoutes";

import entryRoutes from "./routes/entryRoutes";

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());


app.use('/login', authRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/entries',entryRoutes)
app.use('/clocks', clockRoutes);


app.get('/', ( res: Response) => {
  res.send('Hello, TimeControl Api is running!');
});

app.use((err: any, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Algo salio mal!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});