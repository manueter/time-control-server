import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import clockRoutes from "./routes/clockRoutes";
import entryRoutes from "./routes/entryRoutes";

const app: Express = express();
const port = process.env.PORT ?? 4500;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/entries", entryRoutes);
app.use("/clocks", clockRoutes);

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("TimeControl Api is running!");
});

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Siempre al final
app.use((_req: express.Request, res: express.Response) => {
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
