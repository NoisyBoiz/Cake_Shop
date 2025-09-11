import express from "express";
import CategoryController from "../Controllers/CategoryController.js";
import { authenticateToken, authorizeRole } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.id) {
        await CategoryController.getCategoryById(req.query.id).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    await CategoryController.getAllCategory().then((result) => {
        res.status(result.status).send(result.data);
    });
});

router.post('/create', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const data = req.body;
    await CategoryController.createCategory(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const data = req.body;
    await CategoryController.updateCategory(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const id = req.query.id;
    await CategoryController.deleteCategory(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;