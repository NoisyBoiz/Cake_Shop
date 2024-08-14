import {CakeImages} from '../Models/CakeImages.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeImagesService = {
    getAllImage: () => {
        return CakeImages(sequelize).findAll();
    },
    existById: async (id) => {
        const image = await CakeImages(sequelize).findByPk(id);
        return image != null;
    },
    getImageByIdCake: (id) => {
        return CakeImages(sequelize).findAll({
            where: {
                id_cake: id
            }
        });
    },
    createImage: (Image) => {
        return CakeImages(sequelize).create(Image);
    },
    updateImage: (Image) => {
        return CakeImages(sequelize).update(Image, {
            where: {
                id: Image.id
            }
        });
    },  
    deleteImage: (id) => {
        return CakeImages(sequelize).destroy({
            where: {
                id: id
            }
        });
    },
    deleteImageByIdCake: (id) => {
        return CakeImages(sequelize).destroy({
            where: {
                id_cake: id
            }
        });
    }
};

export default CakeImagesService;