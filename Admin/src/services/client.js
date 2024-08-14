import axios from "axios";

axios.defaults.baseURL = "localhost:3000/clients";

export async function getAllClients() {
    return await axios.get("http://localhost:3000/clients/list");
}

export async function getClientById(id) {
    return await axios.get("http://localhost:3000/clients/getById?id="+id);
}

export async function createClient(data) {
    try{
        return await axios.post("http://localhost:3000/clients/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function updateClient(data) {
    try{
        return await axios.post("http://localhost:3000/clients/update",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteClient(id) {
    try{
        return await axios.delete("http://localhost:3000/clients/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}
