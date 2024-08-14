import axios from "axios";

axios.defaults.baseURL = "localhost:3000/cakes";

export async function getAllCakes() {
    return await axios.get("http://localhost:3000/cakes/list");
}

export async function getCakesByIdType(id_type) {
    return await axios.get("http://localhost:3000/cakes/getByIdType?id="+id_type);
}