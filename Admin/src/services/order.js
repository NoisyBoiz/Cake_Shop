import axios from "axios";

axios.defaults.baseURL = "localhost:3000/orders";

export async function getAllOrders() {
    return await axios.get("http://localhost:3000/orders/list");
}

export async function getOrderById(id) {
    return await axios.get("http://localhost:3000/orders/getById?id="+id);
}

export async function createOrder(data) {
    try{
        return await axios.post("http://localhost:3000/orders/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function updateOrder(data) {
    try{
        return await axios.post("http://localhost:3000/orders/update",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteOrder(id) {
    try{
        return await axios.delete("http://localhost:3000/orders/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}

