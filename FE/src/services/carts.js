import api from "./api";

export async function getCart(){
    return api.get("/carts")
}

export async function addToCart(data) {
    return api.post("/carts/add", data)
}

export async function updateCart(data) {
    return api.post("/carts/update", data)
}

export async function removeItem(id) {
    return api.delete(`/carts/remove?id=${id}`)
}