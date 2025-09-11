import CakeService from '../Services/CakeService.js';
import SizesService from '../Services/SizeService.js';
import ImagesService from '../Services/ImageService.js';
import CategoryService from '../Services/CategoryService.js';
import responseObj from '../ResponseObj/index.js';
import Valid from '../Utils/Valid.js';

const CakesController = {
    getAllCakes: async () => {
        const cakes = await CakeService.getAllCakes()
        return responseObj(200, "Success", cakes)
    },

    getCakeById: async (id) => {
        if(id == null) return responseObj(400, "Id is required", null);
        if(!Valid.isNumber(id)) return responseObj(400, "Id is invalid", null);

        const cakes = await CakeService.getCakeById(id);
        if(cakes == null) return responseObj(404, "Cake is not exist", null);

        return responseObj(200, "Success", cakes);
    },

    getCakeByName: async (name) => {
        if(name == null) return responseObj(400, "Name is required", null);
        if(!Valid.isString(name)) return responseObj(400, "Name is invalid", null);

        const cakes = await CakeService.getCakeByName(name);
        if(cakes == null) return responseObj(404, "Cake is not exist", null);

        return responseObj(200, "Success", cakes);
    },

    getCakeByIdCategory: async (id) => {
        if(id == null) return responseObj(400, "Id is required", null);
        if(!Valid.isNumber(id)) return responseObj(400, "Id is invalid", null);
        if(!await CategoryService.existById(id)) return responseObj(404, "Cake category is not exist", null);

        const cakes = await CakeService.getCakeByIdCategory(id);
        if(cakes == null) return responseObj(404, "Cake is not exist", null);

        return responseObj(200, "Success", cakes);
    },

    createCake: async (cake) => {
        if(Valid.isEmpty(cake.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(cake.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(cake.description)) return responseObj(400, "Description is required", null);
        if(!Valid.isName(cake.description)) return responseObj(400, "Description is invalid", null);

        if(Valid.isEmpty(cake.id_category)) return responseObj(400, "IdCategory is required", null);
        if(!Valid.isNumber(cake.id_category)) return responseObj(400, "IdCategory is invalid", null);
        if(!await CategoryService.existById(cake.id_category)) return responseObj(404, "Cake category is not exist", null);

        if(cake.images.length == 0) return responseObj(400, "Image is required", null);
        cake.images.forEach(image => {
            if(Valid.isEmpty(image.path)) return responseObj(400, "Image is required", null);
        });

        if(cake.sizes.length == 0) return responseObj(400, "Size is required", null);
        cake.sizes.forEach(size => {
            if(Valid.isEmpty(size.size)) return responseObj(400, "Size is required", null);
            if(!Valid.isString(size.size)) return responseObj(400, "Size is invalid", null);

            if(Valid.isEmpty(size.origin_price)) return responseObj(400, "Price is required", null);
            if(!Valid.isNumber(size.origin_price)) return responseObj(400, "Price is invalid", null);

            if(!Valid.isEmpty(size.discount) && !Valid.isNumber(size.discount)) return responseObj(400, "Discount is invalid", null);
        });

        let dataCake = {
            name: cake.name,
            description: cake.description,
            id_category: cake.id_category,
        }
        await CakeService.createCake(dataCake).then((data) => {
            const cakeId = data.dataValues.id;

            cake.sizes.forEach(size => {
                let data = {
                    id_cake: cakeId,
                    size: size.size,
                    origin_price: size.origin_price,
                    discount: Valid.isEmpty(size.discount)?0:size.discount
                }
                SizesService.createSize(data);
            })

            cake.images.forEach(image => {
                let dataImage = {
                    id_cake: cakeId,
                    path: image.path
                }
                ImagesService.createImage(dataImage);
            });
        });

        return responseObj(200, "Success", null);
    },
    updateCake: async (cake) => {
        if(cake.id == null) return responseObj(400, "Id is required", null);
        if(!await CakeService.existById(cake.id)) return responseObj(404, "Cake is not exist", null);
        
        if(Valid.isEmpty(cake.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(cake.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(cake.description)) return responseObj(400, "Description is required", null);
        if(!Valid.isName(cake.description)) return responseObj(400, "Description is invalid", null);

        if(Valid.isEmpty(cake.id_category)) return responseObj(400, "IdCategory is required", null);
        if(!Valid.isNumber(cake.id_category)) return responseObj(400, "IdCategory is invalid", null);
        if(!await CategoryService.existById(cake.id_category)) return responseObj(404, "Cake category is not exist", null);

        if(cake.images.length == 0) return responseObj(400, "Image is required", null);
        cake.images.forEach(image => {
            if(Valid.isEmpty(image.path)) return responseObj(400, "Image is required", null);
        });

        if(cake.sizes.length == 0) return responseObj(400, "Size is required", null);
        cake.sizes.forEach(size => {
            if(Valid.isEmpty(size.size)) return responseObj(400, "Size is required", null);
            if(!Valid.isString(size.size)) return responseObj(400, "Size is invalid", null);
            if(Valid.isEmpty(size.price)) return responseObj(400, "Price is required", null);
            if(!Valid.isNumber(size.price)) return responseObj(400, "Price is invalid", null);
        });

        let dataCake = {
            id: cake.id,
            name: cake.name,
            description: cake.description,
            id_category: cake.id_category,
        }
        CakeService.updateCake(dataCake);

        SizesService.deleteSizeByIdCake(cake.id);
        ImagesService.deleteImageByIdCake(cake.id);

        cake.sizes.forEach(size => {
            let data = {
                id_cake: cake.id,
                size: size.size,
                price: size.price,
                old_price: Valid.isEmpty(size.old_price)?0:size.old_price
            }
            SizesService.createSize(data);
        })

        cake.images.forEach(image => {
            let dataImage = {
                id_cake: cake.id,
                path: image.path
            }
            ImagesService.createImage(dataImage);
        });

        return responseObj(200, "Success", null);
    },

    deleteCake: async (id) => {
        if(!await CakeService.existById(id)) return responseObj(404, "Cake is not exist", null);
        CakeService.deleteCake(id);
        SizesService.deleteSizeByIdCake(id);
        ImagesService.deleteImageByIdCake(id);
        return responseObj(200, "Success", null);
    }
    
};

export default CakesController;