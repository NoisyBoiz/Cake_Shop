import express from "express";
import ClientsController from "../Controllers/ClientsController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await ClientsController.getAllClients().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await ClientsController.getClientById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByName', async (req, res) => {
    const name = req.query.name;
    await ClientsController.getClientByName(name).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByPhoneNumber', async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    await ClientsController.getClientByPhoneNumber(phoneNumber).then((result) => {
        res.status(result.status).send(result);
    });
});
router.get('/getByAddress', async (req, res) => {
    const address = req.query.address;
    await ClientsController.getClientByAddress(address).then((result) => {
        res.status(result.status).send(result);
    }); 
});

router.post('/create', async (req, res) => {
    const client = req.body;
    await ClientsController.createClient(client).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', async (req, res) => {
    const client = req.body;
    await ClientsController.updateClient(client).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    await ClientsController.deleteClient(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/login', async (req, res) => {
    const client = req.body;
    await ClientsController.loginClient(client).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changeInfor', async (req, res) => {   
    const client = req.body;
    await ClientsController.changeInfor(client).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/changePassword', async (req, res) => {
    const client = req.body;
    await ClientsController.changePassword(client).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;