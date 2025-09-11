
import express from "express";
import UserController from "../Controllers/UserController.js";
import { authenticateToken, authorizeRole } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body;
    await UserController.registerUser(user).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/login', async (req, res) => {
    const user = req.body;
    await UserController.loginUser(user).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/list', authenticateToken, authorizeRole('admin'), async (req, res) => {
    await UserController.getAllUsers().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const id = req.query.id;
    await UserController.getUserById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changeInfor', authenticateToken, async (req, res) => {
    const user = req.user;
    const data = req.body;
    await UserController.changeInfor(user, data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changePassword', authenticateToken, async (req, res) => {
    const user = req.user;
    const data = req.body;
    await UserController.changePassword(user, data).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;