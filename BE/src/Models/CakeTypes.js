import {DataTypes} from 'sequelize';

export const CakeTypes = (sequelize) => sequelize.define('CakeTypes',{
    id_type: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});