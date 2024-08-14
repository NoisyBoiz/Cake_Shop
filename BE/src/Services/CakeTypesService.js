import {CakeTypes} from '../Models/CakeTypes.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeTypesService = {
    getAllTypes: () => {
        return CakeTypes(sequelize).findAll();
    },
    existById: async (id) => {
        const type = await CakeTypes(sequelize).findByPk(id);
        return type != null;
    },
    getTypeById: (id) => {
        return CakeTypes(sequelize).findOne({where: {id_type: id}});
    },
    createType: (data) => {
        return CakeTypes(sequelize).create(data);
    },  
    updateType: (data) => {
        return CakeTypes(sequelize).update({"type":data.type}, {where: {id_type: data.id}});
    },
    deleteType: (id) => {
        return CakeTypes(sequelize).destroy({where: {id_type: id}});
    }
};

export default CakeTypesService;