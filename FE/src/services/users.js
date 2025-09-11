import { json } from "react-router-dom";
import api from "./api";

export async function login(data) {
    try{
        const res = await api.post("/users/login",data);
        console.log(res)
        if(res && res.status=='200'){
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user))
        }
        return res;
    }
    catch(err) {
        return err.response;
    }
}

export async function register(data) {
    try{
        return await api.post("/users/register",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function changePassword(data) {
    try{
        return await api.post("/users/changePassword",data);
    }
    catch(err) {
        return err.response;
    }
}

export async function changeInfor(data) {
    try{
        return await api.post("/users/changeInfor",data);
    }
    catch(err) {
        return err.response;
    }
}