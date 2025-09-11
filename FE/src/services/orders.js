import api from "./api";

export async function createOrder(values) {
    try{
        return await api.post("/orders/create",values);
    }
    catch(err){
        return err.response;
    }
}

export async function getOrder(id=null) {
    if(!id) return await api.get("/orders");
    return await api.get(`/orders?id=${id}`);
}