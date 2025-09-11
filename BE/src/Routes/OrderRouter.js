import express from "express";
import OrderController from "../Controllers/OrderController.js";
import { authenticateToken, authorizeRole } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.get('/admin', authenticateToken, authorizeRole('admin'), async (req, res) => {
    if(req.query.id) {
        await OrderController.getOrderById(null, req.query.id).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    await OrderController.getAllOrder().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/', authenticateToken, async (req, res) => {
    if(req.query.id) {
        await OrderController.getOrderById(req.user.id, req.query.id).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    await OrderController.getOrderByIdUser(req.user.id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const user = req.user;
    const data = req.body;
    await OrderController.createOrder(user, data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/cancel', authenticateToken, async (req, res) => {
    const user = req.user;
    const id = req.body.id;
    await OrderController.cancelOrder(user, id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const data = req.body;
    await OrderController.updateOrder(data).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;