import CategoryService from '../Services/CategoryService.js';
import responseObj from '../ResponseObj/index.js';
import Valid from '../Utils/Valid.js';

const CategoryController = {
    getAllCategory: async () => {
        const categorys = await CategoryService.getAllCategory();
        return responseObj(200, "Success", categorys);
    },
    
    getCategoryById: async (id) => {
        const category = await CategoryService.getCategoryById(id);
        if(category == null) return responseObj(404, "Category is not exist", null);
        return responseObj(200, "Success", category);
    },

    createCategory: async (data) => {
        if(Valid.isEmpty(data.category)) return responseObj(400, "Name is required", null);  
        if(!Valid.isName(data.category)) return responseObj(400, "Name is invalid", null);

        try{
            const category = await CategoryService.createCategory(data);
            return responseObj(200, "Success", category);
        }
        catch(error) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateCategory: async (data) => {
        if(Valid.isEmpty(data.id)) return responseObj(400, "Id is required", null);
        if(!await CategoryService.existById(data.id)) return responseObj(404, "Category is not exist", null);

        if(Valid.isEmpty(data.category)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(data.category)) return responseObj(400, "Name is invalid", null);

        try{
            await CategoryService.updateCategory(data);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteCategory: async (id) => {
        if(!await CategoryService.existById(id)) return responseObj(404, "Category is not exist", null);
        try{
            await CategoryService.deleteCategory(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default CategoryController;