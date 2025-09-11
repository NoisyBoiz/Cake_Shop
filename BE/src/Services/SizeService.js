import {Op} from 'sequelize';
import Sizes from '../Models/Sizes.js';

const SizesService = {
    getAllSize: () => {
        return Sizes.findAll();
    },
    getSizeById: (id) => {
        return Sizes.findByPk(id);
    },
    existByIdCakeAndSize: async (id_cake, size) => {
        const cakeSize = await Sizes.findOne({
            where: {
                id_cake: id_cake,
                size: size
            }
        });
        return cakeSize != null;
    },
    getSizeByIdCake: (id) => {
        return Sizes.findAll({
            where: {
                id_cake: id
            }
        });
    },
    getSizeByPrice: (min,max) => {
        const result = Sizes.findAll({
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
        return Sizes.create(Size);
    },
    updateCake: (Size) => {
        return Sizes.update(Size, {
            where: {
                id: Size.id
            }
        });
    },
    deleteCake: (id) => {
        return Sizes.destroy({
            where: {
                id: id
            }
        });
    },
    deleteSizeByIdCake: (id) => {
        return Sizes.destroy({
            where: {
                id_cake: id
            }
        });
    }
    
};

export default SizesService;