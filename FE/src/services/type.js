import axios from "axios";

axios.defaults.baseURL = "localhost:3000/types";

export async function getAllTypes() {
    return await axios.get("http://localhost:3000/types/list");
}

export async function getTypeById(id) {
    return await axios.get("http://localhost:3000/types/getById",{
        id
    });
}