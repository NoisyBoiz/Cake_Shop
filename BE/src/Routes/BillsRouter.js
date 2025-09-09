import BillsController from "../Controllers/BillsController.js";
import { authenticateToken } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.get('/list', authenticateToken, async (req, res) => {
    await BillsController.getAllBills().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/listDetail', authenticateToken, async (req, res) => {
    await BillsController.getAllDetailBills().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await BillsController.getDetailBillById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getDetailBillByIdUser', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await BillsController.getDetailBillByIdUser(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByDeliveryDate', authenticateToken, async (req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    await BillsController.getBillByDeliveryDate(startDate,endDate).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByCreatedDate', authenticateToken, async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    await BillsController.getBillByCreatedDate(startDate,endDate).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/createTotal', authenticateToken, async (req, res) => {
    const bill = req.body;
    await BillsController.createTotal(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const bill = req.body;
    await BillsController.createBill(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const bill = req.body;
    await BillsController.updateBill(bill).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await BillsController.deleteBill(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;