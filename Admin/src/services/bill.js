import axios from "axios";

axios.defaults.baseURL = "localhost:3000/bills";

export async function getDetailBillByDeliveryDate(startDate, endDate) {
    return await axios.get("http://localhost:3000/bills/getByDeliveryDate?startDate="+startDate+"&endDate="+endDate);
}

export async function getDetailBillByCreatedDate(startDate, endDate) {
    return await axios.get("http://localhost:3000/bills/getByCreatedDate?startDate="+startDate+"&endDate="+endDate);
}

export async function getAllBills() {
    return await axios.get("http://localhost:3000/bills/list");
}

export async function getBillById(id) {
    return await axios.get("http://localhost:3000/bills/getById?id="+id);
}

export async function createBill(values) {
    try{
        return await axios.post("http://localhost:3000/bills/create",values);
    }
    catch(err) {
        return err.response;
    }
}
export async function updateBill(values) {
    try{
        return await axios.post("http://localhost:3000/bills/update",values);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteBill(id) {
    try{
        return await axios.delete("http://localhost:3000/bills/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}
