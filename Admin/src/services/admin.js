import axios from "axios";

axios.defaults.baseURL = "localhost:3000/admins";

export async function getAllAdmins() {
    return await axios.get("http://localhost:3000/admins/list");
}

export async function getAdminById(id) {
    return await axios.get("http://localhost:3000/admins/getById?id="+id);
}

export async function createAdmin(data) {
    try{
        return await axios.post("http://localhost:3000/admins/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function updateAdmin(data) {
    try{
        return await axios.post("http://localhost:3000/admins/update",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function deleteAdmin(id) {
    try{
        return await axios.delete("http://localhost:3000/admins/delete?id="+id);
    }
    catch(err) {
        return err.response;
    }
}

export async function loginAdmin(data) {
    try{
        return await axios.post("http://localhost:3000/admins/login",data);
    }
    catch(err) {
        return err.response;
    }
}