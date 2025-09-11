import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

export default Categories;