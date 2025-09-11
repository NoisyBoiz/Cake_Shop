import UserService from "../Services/UserService.js";
import responseObj from '../ResponseObj/index.js';
import Valid from "../Utils/Valid.js";
import Token from "../Utils/Token.js";

const UserController = {
    getAllUsers: async () => {
        return responseObj(200, "Success", await UserService.getAllUsers());
    },
    
    getUserById: async (id) => {
        const user = await UserService.getUserById(id);
        if(user == null) return responseObj(404, "User is not exist", null);
        return responseObj(200, "Success", user);
    },

    registerUser: async (user) => {
        if(Valid.isEmpty(user.fullname)) return responseObj(400, "Fullname is required", null);
        if(!Valid.isName(user.fullname)) return responseObj(400, "Fullname is invalid", null);

        if(Valid.isEmpty(user.phone)) return responseObj(400, "Phone number is required", null);
        if(!Valid.isPhoneNumber(user.phone)) return responseObj(400, "Phone number is invalid", null);

        if(Valid.isEmpty(user.address)) return responseObj(400, "Address is required", null);
        if(!Valid.isAddress(user.address)) return responseObj(400, "Address is invalid", null);

        if(Valid.isEmpty(user.username)) return responseObj(400, "Username is required", null);
        if(!Valid.isEmail(user.username)) return responseObj(400, "Username is invalid", null);

        if(Valid.isEmpty(user.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(user.password)) return responseObj(400, "Password is invalid", null);

        const userP = await UserService.getUserByPhone(user.phone);
        if(!Valid.isEmpty(userP)) return responseObj(400, "Phone number is already exist", null);

        const userE = await UserService.getUserByUsername(user.username);
        if(!Valid.isEmpty(userE)) return responseObj(400, "Email is already exist", null);

        try{
            await UserService.registerUser(user);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, err.message || "Create failed", null);
        }
    },
    
    loginUser: async (user) => {
        const getUser = await UserService.getUserByUsername(user.username);
        if(getUser == null) return responseObj(404, "User is not exist", null);
        if(getUser.password != user.password) return responseObj(400, "Password is incorrect", null);
        const token = Token.createToken({id: getUser.id, fullname: getUser.fullname, role: getUser.role});

        return responseObj(200, "Success", {
            user: {
                id: getUser.id, 
                fullname: getUser.fullname, 
                phone: getUser.phone,
                address: getUser.address, 
                role: getUser.role
            },
            token
        });
    },

    changeInfor: async (user, data) => {
        const getUser = await UserService.getUserById(user.id);
        if(getUser == null) return responseObj(404, "User is not exist", null);

        if(getUser.password != data.password) return responseObj(400, "Password is incorrect", null);
        if(data.fullname == getUser.fullname && data.phone == getUser.phone && data.address == getUser.address) {
            return responseObj(400, "User is not changed", null);
        }
        data.id = user.id;

        try{
            await UserService.changeInfor(data);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    },

    changePassword: async (user, data) => {
        const getUser = await UserService.getUserById(user.id);
        if(getUser == null) return responseObj(404, "User is not exist", null);

        if(getUser.password != data.oldPassword) return responseObj(400, "Old password is incorrect", null);
        if(getUser.password == data.newPassword) return responseObj(400, "New password is the same as old password", null);
        if(Valid.isEmpty(data.newPassword)) return responseObj(400, "New password is required", null);
        if(!Valid.isPassword(data.newPassword)) return responseObj(400, "New password is invalid", null);
        data.id = user.id;

        try{
            await UserService.changePassword(data);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    }
};

export default UserController;
