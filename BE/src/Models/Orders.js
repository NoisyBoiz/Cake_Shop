import {DataTypes} from 'sequelize';

export const Orders = (sequelize) => sequelize.define('Orders',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_cake: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_bill: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: false
});