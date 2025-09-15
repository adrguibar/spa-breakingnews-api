import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import connectDatabase from './database/db.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import newsRouter from './routes/news.route.js';
import swaggerRouter from './routes/swagger.route.js';

dotenv.config();

const app = express();
const port = 3000

connectDatabase();
app.use(cors({"origin":"*"}));
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/news", newsRouter);
app.use("/doc", swaggerRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));