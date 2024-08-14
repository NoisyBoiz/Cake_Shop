import axios from "axios";

axios.defaults.baseURL = "localhost:3000/clients";


export async function loginClient(data) {
    try{
        return await axios.post("http://localhost:3000/clients/login",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function registerClient(data) {
    try{
        return await axios.post("http://localhost:3000/clients/create",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function changePassword(data) {
    try{
        return await axios.post("http://localhost:3000/clients/changePassword",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function changeInfor(data) {
    try{
        return await axios.post("http://localhost:3000/clients/changeInfor",data);
    }
    catch(err) {
        return err.response;
    }
}