import Users from '../Models/Users.js';

const UserService = {
    getAllUsers: () => {
        return Users.findAll();
    },
    existById: async (id) => {
        const user = await Users.findByPk(id);
        return user != null;
    },
    getUserById: (id) => {
        return Users.findByPk(id);
    },
    getUserByUsername: (username) => {
        return Users.findOne({ where: { username } });
    },
    getUserByPhone: (phone) => {
        return Users.findOne({ where: { phone } });
    },
    registerUser: (user) => {
        // Không cho phép tạo admin qua API
        if (user.role && user.role === 'admin') {
            throw new Error('Không được phép tạo tài khoản admin qua API');
        }
        return Users.create({ ...user, role: 'client' });
    },
    deleteUser: (id) => {
        return Users.destroy({ where: { id } });
    },
    changeInfor: (user) => {
        const newUser = {
            name: user.name,
            phone: user.phone,
            address: user.address
        };
        return Users.update(newUser, { where: { id: user.id } });
    },
    changePassword: (user) => {
        const newUser = { password: user.newPassword };
        return Users.update(newUser, { where: { id: user.id } });
    }
};

export default UserService;
