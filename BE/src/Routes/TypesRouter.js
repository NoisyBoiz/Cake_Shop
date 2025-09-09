import TypesController from "../Controllers/TypesController.js";
import { authenticateToken } from "../Utils/AuthMiddleware.js";

const router = express.Router();

router.get('/list', authenticateToken, async (req, res) => {
    await TypesController.getAllTypes().then((result) => {
        res.status(result.status).send(result.data);
    });
});

router.get('/getById', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await TypesController.getTypeById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/create', authenticateToken, async (req, res) => {
    const data = req.body;
    await TypesController.createType(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', authenticateToken, async (req, res) => {
    const data = req.body;
    await TypesController.updateType(data).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const id = req.query.id;
    await TypesController.deleteType(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;