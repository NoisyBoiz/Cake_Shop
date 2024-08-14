import express from "express";
import BillsController from "../Controllers/BillsController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await BillsController.getAllBills().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/listDetail', async (req, res) => {
    await BillsController.getAllDetailBills().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await BillsController.getDetailBillById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getDetailBillByIdClient', async (req, res) => {
    const id = req.query.id;
    await BillsController.getDetailBillByIdClient(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByDeliveryDate', async (req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    await BillsController.getBillByDeliveryDate(startDate,endDate).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByCreatedDate', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    await BillsController.getBillByCreatedDate(startDate,endDate).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/createTotal', async (req, res) => {
    const bill = req.body;
    await BillsController.createTotal(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', async (req, res) => {
    const bill = req.body;
    await BillsController.createBill(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', async (req, res) => {
    const bill = req.body;
    await BillsController.updateBill(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await BillsController.deleteBill(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;