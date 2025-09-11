import Images from '../Models/Images.js';

const ImagesService = {
    getAllImage: () => {
        return Images.findAll();
    },
    existById: async (id) => {
        const image = await Images.findByPk(id);
        return image != null;
    },
    getImageByIdCake: (id) => {
        return Images.findAll({
            where: {
                id_cake: id
            }
        });
    },
    createImage: (Image) => {
        return Images.create(Image);
    },
    updateImage: (Image) => {
        return Images.update(Image, {
            where: {
                id: Image.id
            }
        });
    },  
    deleteImage: (id) => {
        return Images.destroy({
            where: {
                id: id
            }
        });
    },
    deleteImageByIdCake: (id) => {
        return Images.destroy({
            where: {
                id_cake: id
            }
        });
    }
};

export default ImagesService;