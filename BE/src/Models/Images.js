import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/index.js';

const Images = sequelize.define('Images', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_cake: {
        type: DataTypes.BIGINT,
    },
    path: {
        type: DataTypes.STRING,
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

export default Images;