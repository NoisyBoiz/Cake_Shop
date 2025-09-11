import OrderService from "../Services/OrderService.js";  
import CartService from "../Services/CartService.js";  
import UserService from "../Services/UserService.js";
import CakeService from "../Services/CakeService.js";
import SizeService from "../Services/SizeService.js";
import responseObj from '../ResponseObj/index.js';
import Valid from "../Utils/Valid.js";

const OrderController = {
    getAllOrder: async () => {
        const orders = await OrderService.getAllOrder();
        return responseObj(200, "Success", orders);
    },

    getOrderById: async (id_user, id) => {
        const order = await OrderService.getOrderById(id);
        if(order == null) return responseObj(404, "Order is not exist", null);
        if(id_user != null && order.id_user != id_user) return responseObj(403, "Forbidden", null);
        return responseObj(200, "Success", order);
    },

    getOrderByIdUser: async (id_user) => {
        const orderDetail = await OrderService.getOrderByIdUser(id_user);
        return responseObj(200, "Success", orderDetail);
    },

    createOrder: async (user, data) => {
        let products = [];
        if(data.cart_ids != null && data.cart_ids.length > 0) {
            for (const id of data.cart_ids) {
                const cart = await CartService.getCartById(id);
                if(cart == null || cart.id_user != user.id) return responseObj(400, "Cart is not exist", null);
                products.push({
                    id_cart: cart.id,
                    id_cake: cart.id_cake,
                    id_size: cart.id_size,
                    quantity: cart.quantity
                });
            }
        }
        else{
            if(Valid.isEmpty(data.id_cake)) return responseObj(400, "id_cake is required", null);
            if(!Valid.isNumber(data.id_cake)) return responseObj(400, "id_cake is invalid", null);
            const cake = await CakeService.getCakeById(data.id_cake);
            if(cake == null) return responseObj(404, "Cake is not exist", null);

            if(Valid.isEmpty(data.id_size)) return responseObj(400, "id_size is required", null);
            if(!Valid.isNumber(data.id_size)) return responseObj(400, "id_size is invalid", null);
            const size = await SizeService.getSizeById(data.id_size);
            if(size == null || size.id_cake != data.id_cake) return responseObj(404, "Size is not exist", null);

            if(Valid.isEmpty(data.quantity)) return responseObj(400, "Quantity is required", null);
            if(!Valid.isPositiveNumber(data.quantity)) return responseObj(400, "Quantity is invalid", null);

            products.push({
                id_cart: null,
                id_cake: data.id_cake,
                id_size: data.id_size,
                quantity: data.quantity
            });
        }

        if(Valid.isEmpty(data.delivery_date)) return responseObj(400, "Delivery date is required", null);
        else{
            const expected = new Date(data.delivery_date).getTime();
            const available = new Date().getTime() + 60*60*1000;
            if(expected < available) return responseObj(400, "Delivery date invalid", null);
        }

        try{
            let orderData = {
                id_user: user.id,
                notice: data.notice,
                delivery_date: data.delivery_date,
            }

            const order = await OrderService.createOrder(orderData);
            for (const product of products) {
                const size = await SizeService.getSizeById(product.id_size);
                if(size == null || size.id_cake != product.id_cake) return responseObj(404, "Size is not exist", null);

                let orderDetail = {
                    id_order: order.id,
                    id_cake: product.id_cake,
                    id_size: product.id_size,
                    price: size.origin_price * (1 - (size.discount ? size.discount : 0)/100),
                    quantity: product.quantity
                }
                await OrderService.createOrderDetail(orderDetail);
                if(product.id_cart != null) await CartService.removeCartItem(product.id_cart);
            }

            return responseObj(200, "Success", order);
        }
        catch(error) {
            console.log(error);
            return responseObj(400, "Create failed", null);
        }
    },

    updateOrder: async (data) => {
        const order = await OrderService.getOrderById(data.id);
        if(order == null) return responseObj(404, "Order is not exist", null);

        if(Valid.isEmpty(order.delivery_date)) return responseObj(400, "Delivery date is required", null);
        else{
            const expected = new Date(order.delivery_date).getTime();
            const available = new Date().getTime() + 60*60*1000;
            if(expected < available) return responseObj(400, "Delivery date invalid", null);
        }

        if(Valid.isEmpty(order.status)) return responseObj(400, "Status is required", null);

        try{
            let orderData = {
                id: order.id,
                delivery_date: data.delivery_date ? data.delivery_date : order.delivery_date,
                status: data.status ? data.status : order.status
            }
            console.log("########## Update Order:", orderData);
            OrderService.updateOrder(data)
            return responseObj(200, "Success", null);
        }
        catch(error) {
            console.log(error);
            return responseObj(400, "Update failed", null);
        }
    },

    cancelOrder: async (user, id) => {  
        const order = await OrderService.getOrderById(id);
        if(order == null || order.id_user != user.id) return responseObj(404, "Order is not exist", null);
        if(order.status === 'canceled') return responseObj(400, "Order is already canceled", null);
        if(order.status === 'delivered') return responseObj(400, "Delivered order cannot be canceled", null);
        try{
            await OrderService.cancelOrder(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Cancel failed", null);
        }
    }
};

export default OrderController;