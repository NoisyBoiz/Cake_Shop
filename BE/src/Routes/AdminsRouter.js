import express from "express";
import AdminsController from "../Controllers/AdminsController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await AdminsController.getAllAdmins().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await AdminsController.getAdminById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/login', async (req, res) => {
    const Admin = req.body;
    await AdminsController.loginAdmin(Admin).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', async (req, res) => {
    const Admin = req.body;
    await AdminsController.createAdmin(Admin).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', async (req, res) => {
    const Admin = req.body;
    await AdminsController.updateAdmin(Admin).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await AdminsController.deleteAdmin(id).then((result) => {
        res.status(result.status).send(result);
    });
});


export default router;