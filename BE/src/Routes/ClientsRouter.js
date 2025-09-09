
import express from "express";
import UserController from "../Controllers/UserController.js";
import { authenticateToken } from "../Utils/AuthMiddleware.js";

const router = express.Router();

// Route đăng ký
router.post('/create', async (req, res) => {
    const user = req.body;
    await UserController.createUser(user).then((result) => {
        res.status(result.status).send(result);
    });
});

// Route đăng nhập
router.post('/login', async (req, res) => {
    const user = req.body;
    await UserController.loginUser(user).then((result) => {
        res.status(result.status).send(result);
    });
});



router.get('/list', authenticateToken, async (req, res) => {
    await UserController.getAllUsers().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await UserController.getUserById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const user = req.body;
    await UserController.updateUser(user).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await UserController.deleteUser(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changeInfor', authenticateToken, async (req, res) => {
    const user = req.body;
    await UserController.changeInfor(user).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changePassword', authenticateToken, async (req, res) => {
    const user = req.body;
    await UserController.changePassword(user).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;