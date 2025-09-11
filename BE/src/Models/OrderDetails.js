import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const OrderDetails = sequelize.define('OrderDetails', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_order: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_cake: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_size: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

export default OrderDetails;