import CartService from "../Services/CartService.js";
import CakeService from "../Services/CakeService.js";
import SizeService from "../Services/SizeService.js";
import responseObj from "../ResponseObj/index.js";
import Valid from "../Utils/Valid.js";

const CartController = {
    getCartByUserId: async (id_user) => {
        if(Valid.isEmpty(id_user)) return responseObj(400, "User id is required", null);
        try{
            const cartItems = await CartService.getCartByUserId(id_user);
            return responseObj(200, "Success", cartItems);
        }
        catch(error) {
            console.log(error);
            return responseObj(400, "Get cart failed", null);
        }   
    },
    addToCart: async (user, data) => {
        if(Valid.isEmpty(data.id_cake)) return responseObj(400, "Cake id is required", null);
        let cake = await CakeService.getCakeById(data.id_cake);
        if(cake == null) return responseObj(404, "Cake is not exist", null);

        if(Valid.isEmpty(data.id_size)) return responseObj(400, "Size id is required", null);
        let size = await SizeService.getSizeById(data.id_size);
        if(size == null || size.id_cake != data.id_cake) return responseObj(404, "Size is not exist", null);

        if(Valid.isEmpty(data.quantity)) return responseObj(400, "Quantity is required", null);
        if(!Valid.isPositiveNumber(data.quantity)) return responseObj(400, "Quantity is invalid", null);
        data.id_user = user.id;
        try{
            const cartItem = await CartService.addToCart(data);
            return responseObj(200, "Success", cartItem);
        }
        catch(error) {
            console.log(error);
            return responseObj(400, "Add to cart failed", null);
        }
    },
    updateCartItem: async (id, quantity) => {
        if(Valid.isEmpty(id)) return responseObj(400, "Cart item id is required", null);

        if(Valid.isEmpty(quantity)) return responseObj(400, "Quantity is required", null);
        if(!Valid.isPositiveNumber(quantity)) return responseObj(400, "Quantity is invalid", null);
        try{
            const cartItem = await CartService.updateCartItem(id, quantity);
            if(cartItem == null) return responseObj(404, "Cart item is not exist", null);
            return responseObj(200, "Success", cartItem);
        }
        catch(error) {
            return responseObj(400, "Update cart item failed", null);
        }
    },
    removeCartItem: async (user, id) => {
        if(Valid.isEmpty(id)) return responseObj(400, "Cart item id is required", null);
        
        const cartItem = await CartService.getCartById(id);
        if(cartItem == null) return responseObj(404, "Cart item is not exist", null);
        if(cartItem.id_user !== user.id) return responseObj(403, "You do not have permission to remove this item", null);
        
        try{
            await CartService.removeCartItem(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            console.log(error)
            return responseObj(400, "Remove cart item failed", null);
        }
    },
    clearCartByUserId: async (id_user) => {
        if(Valid.isEmpty(id_user)) return responseObj(400, "User id is required", null);
        try{
            await CartService.clearCartByUserId(id_user);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Clear cart failed", null);
        }
    }
};
export default CartController;