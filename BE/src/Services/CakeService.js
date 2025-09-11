import Cakes from '../Models/Cakes.js';
import Images from '../Models/Images.js';
import Sizes from '../Models/Sizes.js';
import { sequelize } from '../Config/index.js';

Images.belongsTo(Cakes, { foreignKey: 'id_cake', targetKey: 'id' });
Cakes.hasMany(Images, { foreignKey: 'id_cake', sourceKey: 'id' });

Sizes.belongsTo(Cakes, { foreignKey: 'id_cake', targetKey: 'id' });
Cakes.hasMany(Sizes, { foreignKey: 'id_cake', sourceKey: 'id' });

const CakeService = {
    getAllCakes: async () => {
        return await Cakes.findAll({
            order: [['id', 'ASC']],
            include: [
                {model: Images,attributes: ['id', 'path']},
                {model: Sizes,attributes: ['id', 'size', 'origin_price', 'discount']}
            ]
        })
    },

    existById: async (id) => {
        const cake = await Cakes.findByPk(id);
        return cake != null;
    },
    
    getCakeById: async (id) => {
        return await Cakes.findByPk(id, {
            include: [
                {model: Images,attributes: ['id', 'path']},
                {model: Sizes,attributes: ['id', 'size', 'origin_price', 'discount']}
            ]
        });
    },
    getCakeByName: async (name) => {
        return await Cakes.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            },
            include: [
                {model: Images,attributes: ['id', 'path']},
                {model: Sizes,attributes: ['id', 'size', 'origin_price', 'discount']}
            ]
        });
    },
    getCakeByIdCategory: async (id_category) => {
        return await Cakes.findAll({
            where: {
                id_category: id_category
            },
            include: [
                {model: Images,attributes: ['id', 'path']},
                {model: Sizes,attributes: ['id', 'size', 'origin_price', 'discount']}
            ]
        });
    },
    createCake: async (Cake) => {
        return await Cakes.create(Cake);
    },
    updateCake: async (Cake) => {
        return await Cakes.update(Cake, {
            where: {
                id: Cake.id
            }
        });
    },
    deleteCake: async (id) => {
        return await Cakes.destroy({
            where: {
                id: id
            }
        });
    }
};

export default CakeService;