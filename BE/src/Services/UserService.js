import { User } from '../Models/User.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const UserService = {
    getAllUsers: () => {
        return User(sequelize).findAll();
    },
    existById: async (id) => {
        const user = await User(sequelize).findByPk(id);
        return user != null;
    },
    getUserById: (id) => {
        return User(sequelize).findByPk(id);
    },
    getUserByEmail: (email) => {
        return User(sequelize).findOne({ where: { email } });
    },
    getUserByPhoneNumber: (phone_number) => {
        return User(sequelize).findOne({ where: { phone_number } });
    },
    createUser: (user) => {
        // Không cho phép tạo admin qua API
        if (user.role && user.role === 'admin') {
            throw new Error('Không được phép tạo tài khoản admin qua API');
        }
        return User(sequelize).create({ ...user, role: 'client' });
    },
    updateUser: (user) => {
        const newUser = {
            name: user.name,
            phone_number: user.phone_number,
            address: user.address,
            email: user.email,
            password: user.password
        };
        return User(sequelize).update(newUser, { where: { id: user.id } });
    },
    deleteUser: (id) => {
        return User(sequelize).destroy({ where: { id } });
    },
    changeInfor: (user) => {
        const newUser = {
            name: user.name,
            phone_number: user.phone_number,
            address: user.address
        };
        return User(sequelize).update(newUser, { where: { id: user.id } });
    },
    changePassword: (user) => {
        const newUser = { password: user.newPassword };
        return User(sequelize).update(newUser, { where: { id: user.id } });
    }
};

export default UserService;
