import api from "./api";

export async function getCategory(id=null) {
    if(!id) return await api.get("/categories");
    return await api.get(`/categories?id=${id}`);
}