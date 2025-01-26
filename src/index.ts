import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import clockRoutes from "./routes/clockRoutes";

import entryRoutes from "./routes/entryRoutes";

const app: Express = express();
const port = process.env.PORT ?? 4500;

app.use(cors());
app.use(express.json());


app.use('/login', authRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/entries',entryRoutes)
app.use('/clocks', clockRoutes);


app.get('/', (_req: express.Request,res: express.Response) => {
  res.send('Hello, TimeControl Api is running!');
 });

 
app.use((_req: express.Request,res: express.Response) => {
  res.status(500).send('Algo salio mal!');  // Sends the error response to the client
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});