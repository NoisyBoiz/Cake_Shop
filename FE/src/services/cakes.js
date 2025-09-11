import api from "./api";

export async function getCakes({id,name,id_category}) {
    if(id) return await api.get(`/cakes?id=${id}`);
    if(name) return await api.get(`/cakes?name=${name}`);
    if(id_category) return await api.get(`/cakes?id_category=${id_category}`);
    return await api.get("/cakes");
}