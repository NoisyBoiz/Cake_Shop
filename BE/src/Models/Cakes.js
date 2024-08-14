import {DataTypes} from 'sequelize';

export const Cakes = (sequelize) => sequelize.define('Cakes',{
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
    id_type: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
},{
    timestamps: false
});