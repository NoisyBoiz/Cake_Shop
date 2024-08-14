import axios from "axios";

axios.defaults.baseURL = "localhost:3000/cakes";

export async function getAllCakes() {
    return await axios.get("http://localhost:3000/cakes/list");
}

export async function getCakeById(id) {
    return await axios.get("http://localhost:3000/cakes/getById?id="+id);
}

export async function createCake(data) {
    try{
        return await axios.post("http://localhost:3000/cakes/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function updateCake(data) {
    try{
        return await axios.post("http://localhost:3000/cakes/update",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteCake(id) {
    try{
        return await axios.delete("http://localhost:3000/cakes/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}