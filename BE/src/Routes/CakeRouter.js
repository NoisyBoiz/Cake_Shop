import express from "express";
import CakeController from "../Controllers/CakeController.js";
import { authenticateToken } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
    if(req.query.id) {
        await CakeController.getCakeById(req.query.id).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    if(req.query.name) {
        await CakeController.getCakeByName(req.query.name).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    if(req.query.id_category) {
        await CakeController.getCakeByIdCategory(req.query.id_category).then((result) => {
            res.status(result.status).send(result);
        });
        return;
    }

    await CakeController.getAllCakes().then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const data = req.body;
    await CakeController.createCake(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const data = req.body;
    await CakeController.updateCake(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await CakeController.deleteCake(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;