import OrdersController from "../Controllers/OrdersController.js";
import { authenticateToken } from "../Utils/AuthMiddleware.js";

const router = express.Router();


router.get('/list', authenticateToken, async (req, res) => {
    await OrdersController.getAllOrders().then((result) => {
        res.status(result.status).send(result.data);
    });
});

router.get('/getById', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await OrdersController.getOrderById(id).then((result) => {
        res.status(result.status).send(result.data);
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const order = req.body;
    await OrdersController.createOrder(order).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const order = req.body;
    await OrdersController.updateOrder(order).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await OrdersController.deleteOrder(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;