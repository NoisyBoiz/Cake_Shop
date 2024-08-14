import OrdersService from '../Services/OrdersService.js';
import responseObj from '../ResponseObj/index.js';
import BillsService from '../Services/BillsService.js';
import CakesService from '../Services/CakesService.js';
import Valid from '../Utils/Valid.js';
import CakeSizesService from '../Services/CakeSizesService.js';

const OrdersController = {
    getAllOrders: async () => {
        const orders = await OrdersService.getAllOrders();
        return responseObj(200, "Success", orders);
    },
    getOrderById: async (id) => {
        const order = await OrdersService.getOrderById(id);
        if (order == null) return responseObj(404, "Order is not exist", null);
        return responseObj(200, "Success", order);
    },
    createOrder: async (order) => {
        if(Valid.isEmpty(order.id_bill)) return responseObj(400, "Bill is required", null);
        if(!Valid.isNumber(order.id_bill)) return responseObj(400, "Bill is invalid", null);
        if(!await BillsService.existById(order.id_bill)) return responseObj(400, "Bill is not exist", null);

        if(Valid.isEmpty(order.id_cake)) return responseObj(400, "Cake is required", null);
        if(!Valid.isNumber(order.id_cake)) return responseObj(400, "Cake is invalid", null);
        if(!await CakesService.existById(order.id_cake)) return responseObj(400, "Cake is not exist", null);

        if(Valid.isEmpty(order.size)) return responseObj(400, "Size is required", null);
        if(!await CakeSizesService.existByIdCakeAndSize(order.id_cake, order.size)) return responseObj(400, "Size is not exist", null);

        if(Valid.isEmpty(order.quantity)) return responseObj(400, "Quantity is required", null);
        if(!Valid.isNumber(order.quantity)) return responseObj(400, "Quantity is invalid", null);
        if(order.quantity < 1) return responseObj(400, "Quantity is invalid", null);

        try{
            await OrdersService.createOrder(order);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateOrder: async (order) => {
        if(Valid.isEmpty(order.id)) return responseObj(400, "Id is required", null);
        if(!await OrdersService.existById(order.id)) return responseObj(404, "Order is not exist", null);

        if(Valid.isEmpty(order.id_bill)) return responseObj(400, "Bill is required", null);
        if(!Valid.isNumber(order.id_bill)) return responseObj(400, "Bill is invalid", null);
        if(!await BillsService.existById(order.id_bill)) return responseObj(400, "Bill is not exist", null);

        if(Valid.isEmpty(order.id_cake)) return responseObj(400, "Cake is required", null);
        if(Valid.isEmpty(order.size)) return responseObj(400, "Size is required", null);
        if(!await CakeSizesService.existByIdCakeAndSize(order.id_cake, order.size)) return responseObj(400, "Size is not exist", null);

        if(Valid.isEmpty(order.quantity)) return responseObj(400, "Quantity is required", null);
        if(!Valid.isNumber(order.quantity)) return responseObj(400, "Quantity is invalid", null);
        if(order.quantity < 1) return responseObj(400, "Quantity is invalid", null);

        try{
            await OrdersService.updateOrder(order);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Update failed", null);
        }
    },
    deleteOrder: async (id) => {
        if(!await OrdersService.existById(id)) return responseObj(404, "Order is not exist", null);
        try{
            await OrdersService.deleteOrder(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default OrdersController;