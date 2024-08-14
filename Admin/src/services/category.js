import axios from "axios";

axios.defaults.baseURL = "localhost:3000/types";

export async function getAllCategorys() {
    return await axios.get("http://localhost:3000/types/list");
}

export async function getCategoryById(id) {
    return await axios.get("http://localhost:3000/types/getById?id="+id);
}

export async function createCategory(data) {
    try{
        return await axios.post("http://localhost:3000/types/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function updateCategory(data) {
    try{
        return await axios.post("http://localhost:3000/types/update",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteCategory(id) {
    try{
        return await axios.delete("http://localhost:3000/types/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}