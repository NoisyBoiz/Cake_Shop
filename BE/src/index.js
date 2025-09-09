import express from 'express';
import CakesRouter from './routes/cakesRouter.js';
import UserRouter from './Routes/UserRouter.js';
import BillsRouter from './routes/billsRouter.js';
import OrdersRouter from './routes/ordersRouter.js';
import TypesRouter from './Routes/TypesRouter.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));
  
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
app.options("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
});
app.use(express.json());

app.use("/cakes", CakesRouter);
app.use("/users", UserRouter);
app.use("/bills", BillsRouter);
app.use("/orders", OrdersRouter);
app.use("/types", TypesRouter);

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});