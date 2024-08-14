import {DataTypes} from 'sequelize';

export const CakeImages = (sequelize) => sequelize.define('CakeImages',{
    id_cake: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    path: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false
});