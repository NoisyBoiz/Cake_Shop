import {Orders} from '../Models/Orders.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const OrdersService = {
    getAllOrders: () => {
        return Orders(sequelize).findAll();
    },
    existById: async (id) => {
        const order = await Orders(sequelize).findByPk(id);
        return order != null;
    },
    getOrderById: (id) => {
        return Orders(sequelize).findByPk(id);
    },
    getOrderByIdCake: (id_cake) => {
        const result = Orders(sequelize).findAll({
            where: {
                id_cake: id_cake
            }
        });
        return result;
    },
    
    getOrderByIdBill: (id_bill) => {
        const result = Orders(sequelize).findAll({
            where: {
                id_bill: id_bill
            }
        });
        return result;
    },

    createOrder: (order) => {
        return Orders(sequelize).create(order);
    },

    updateOrder: (order) => {
        const newOrder = {
            id_cake: order.id_cake,
            id_bill: order.id_bill,
            size: order.size,
            quantity: order.quantity,
        }
        return Orders(sequelize).update(newOrder, {
            where: {
                id: order.id
            }
        });
    },
    deleteOrder: (id) => {
        return Orders(sequelize).destroy({
            where: {
                id: id
            }
        });
    }
};

export default OrdersService;