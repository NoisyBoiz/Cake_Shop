import express from 'express';
import CartController from '../Controllers/CartController.js';
import { authenticateToken } from '../Utils/AuthMiddleware.js';
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const id = req.user.id;
    await CartController.getCartByUserId(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/add', authenticateToken, async (req, res) => {
    const user = req.user;
    const data = req.body;
    await CartController.addToCart(user, data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const { id, quantity } = req.body;
    await CartController.updateCartItem(id, quantity).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/remove', authenticateToken, async (req, res) => {
    const id = req.query.id;
    const user = req.user;
    await CartController.removeCartItem(user, id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/clear', authenticateToken, async (req, res) => {
    const id = req.user.id;
    await CartController.clearCartByUserId(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;