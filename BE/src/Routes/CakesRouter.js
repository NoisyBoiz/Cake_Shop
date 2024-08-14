import express from "express";
import CakesController from "../Controllers/CakesController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await CakesController.getAllCakes().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await CakesController.getCakeById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByName', async (req, res) => {
    const name = req.query.name;
    await CakesController.getCakeByName(name).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByIdType', async (req, res) => {
    const id = req.query.id;
    await CakesController.getCakeByIdType(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', async (req, res) => {
    const data = req.body;
    console.log(data)
    await CakesController.createCake(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    await CakesController.updateCake(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await CakesController.deleteCake(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;