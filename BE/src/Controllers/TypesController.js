import CakeTypesService from '../Services/CakeTypesService.js';
import responseObj from '../ResponseObj/index.js';
import Valid from '../Utils/Valid.js';

const TypesController = {
    getAllTypes: async () => {
        const types = await CakeTypesService.getAllTypes();
        return responseObj(200, "Success", types);
    },
    getTypeById: async (id) => {
        const type = await CakeTypesService.getTypeById(id);
        if(type == null) return responseObj(404, "Type is not exist", null);
        return responseObj(200, "Success", type);
    },
    createType: async (data) => {
        if(Valid.isEmpty(data.type)) return responseObj(400, "Name is required", null);  
        if(!Valid.isName(data.type)) return responseObj(400, "Name is invalid", null);

        try{
            const type = await CakeTypesService.createType(data);
            return responseObj(200, "Success", type);
        }
        catch(error) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateType: async (data) => {
        if(Valid.isEmpty(data.id)) return responseObj(400, "Id is required", null);
        if(!await CakeTypesService.existById(data.id)) return responseObj(404, "Type is not exist", null);

        if(Valid.isEmpty(data.type)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(data.type)) return responseObj(400, "Name is invalid", null);

        try{
            await CakeTypesService.updateType(data);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteType: async (id) => {
        if(!await CakeTypesService.existById(id)) return responseObj(404, "Type is not exist", null);
        try{
            await CakeTypesService.deleteType(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default TypesController;