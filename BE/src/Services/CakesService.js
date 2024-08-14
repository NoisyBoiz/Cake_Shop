import {Cakes} from '../Models/Cakes.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeService = {
    getAllCakes: () => {
        return Cakes(sequelize).findAll();
    },
    existById: async (id) => {
        const cake = await Cakes(sequelize).findByPk(id);
        return cake != null;
    },
    getCakeById: (id) => {
        return Cakes(sequelize).findByPk(id);
    },
    getCakeByName: (name) => {
        const result = Cakes(sequelize).findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            }
        });
        return result;
    },
    getCakeByIdType:  (id_type) => {
        const result = Cakes(sequelize).findAll({
            where: {
                id_type: id_type
            }
        });
        return result;
    },
    createCake: (Cake) => {
        return Cakes(sequelize).create(Cake);
    },
    updateCake: (Cake) => {
        return Cakes(sequelize).update(Cake, {
            where: {
                id: Cake.id
            }
        });
    },
    deleteCake: (id) => {
        return Cakes(sequelize).destroy({
            where: {
                id: id
            }
        });
    }
};

export default CakeService;