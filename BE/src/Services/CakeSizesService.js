import {CakeSizes} from '../Models/CakeSizes.js';
import {Op} from 'sequelize';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeSizesService = {
    getAllSize: () => {
        return CakeSizes(sequelize).findAll();
    },
    existByIdCakeAndSize: async (id_cake, size) => {
        const cakeSize = await CakeSizes(sequelize).findOne({
            where: {
                id_cake: id_cake,
                size: size
            }
        });
        return cakeSize != null;
    },
    getSizeByIdCake: (id) => {
        return CakeSizes(sequelize).findAll({
            where: {
                id_cake: id
            }
        });
    },
    getSizeByPrice: (min,max) => {
        const result = CakeSizes(sequelize).findAll({
            where: {
                price: {
                    [Op.between]: [min, max]
                }
            }
        });
        return result;
    },
    createSize: (Size) => {
        console.log(Size);
        return CakeSizes(sequelize).create(Size);
    },
    updateCake: (Size) => {
        return CakeSizes(sequelize).update(Size, {
            where: {
                id: Size.id
            }
        });
    },
    deleteCake: (id) => {
        return CakeSizes(sequelize).destroy({
            where: {
                id: id
            }
        });
    },
    deleteSizeByIdCake: (id) => {
        return CakeSizes(sequelize).destroy({
            where: {
                id_cake: id
            }
        });
    }
    
};

export default CakeSizesService;