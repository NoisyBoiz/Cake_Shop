import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Cakes = sequelize.define('Cakes', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_category: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

export default Cakes;