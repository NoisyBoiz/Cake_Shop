import ClientsService from "../Services/ClientsService.js";
import responseObj from '../ResponseObj/index.js';
import Valid from "../Utils/Valid.js";

const ClientsController = {
    getAllClients: async () => {
        return responseObj(200, "Success", await ClientsService.getAllClients());
    },
    getClientById: async (id) => {
        const client = await ClientsService.getClientById(id);
        if(client == null) return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByName: async (name) => {
        const client = await ClientsService.getClientByName(name);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByPhoneNumber: async (phoneNumber) => {
        const client = await ClientsService.getClientByPhoneNumber(phoneNumber);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByAddress: async (address) => {
        const client = await ClientsService.getClientByAddress(address);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    createClient: async (client) => {
        if(Valid.isEmpty(client.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(client.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(client.phone_number)) return responseObj(400, "Phone number is required", null);
        if(!Valid.isPhoneNumber(client.phone_number)) return responseObj(400, "Phone number is invalid", null);

        if(Valid.isEmpty(client.address)) return responseObj(400, "Address is required", null);
        if(!Valid.isAddress(client.address)) return responseObj(400, "Address is invalid", null);

        if(Valid.isEmpty(client.email)) return responseObj(400, "Email is required", null);
        if(!Valid.isEmail(client.email)) return responseObj(400, "Email is invalid", null);

        if(Valid.isEmpty(client.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(client.password)) return responseObj(400, "Password is invalid", null);

        const clientP = await ClientsService.getClientByPhoneNumber(client.phone_number);
        if(!Valid.isEmpty(clientP)) return responseObj(400, "Phone number is already exist", null);

        const clientE = await ClientsService.getClientByEmail(client.email);
        if(!Valid.isEmpty(clientE)) return responseObj(400, "Email is already exist", null);

        try{
            await ClientsService.createClient(client);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateClient: async (client) => {
        const getClient = await ClientsService.getClientById(client.id);
        if(getClient == null) return responseObj(404, "Client is not exist", null);
        
        if(client.name == getClient.name && client.phone_number == getClient.phone_number && client.address == getClient.address && client.email == getClient.email && client.password == getClient.password) {
            return responseObj(400, "Client is not changed", null);
        }

        if(Valid.isEmpty(client.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(client.name)) return responseObj(400, "Name is invalid", null);

        if(Valid.isEmpty(client.phone_number)) return responseObj(400, "Phone number is required", null);
        if(!Valid.isPhoneNumber(client.phone_number)) return responseObj(400, "Phone number is invalid", null);

        if(Valid.isEmpty(client.address)) return responseObj(400, "Address is required", null);
        if(!Valid.isAddress(client.address)) return responseObj(400, "Address is invalid", null);

        if(Valid.isEmpty(client.email)) return responseObj(400, "Email is required", null);
        if(!Valid.isEmail(client.email)) return responseObj(400, "Email is invalid", null);

        if(Valid.isEmpty(client.password)) return responseObj(400, "Password is required", null);
        if(!Valid.isPassword(client.password)) return responseObj(400, "Password is invalid", null);
        
        const clientP = await ClientsService.getClientByPhoneNumber(client.phone_number);
        if(!Valid.isEmpty(clientP) && clientP.id != Number(client.id)) return responseObj(400, "Phone number is already exist", null);

        const clientE = await ClientsService.getClientByEmail(client.email);
        if(!Valid.isEmpty(clientE) && clientE.id != Number(client.id)) return responseObj(400, "Email is already exist", null);

        try{
            await ClientsService.updateClient(client);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteClient: async (id) => {
        
        if(!await ClientsService.existById(id)) return responseObj(404, "Client is not exist", null);
        try{
            await ClientsService.deleteClient(id);
            return responseObj(200, "Success", await ClientsService.deleteClient(id));
        } 
        catch(err) {
            return responseObj(400, "Delete failed", null);
        }
    },
    loginClient: async (Client) => {
        const getClient = await ClientsService.getClientByEmail(Client.email);
        if(getClient == null) return responseObj(404, "Client is not exist", null);
        if(getClient.password != Client.password) return responseObj(400, "Password is incorrect", null);
        return responseObj(200, "Success", {id: getClient.id, name: getClient.name, email: getClient.email, phone_number: getClient.phone_number, address: getClient.address});
    },
    
    changeInfor: async (Client) => {
        const getClient = await ClientsService.getClientById(Client.id);
        if(getClient == null) return responseObj(404, "Client is not exist", null);
        if(getClient.password != Client.password) return responseObj(400, "Password is incorrect", null);
        if(Client.name == getClient.name && Client.phone_number == getClient.phone_number && Client.address == getClient.address) {
            return responseObj(400, "Client is not changed", null);
        }
        if(Valid.isEmpty(Client.name)) return responseObj(400, "Name is required", null);
        if(!Valid.isName(Client.name)) return responseObj(400, "Name is invalid", null);
        if(Valid.isEmpty(Client.phone_number)) return responseObj(400, "Phone number is required", null);
        if(!Valid.isPhoneNumber(Client.phone_number)) return responseObj(400, "Phone number is invalid", null);
        const checkPhone = await ClientsService.getClientByPhoneNumber(Client.phone_number);
        if(checkPhone != null && checkPhone.id != Client.id) return responseObj(400, "Phone number is already exist", null);

        if(Valid.isEmpty(Client.address)) return responseObj(400, "Address is required", null);
        if(!Valid.isAddress(Client.address)) return responseObj(400, "Address is invalid", null);
        try{
            await ClientsService.changeInfor(Client);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    },
    changePassword: async (Client) => {
        const getClient = await ClientsService.getClientById(Client.id);
        if(getClient == null) return responseObj(404, "Client is not exist", null);
        if(getClient.password != Client.oldPassword) return responseObj(400, "Old password is incorrect", null);
        if(getClient.password == Client.newPassword) return responseObj(400, "New password is the same as old password", null);
        if(Valid.isEmpty(Client.newPassword)) return responseObj(400, "New password is required", null);
        if(!Valid.isPassword(Client.newPassword)) return responseObj(400, "New password is invalid", null);
        try{
            await ClientsService.changePassword(Client);
            return responseObj(200, "Success", null);
        }
        catch(err) {
            return responseObj(400, "Change failed", null);
        }
    }
};

export default ClientsController;