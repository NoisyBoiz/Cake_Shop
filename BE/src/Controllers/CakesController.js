import CakesService from '../Services/CakesService.js';
import CakeSizesService from '../Services/CakeSizesService.js';
import CakeImagesService from '../Services/CakeImagesService.js';
import CakeTypesService from '../Services/CakeTypesService.js';
import responseObj from '../ResponseObj/index.js';
import Valid from '../Utils/Valid.js';

const CakesController = {
    mergerAttribute: (cakes, cakeSizes, cakeImages) => {
        const rs = [];
        cakes.forEach(cake => {
            const newCake = {
                id: cake.id,
                name: cake.name,
                id_type: cake.id_type,
                price: cake.price,
                description: cake.description,
                image: cake.image,
                list_size: [],
                list_image: []
            };
            cakeSizes.forEach(size => {  
                if (size.id_cake == cake.id) {
                    newCake.list_size.push({
                        size: size.size,
                        price: size.price,
                        old_price: size.old_price
                    });
                }
            });
            cakeImages.forEach(image => {
                if (image.id_cake == cake.id) {
                    newCake.list_image.push({
                        image: image.path
                    });
                }
            });
            rs.push(newCake);
        });
        return rs;
    },

    getAllCakes: async () => {
        const cakes = await CakesService.getAllCakes()
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },

    getCakeById: async (id) => {
        const cakes = await CakesService.getCakeById(id);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getSizeByIdCake(id);
        const cakeImages = await CakeImagesService.getImageByIdCake(id);
        return responseObj(200, "Success", CakesController.mergerAttribute([cakes], cakeSizes, cakeImages));
    },

    getCakeByName: async (name) => {
        const cakes = await CakesService.getCakeByName(name);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },

    getCakeByIdType: async (id) => {
        const cakes = await CakesService.getCakeByIdType(id);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();  
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },

    createCake: async (cake) => {
        if(Valid.isEmpty(cake.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(cake.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(cake.description)) return responseObj(400, "Description is required", null);
        if(!Valid.isName(cake.description)) return responseObj(400, "Description is invalid", null);

        if(Valid.isEmpty(cake.id_type)) return responseObj(400, "IdType is required", null);
        if(!Valid.isNumber(cake.id_type)) return responseObj(400, "IdType is invalid", null);
        if(!await CakeTypesService.existById(cake.id_type)) return responseObj(404, "Cake type is not exist", null);

        if(Valid.isEmpty(cake.image)) return responseObj(400, "Image is required", null);
        // else if(!Valid.isString(cake.image)) return responseObj(400, "Image is invalid", null);

        if(cake.size.length == 0) return responseObj(400, "Size is required", null);
        cake.size.forEach(size => {
            if(Valid.isEmpty(size.size)) return responseObj(400, "Size is required", null);
            if(!Valid.isString(size.size)) return responseObj(400, "Size is invalid", null);
            if(Valid.isEmpty(size.price)) return responseObj(400, "Price is required", null);
            if(!Valid.isNumber(size.price)) return responseObj(400, "Price is invalid", null);
        });

        let dataCake = {
            name: cake.name,
            description: cake.description,
            id_type: cake.id_type,
        }
        await CakesService.createCake(dataCake).then((data) => {
            const cakeId = data.dataValues.id;

            cake.size.forEach(size => {
                let data = {
                    id_cake: cakeId,
                    size: size.size,
                    price: size.price,
                    old_price: Valid.isEmpty(size.old_price)?0:size.old_price
                }
                CakeSizesService.createSize(data);
            })

            let dataImage = {
                id_cake: cakeId,
                path: cake.image
            }
            CakeImagesService.createImage(dataImage);
        });
        

        return responseObj(200, "Success", null);
    },
    updateCake: async (cake) => {
        if(cake.id == null) return responseObj(400, "Id is required", null);
        if(!await CakesService.existById(cake.id)) return responseObj(404, "Cake is not exist", null);
        
        if(Valid.isEmpty(cake.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(cake.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(cake.description)) return responseObj(400, "Description is required", null);
        if(!Valid.isName(cake.description)) return responseObj(400, "Description is invalid", null);

        if(Valid.isEmpty(cake.id_type)) return responseObj(400, "IdType is required", null);
        if(!Valid.isNumber(cake.id_type)) return responseObj(400, "IdType is invalid", null);
        if(!await CakeTypesService.existById(cake.id_type)) return responseObj(404, "Cake type is not exist", null);

        if(Valid.isEmpty(cake.image)) return responseObj(400, "Image is required", null);
        if(!Valid.isName(cake.image)) return responseObj(400, "Image is invalid", null);

        if(cake.size.length == 0) return responseObj(400, "Size is required", null);
        cake.size.forEach(size => {
            if(Valid.isEmpty(size.size)) return responseObj(400, "Size is required", null);
            if(!Valid.isString(size.size)) return responseObj(400, "Size is invalid", null);
            if(Valid.isEmpty(size.price)) return responseObj(400, "Price is required", null);
            if(!Valid.isNumber(size.price)) return responseObj(400, "Price is invalid", null);
        });

        let dataCake = {
            id: cake.id,
            name: cake.name,
            description: cake.description,
            id_type: cake.id_type,
        }
        CakesService.updateCake(dataCake);

        CakeSizesService.deleteSizeByIdCake(cake.id);
        CakeImagesService.deleteImageByIdCake(cake.id);

        cake.size.forEach(size => {
            let data = {
                id_cake: cake.id,
                size: size.size,
                price: size.price,
                old_price: Valid.isEmpty(size.old_price)?0:size.old_price
            }
            CakeSizesService.createSize(data);
        })

        let data = {
            id_cake: cake.id,
            path: cake.image   
        }
        CakeImagesService.createImage(data);
        return responseObj(200, "Success", null);
    },
    deleteCake: async (id) => {
        if(!await CakesService.existById(id)) return responseObj(404, "Cake is not exist", null);
        CakesService.deleteCake(id);
        CakeSizesService.deleteSizeByIdCake(id);
        CakeImagesService.deleteImageByIdCake(id);
        return responseObj(200, "Success", null);
    }
    
};

export default CakesController;