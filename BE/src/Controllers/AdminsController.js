import AdminsService from "../Services/AdminsService.js";
import responseObj from '../ResponseObj/index.js';
import Valid from '../Utils/Valid.js';

const AdminsController = {
    getAllAdmins: async () => {
        return responseObj(200, "Success", await AdminsService.getAllAdmins());
    },
    getAdminById: async (id) => {
        const Admin = await AdminsService.getAdminById(id);
        if(Admin == null) return responseObj(404, "Admin is not exist", null);
        return responseObj(200, "Success", Admin);
    },
    createAdmin: async (Admin) => {
        if(Valid.isEmpty(Admin.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(Admin.name)) return responseObj(400, "Name is invalid", null);  
        
        if(Valid.isEmpty(Admin.email)) return responseObj(400, "Email is required", null);
        if(!Valid.isEmail(Admin.email)) return responseObj(400, "Email is invalid", null);

        let checkEmail = await AdminsService.getAdminByEmail(Admin.email);
        if(checkEmail != null) return responseObj(400, "Email is exist", null);

        if(Valid.isEmpty(Admin.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(Admin.password)) return responseObj(400, "Password is invalid", null);

        try{
            await AdminsService.createAdmin(Admin);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateAdmin: async (Admin) => {
        const getAdmin = await AdminsService.getAdminById(Admin.id);
        if(getAdmin == null) return responseObj(404, "Admin is not exist", null);
      
        if(Valid.isEmpty(Admin.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(Admin.name)) return responseObj(400, "Name is invalid", null);  
        
        if(Valid.isEmpty(Admin.email)) return responseObj(400, "Email is required", null);
        if(!Valid.isEmail(Admin.email)) return responseObj(400, "Email is invalid", null);

        let checkEmail = await AdminsService.getAdminByEmail(Admin.email);
        if(checkEmail != null && checkEmail.id != Admin.id) return responseObj(400, "Email is exist", null);

        if(Valid.isEmpty(Admin.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(Admin.password)) return responseObj(400, "Password is invalid", null);

        if(Admin.name == getAdmin.name && Admin.email == getAdmin.email && Admin.password == getAdmin.password) {
            return responseObj(400, "Admin is not changed", null);
        }

        try{
            await AdminsService.updateAdmin(Admin);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteAdmin: async (id) => {
        if(!await AdminsService.existById(id)) return responseObj(404, "Admin is not exist", null);
        try{
            await AdminsService.deleteAdmin(id);
            return responseObj(200, "Success", null);
        } 
        catch(err) {
            return responseObj(400, "Delete failed", null);
        }
    },
    loginAdmin: async (Admin) => {
        const getAdmin = await AdminsService.getAdminByEmail(Admin.email);
        if(getAdmin == null) return responseObj(404, "Admin is not exist", null);
        if(getAdmin.password != Admin.password) return responseObj(400, "Password is incorrect", null);
        return responseObj(200, "Success", {id: getAdmin.id, name: getAdmin.name, email: getAdmin.email});
    }
};

export default AdminsController;