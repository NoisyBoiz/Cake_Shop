import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Carts = sequelize.define('Carts', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
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
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false
    }   
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

export default Carts;