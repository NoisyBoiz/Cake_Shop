import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    notice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    delivery_date: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'delivered', 'canceled'),
        defaultValue: 'pending',
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Orders;