import {Clients} from '../Models/Clients.js';
import connection from '../Config/index.js';
import e from 'express';
const sequelize = await connection();

const ClientsService = {
    getAllClients: () => {
        return Clients(sequelize).findAll();
    },
    existById: async (id) => {
        const client = await Clients(sequelize).findByPk(id);
        return client != null;
    },

    getClientById: (id) => {
        return Clients(sequelize).findByPk(id);
    },
    getClientByName: (name) => {
        const result = Clients(sequelize).findAll({
            where: {
                name:  sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            }
        });
        return result;
    },
    getClientByPhoneNumber:  (phoneNumber) => {
        const result = Clients(sequelize).findOne({
            where: {
                phone_number: phoneNumber   
            }
        });
        return result;
    },
    getClientByAddress:  (address) => {
        const result = Clients(sequelize).findAll({
            where: {
                address: sequelize.where(sequelize.fn('LOWER', sequelize.col('address')), 'LIKE', '%' + address.toLowerCase() + '%')
            }
        });
        return result;
    },
    getClientByEmail: (email) => {
        return Clients(sequelize).findOne({
            where: {
                email: email
            }
        });
    },
    createClient: (client) => {
        return Clients(sequelize).create(client);
    },
    updateClient: (client) => {
        const newClient = {
            name: client.name,
            phone_number: client.phone_number,
            address: client.address,
            email: client.email,
            password: client.password
        }
        return Clients(sequelize).update(newClient, {
            where: {
                id: client.id
            }
        });
    },
    deleteClient: (id) => {
        return Clients(sequelize).destroy({
            where: {
                id: id
            }
        });
    },
    changeInfor: (client) => {
        const newClient = {
            name: client.name,
            phone_number: client.phone_number,
            address: client.address
        }
        return Clients(sequelize).update(newClient, {
            where: {
                id: client.id
            }
        });
    },
    changePassword: (client) => {
        const newClient = {
            password: client.newPassword
        }
        return Clients(sequelize).update(newClient, {
            where: {
                id: client.id
            }
        });
    }
};

export default ClientsService;