import express from "express";
import TypesController from "../Controllers/TypesController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await TypesController.getAllTypes().then((result) => {
        res.status(result.status).send(result.data);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await TypesController.getTypeById(id).then((result) => {
        res.status(result.status).send(result);
    });
});
router.post('/create', async (req, res) => {
    const data = req.body;
    await TypesController.createType(data).then((result) => {
        res.status(result.status).send(result);
    });
});
router.post('/update', async (req, res) => {
    const data = req.body;
    await TypesController.updateType(data).then((result) => {
        res.status(result.status).send(result);
    });
});
router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await TypesController.deleteType(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;