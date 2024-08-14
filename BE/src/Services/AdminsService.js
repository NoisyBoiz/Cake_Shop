import {Admins} from '../Models/Admins.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const AdminsService = {
    getAllAdmins: () => {
        return Admins(sequelize).findAll();
    },
    existById: async (id) => {
        const Admin = await Admins(sequelize).findByPk(id);
        return Admin != null;
    },
  
    getAdminById: (id) => {
        return Admins(sequelize).findByPk(id);
    },
    getAdminByEmail: (email) => {
        return Admins(sequelize).findOne({
            where: {
                email: email
            }
        });
    },
    createAdmin: (Admin) => {
        return Admins(sequelize).create(Admin);
    }, 
    updateAdmin: (Admin) => {
        const newAdmin = {
            name: Admin.name,
            phone_number: Admin.phone_number,
            address: Admin.address
        }
        return Admins(sequelize).update(newAdmin, {
            where: {
                id: Admin.id
            }
        });
    },
    deleteAdmin: (id) => {
        try{
            return Admins(sequelize).destroy({
                where: {
                    id: id
                }
            });
        }
        catch (error){ 
            console.log(error); 
        }
    }
};

export default AdminsService;