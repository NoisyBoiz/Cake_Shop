import Orders from '../Models/Orders.js';
import OrderDetails from '../Models/OrderDetails.js';
import Users from '../Models/Users.js';
import Cakes from '../Models/Cakes.js';
import Sizes from '../Models/Sizes.js';
import Images from '../Models/Images.js';

Users.hasMany(Orders, { foreignKey: 'id_user' });
Orders.belongsTo(Users, { foreignKey: 'id_user' });

OrderDetails.belongsTo(Orders, { foreignKey: 'id_order' });
Orders.hasMany(OrderDetails, { foreignKey: 'id_order' });

Cakes.hasMany(OrderDetails, { foreignKey: 'id_cake' });
OrderDetails.belongsTo(Cakes, { foreignKey: 'id_cake' });

Sizes.hasMany(OrderDetails, {foreignKey: 'id_size',sourceKey: 'id'});
OrderDetails.belongsTo(Sizes, { foreignKey: 'id_size', targetKey: 'id' });

const OrderService = {
    getAllOrder: () => {
        return Orders.findAll({
            include: [
                { model: Users, attributes: ['fullname', 'phone', 'address'] },
                { model: OrderDetails, 
                    include: [
                        { model: Cakes, include: [{ model: Images, attributes: ['id', 'path'] }] },
                        { model: Sizes, attributes: ["id", "size", "origin_price", "discount"] }
                    ]
                }
            ]
        });
    },

    existById: async (id) => {
        const order = await Orders.findByPk(id);
        return order != null;
    },

    getOrderById: (id) => {
        return Orders.findByPk(id, {
            include: [
                { model: Users, attributes: ['fullname', 'phone', 'address'] },
                { model: OrderDetails,  
                    include: [
                        { model: Cakes, include: [{ model: Images, attributes: ['id', 'path'] }] },
                        { model: Sizes, attributes: ["id", "size", "origin_price", "discount"] }
                    ]
                }
            ]
        });
    },
    
    getAllDetailOrder: () => {
        return Orders.findAll({
            include: [
                { model: Users, attributes: ['fullname', 'phone', 'address'] },
                { model: OrderDetails,
                    include: [
                        { model: Cakes, include: [{ model: Images, attributes: ['id', 'path'] }] },
                        { model: Sizes, attributes: ["id", "size", "origin_price", "discount"] }
                    ]
                }
            ]
        });
    },
    
    getOrderByIdUser: (id_user) => {
        return Orders.findAll({  
            where: {
                id_user: id_user
            },
            include: [
                { model: Users, attributes: ['fullname', 'phone', 'address'] },
                { model: OrderDetails,
                    include: [
                        { model: Cakes, include: [{ model: Images, attributes: ['id', 'path'] }] },
                        { model: Sizes, attributes: ['id', 'size', 'origin_price', 'discount'] }
                    ]
                }
            ]
        });
    },

    createOrder: async (order) => {
        return await Orders.create(order);
    },

    updateOrder: async (order) => { 
        return await Orders.update(order, {
            where: {
                id: order.id
            }
        });
    },

    cancelOrder: async (id) => {
        return await Orders.update({ status: 'canceled' }, {
            where: {
                id: id
            }
        });
    },

    createOrderDetail: async (orderDetail) => {
        return await OrderDetails.create(orderDetail);
    },
};

export default OrderService;