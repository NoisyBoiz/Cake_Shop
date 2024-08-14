import BillsService from "../Services/BillsService.js";    
import OrdersService from "../Services/OrdersService.js";
import ClientsService from "../Services/ClientsService.js";
import CakeSizesService from "../Services/CakeSizesService.js";
import responseObj from '../ResponseObj/index.js';
import CakesService from "../Services/CakesService.js";
import Valid from "../Utils/Valid.js";

const BillsController = {
    getAllBills: async () => {
        const bills = await BillsService.getAllBills();
        return responseObj(200, "Success", bills);
    },

    getAllDetailBills: async () => {
        const detailBill = await BillsService.getAllDetailBills();
        return responseObj(200, "Success", detailBill);
    },

    getDetailBillById: async (id) => {    
        const detailBill = await BillsService.getDetailBillById(id);
        return responseObj(200, "Success", detailBill);
    },

    getDetailBillByIdClient: async (id_client) => {
        const detailBill = await BillsService.getDetailBillByIdClient(id_client);
        return responseObj(200, "Success", detailBill);
    },

    getBillByDeliveryDate: async (startDate, endDate) => {
        const bills = await BillsService.getBillByDeliveryDate(startDate, endDate);
        return responseObj(200, "Success", bills);
    },

    getBillByCreatedDate: async (startDate, endDate) => {
        const bills = await BillsService.getBillByCreatedDate(startDate, endDate);
        return responseObj(200, "Success", bills);
    },

    createTotal: async (total) => {
        console.log(total);
        if(Valid.isEmpty(total.id_client)) return responseObj(400, "Client is required", null);
        if(!Valid.isNumber(total.id_client)) return responseObj(400, "Client is invalid", null);
        if(!await ClientsService.existById(total.id_client)) return responseObj(400, "Client is not exist", null);

        if(Valid.isEmpty(total.delivery_date)) return responseObj(400, "Delivery date is required", null);
        else{
            const date = new Date(total.delivery_date).getTime() + 30*60*1000;
            const currentDate = new Date().getTime();
            if(date < currentDate) return responseObj(400, "Delevidate invalid", null);
        }

        if(Valid.isEmpty(total.list_order)) return responseObj(400, "List order is required", null);
        if(total.list_order.length == 0) return responseObj(400, "List order is empty", null);
        for (const order of total.list_order) {
            if(Valid.isEmpty(order.id_cake)) return responseObj(400, "Cake is required", null);
            if(!Valid.isNumber(order.id_cake)) return responseObj(400, "Cake is invalid", null);
            if(!await CakesService.existById(order.id_cake)) return responseObj(400, "Cake is not exist", null);
            if(Valid.isEmpty(order.size)) return responseObj(400, "Size is required", null);
            if(Valid.isEmpty(order.quantity)) return responseObj(400, "Quantity is required", null);
            if(!Valid.isNumber(order.quantity)) return responseObj(400, "Quantity is invalid", null);
            if(order.quantity < 1) return responseObj(400, "Quantity is invalid", null);
        }

        // create bill
        let bill = {
            id_client: total.id_client,
            notice: total.notice,
            delivery_date: total.delivery_date,
            created_at: new Date(),
            status: false
        }
  
        bill = await BillsService.createBill(bill);
    
        // create order
        for (const order of total.list_order) {
            const newOrder = {
                id_bill: bill.id,
                id_cake: order.id_cake,
                name_cake: order.name_cake,
                size: order.size,
                quantity: order.quantity
            }
            await OrdersService.createOrder(newOrder);
        }
    
        return responseObj(200, "Success", total);
    },

    createBill: async (bill) => {
        if(Valid.isEmpty(bill.id_client)) return responseObj(400, "Client is required", null);
        if(!Valid.isNumber(bill.id_client)) return responseObj(400, "Client is invalid", null);
        if(!await ClientsService.existById(bill.id_client)) return responseObj(400, "Client is not exist", null);

        if(Valid.isEmpty(bill.delivery_date)) return responseObj(400, "Delivery date is required", null);
        else{
            const date = new Date(bill.delivery_date).getTime();
            const currentDate = new Date().getTime() + 30*60*1000;
            if(date < currentDate) return responseObj(400, "Delevidate invalid", null);
        }
        try{
            let data = {
                id_client: bill.id_client,
                notice: bill.notice,
                delivery_date: bill.delivery_date,
                created_at: new Date(),
                status: false
            }

            BillsService.createBill(data);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Create failed", null);
        }
    },
    updateBill: async (bill) => {
        if(!await BillsService.existById(bill.id)) return responseObj(400, "Bill is not exist", null);
        
        if(Valid.isEmpty(bill.id_client)) return responseObj(400, "Client is required", null);
        if(!Valid.isNumber(bill.id_client)) return responseObj(400, "Client is invalid", null);
        if(!await ClientsService.existById(bill.id_client)) return responseObj(400, "Client is not exist", null);

        if(Valid.isEmpty(bill.delivery_date)) return responseObj(400, "Delivery date is required", null);
        else{
            const date = new Date(bill.delivery_date).getTime();
            const currentDate = new Date().getTime() + 30*60*1000;
            if(date < currentDate) return responseObj(400, "Delevidate invalid", null);
        }
        if(Valid.isEmpty(bill.status)) return responseObj(400, "Status is required", null);

        try{
            let data = {
                id: bill.id,
                id_client: bill.id_client,
                notice: bill.notice,
                delivery_date: bill.delivery_date,
                status: bill.status?true:false
            }
            BillsService.updateBill(data)
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Update failed", null);
        }
       
    },
    deleteBill: async (id) => {
        if(!await BillsService.existById(id)) return responseObj(400, "Bill is not exist", null);
        try{
            await BillsService.deleteBill(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    },
    test: async () => {
        console.log("test");
        console.log(await BillsService.getTest())
    }
};

export default BillsController;