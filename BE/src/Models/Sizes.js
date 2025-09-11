import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Sizes = sequelize.define('Sizes', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_cake: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin_price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    discount: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Sizes;