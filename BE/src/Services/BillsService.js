import {Bills} from '../Models/Bills.js';
import {Clients} from '../Models/Clients.js';
import { Orders } from '../Models/Orders.js';
import { Cakes } from '../Models/Cakes.js';
import { CakeSizes } from '../Models/CakeSizes.js';
import { CakeImages } from '../Models/CakeImages.js';

import { Op } from 'sequelize';
import connection from '../Config/index.js';
const sequelize = await connection();

const bills = Bills(sequelize);
const clients = Clients(sequelize);
const orders = Orders(sequelize);
const cakes = Cakes(sequelize);
const cakeSizes = CakeSizes(sequelize);
const cakeImages = CakeImages(sequelize);

clients.hasMany(bills, {foreignKey: 'id_client'});
bills.belongsTo(clients, {foreignKey: 'id_client'});
bills.hasMany(orders, {foreignKey: 'id_bill'});
orders.belongsTo(bills, {foreignKey: 'id_bill'});

cakes.hasMany(orders, {foreignKey: 'id'});
orders.belongsTo(cakes, {foreignKey: 'id_cake'});

orders.hasOne(cakeSizes, {foreignKey: 'id_cake'});
cakeSizes.belongsTo(orders, {foreignKey: 'id_cake'});

cakes.hasMany(cakeImages, {foreignKey: 'id_cake'});
cakeImages.belongsTo(cakes, {foreignKey: 'id_cake'});

const BillsService = {
    getAllBills: () => {
        return bills.findAll();
    },

    existById: async (id) => {
        const bill = await bills.findByPk(id);
        return bill != null;
    },

    getBillById: (id) => {
        return bills.findByPk(id);
    },
    
    getAllDetailBills: () => {
        return bills.findAll({
            include: [
                {model: clients, attributes: ['name', 'phone_number', 'address', 'email']}, 
                {model: orders, required: true, 
                    include: [
                        {model: cakes, attributes: ['id','name', 'description'], 
                            include: [
                                {model: cakeImages, attributes: ['path']},
                            ]
                        },
                        {model: cakeSizes, attributes: ['id_cake','size', 'price'], on: [{id_cake: {[Op.col]: "Orders.id_cake"}}, {size: {[Op.col]: "Orders.size"}}]}
                    ]
                }
            ]
        });
    },
    
    getDetailBillById: (id) => {
        return bills.findByPk(id, {
            include: [
                {model: clients, attributes: ['name', 'phone_number', 'address', 'email']}, 
                {model: orders, required: true, 
                    include: [
                        {model: cakes, attributes: ['id','name', 'description'], 
                            include: [
                                {model: cakeImages, attributes: ['path']},
                            ]
                        },
                        {model: cakeSizes, attributes: ['id_cake','size', 'price'], on: [{id_cake: {[Op.col]: "Orders.id_cake"}}, {size: {[Op.col]: "Orders.size"}}]}
                    ]
                }
            ]
        });
    },

    
    getDetailBillByIdClient: (id_client) => {
        const result = bills.findAll({  
            where: {
                id_client: id_client
            },
            include: [
                {model: clients, attributes: ['name', 'phone_number', 'address', 'email']}, 
                {model: orders, required: true, 
                    include: [
                        {model: cakes, attributes: ['id','name', 'description'], 
                            include: [
                                {model: cakeImages, attributes: ['path']},
                            ]
                        },
                        {model: cakeSizes, attributes: ['id_cake','size', 'price'], on: [{id_cake: {[Op.col]: "Orders.id_cake"}}, {size: {[Op.col]: "Orders.size"}}]}
                    ]
                }
            ]
        });
        return result;
    },
    getBillByDeliveryDate: (startDate, endDate) => {
        const result = bills.findAll({
            where: {
                delivery_date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {model: orders, required: true, 
                    include: [
                        {model: cakes, attributes: ['id','name', 'description'], 
                            include: [
                                {model: cakeImages, attributes: ['path']},
                            ]
                        },
                        {model: cakeSizes, attributes: ['id_cake','size', 'price'], on: [{id_cake: {[Op.col]: "Orders.id_cake"}}, {size: {[Op.col]: "Orders.size"}}]}
                    ]
                }
            ]
        });
        return result;
    },

    getBillByCreatedDate: (startDate, endDate) => {
        const result = bills.findAll({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {model: orders, required: true, 
                    include: [
                        {model: cakes, attributes: ['id','name', 'description'], 
                            include: [
                                {model: cakeImages, attributes: ['path']},
                            ]
                        },
                        {model: cakeSizes, attributes: ['id_cake','size', 'price'], on: [{id_cake: {[Op.col]: "Orders.id_cake"}}, {size: {[Op.col]: "Orders.size"}}]}
                    ]
                }
            ]
        });
        return result;
    },

    createBill: (bill) => {
        return bills.create(bill);
    },

    updateBill: (bill) => { 
        let newBill = {
            id_client: bill.id_client,
            notice: bill.notice,
            delivery_date: bill.delivery_date,
            status: bill.status
        }
        return bills.update(newBill, {
            where: {
                id: bill.id
            }
        });
    },
    deleteBill: (id) => {
        return bills.destroy({
            where: {
                id: id
            }
        });
    }
};

export default BillsService;