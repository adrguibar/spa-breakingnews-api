import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';

import userRouter from './src/routes/user.router.js';
import authRouter from './src/routes/auth.route.js';

dotenv.config();

const app = express();
const port = 3000

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));