import express from 'express';
import CakesRouter from './routes/cakesRouter.js';
import ClientRouter from './Routes/ClientsRouter.js';
import BillsRouter from './routes/billsRouter.js';
import OrdersRouter from './routes/ordersRouter.js';
import TypesRouter from './Routes/TypesRouter.js';
import AdminRouter from './Routes/AdminsRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

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
app.use("/clients", ClientRouter);
app.use("/admins", AdminRouter);
app.use("/bills", BillsRouter);
app.use("/orders", OrdersRouter);
app.use("/types", TypesRouter);

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});