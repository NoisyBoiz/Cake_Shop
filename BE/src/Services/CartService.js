import Carts from '../Models/Carts.js';
import Users from '../Models/Users.js';
import Cakes from '../Models/Cakes.js';
import Sizes from '../Models/Sizes.js';
import Images from '../Models/Images.js';

Users.hasMany(Carts, { foreignKey: 'id_user', sourceKey: 'id' });
Carts.belongsTo(Users, { foreignKey: 'id_user', targetKey: 'id' });

Cakes.hasMany(Carts, { foreignKey: 'id_cake', sourceKey: 'id' });
Carts.belongsTo(Cakes, { foreignKey: 'id_cake', targetKey: 'id' });

// Cakes.hasMany(Images, { foreignKey: 'id_cake', sourceKey: 'id' });
// Images.belongsTo(Cakes, { foreignKey: 'id_cake', targetKey: 'id' });

Sizes.hasMany(Carts, {foreignKey: 'id_size',sourceKey: 'id'});
Carts.belongsTo(Sizes, { foreignKey: 'id_size', targetKey: 'id' });

const CartService = {
    getCartById: async (id) => {
        return await Carts.findByPk(id);
    },

    getCartByUserId: async (id_user) => {
        return await Carts.findAll({
            where: { id_user: id_user },
            include: [
                { model: Users, attributes: ['fullname', 'phone', 'address'] },
                { model: Cakes, attributes: ['id', 'name', 'description'],
                    include: [
                        { model: Images, attributes: ['path'] },
                    ]
                },
                { model: Sizes, attributes: ['size', 'origin_price', 'discount'] }
            ]
        });
    },

    addToCart: async (data) => {
        const existingCartItem = await Carts.findOne({
            where: {
                id_user: data.id_user,
                id_cake: data.id_cake,
                id_size: data.id_size
            }
        });
        if (existingCartItem) {
            existingCartItem.quantity += data.quantity;
            await existingCartItem.save();
            return existingCartItem;
        } else {
            return Carts.create(data);
        }
    },
    updateCartItem: async (id, quantity) => {
        const cartItem = await Carts.findByPk(id);
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            return cartItem;
        }
        return null;
    },

    removeCartItem: async (id) => {
        return await Carts.destroy({
            where: { id: id }
        });
    },
    
    clearCartByUserId: async (id_user) => {
        return await Carts.destroy({
            where: { id_user: id_user }
        });
    }
};

export default CartService;