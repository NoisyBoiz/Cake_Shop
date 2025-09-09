import UserService from "../Services/UserService.js";
import responseObj from '../ResponseObj/index.js';
import Valid from "../Utils/Valid.js";

const UserController = {
    getAllUsers: async () => {
        return responseObj(200, "Success", await UserService.getAllUsers());
    },
    getUserById: async (id) => {
        const user = await UserService.getUserById(id);
        if(user == null) return responseObj(404, "User is not exist", null);
        return responseObj(200, "Success", user);
    },
    createUser: async (user) => {
        if(Valid.isEmpty(user.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(user.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(user.phone_number)) return responseObj(400, "Phone number is required", null);
        if(!Valid.isPhoneNumber(user.phone_number)) return responseObj(400, "Phone number is invalid", null);

        if(Valid.isEmpty(user.address)) return responseObj(400, "Address is required", null);
        if(!Valid.isAddress(user.address)) return responseObj(400, "Address is invalid", null);

        if(Valid.isEmpty(user.email)) return responseObj(400, "Email is required", null);
        if(!Valid.isEmail(user.email)) return responseObj(400, "Email is invalid", null);

        if(Valid.isEmpty(user.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(user.password)) return responseObj(400, "Password is invalid", null);

        const userP = await UserService.getUserByPhoneNumber(user.phone_number);
        if(!Valid.isEmpty(userP)) return responseObj(400, "Phone number is already exist", null);

        const userE = await UserService.getUserByEmail(user.email);
        if(!Valid.isEmpty(userE)) return responseObj(400, "Email is already exist", null);

        try{
            await UserService.createUser(user);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, err.message || "Create failed", null);
        }
    },
    updateUser: async (user) => {
        const getUser = await UserService.getUserById(user.id);
        if(getUser == null) return responseObj(404, "User is not exist", null);
        if(user.name == getUser.name && user.phone_number == getUser.phone_number && user.address == getUser.address && user.email == getUser.email && user.password == getUser.password) {
            return responseObj(400, "User is not changed", null);
        }
        // ...validate như trên...
        try{
            await UserService.updateUser(user);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteUser: async (id) => {
        if(!await UserService.existById(id)) return responseObj(404, "User is not exist", null);
        try{
            await UserService.deleteUser(id);
            return responseObj(200, "Success", null);
        } 
        catch(err) {
            return responseObj(400, "Delete failed", null);
        }
    },
    loginUser: async (user) => {
        const getUser = await UserService.getUserByEmail(user.email);
        if(getUser == null) return responseObj(404, "User is not exist", null);
        if(getUser.password != user.password) return responseObj(400, "Password is incorrect", null);
        return responseObj(200, "Success", {id: getUser.id, name: getUser.name, email: getUser.email, phone_number: getUser.phone_number, address: getUser.address, role: getUser.role});
    },
    changeInfor: async (user) => {
        const getUser = await UserService.getUserById(user.id);
        if(getUser == null) return responseObj(404, "User is not exist", null);
        if(getUser.password != user.password) return responseObj(400, "Password is incorrect", null);
        if(user.name == getUser.name && user.phone_number == getUser.phone_number && user.address == getUser.address) {
            return responseObj(400, "User is not changed", null);
        }
        // ...validate như trên...
        try{
            await UserService.changeInfor(user);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    },
    changePassword: async (user) => {
        const getUser = await UserService.getUserById(user.id);
        if(getUser == null) return responseObj(404, "User is not exist", null);
        if(getUser.password != user.oldPassword) return responseObj(400, "Old password is incorrect", null);
        if(getUser.password == user.newPassword) return responseObj(400, "New password is the same as old password", null);
        if(Valid.isEmpty(user.newPassword)) return responseObj(400, "New password is required", null);
        if(!Valid.isPassword(user.newPassword)) return responseObj(400, "New password is invalid", null);
        try{
            await UserService.changePassword(user);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    }
};

export default UserController;
