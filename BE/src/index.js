import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import CakeRouter from './Routes/cakeRouter.js';
import UserRouter from './Routes/userRouter.js';
import OrderRouter from './Routes/orderRouter.js';
import CategoryRouter from './Routes/categoryRouter.js';
import CartRouter from './Routes/cartRouter.js';
import { connectDB } from './Config/index.js';

(async () => {
  await connectDB();
})();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use("/cakes", CakeRouter);
app.use("/users", UserRouter);
app.use("/orders", OrderRouter);
app.use("/categories", CategoryRouter);
app.use("/carts", CartRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});