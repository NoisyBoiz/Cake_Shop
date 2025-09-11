import React, { useEffect, useState } from 'react';
import { GiMilkCarton } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../assets/styles/cart.css"
import CartItem from "../components/CartItem.jsx"
import { getCart, updateCart, removeItem } from "../services/carts.js"
import { createOrder } from "../services/orders.js"
import { useNotification } from '../components/Notification';

const Cart = () => {
    const min = 0;
    const max = 10;
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const { showNotification } = useNotification();

    const [notice, setNotice] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        getCart().then((res) => {
            console.log(res)
            if (res && res.status == '200') {
                setCarts(res.data.data)
            }
        })
        .catch((err) => {
            if(err?.response?.status == '401') {
                showNotification({
                    title: "Thông báo",
                    message: "Vui lòng đăng nhập để thực hiện chức năng này!",
                    handleAccept: () => {window.location.href = "/login"},
                    handleCancel: () => {window.location.href = "/"},
                    titleAccept: "Đăng nhập",
                    titleCancel: "Trở về trang chủ",
                    type: "warning"
                });     
            }
            else {
                showNotification({
                    title: "Lỗi",
                    message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                    type: "error"
                });
            }
        })
    }, [])

    const updateQuantity = (id, newQuantity, setQuantity) => {
        if (isNaN(newQuantity) || newQuantity < min) {
            newQuantity = min;
        } else if (newQuantity > max) {
            newQuantity = max;
        }
        updateCart({id:id, quantity: newQuantity}).then((res) => {
            if(res && res.status=='200'){
                setQuantity(newQuantity);

                const newCarts = carts.map((cart) => {
                    if (cart.id === id) {
                        return { ...cart, quantity: newQuantity };
                    }
                    return cart;
                });

                setCarts(newCarts);
            }
        })
    };

    const removeCartItem = (id) => {
        removeItem(id).then((res) => {
            if(res && res.status==200){
                setCarts(carts.filter((cart) => cart.id!=id))
            }
        })
    }

    useEffect(() => {
        let total = 0;
        for(const id of selectedItems) {
            const cartItem = carts.find(cart => cart.id === id);
            if (cartItem) {
                total += cartItem?.Size.origin_price * (1 - (cartItem?.Size.discount || 0)) * cartItem.quantity;
            }
        }
        setTotalPrice(total);
    }, [carts, selectedItems]);

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Khi nhấn nút 'Mua ngay', mở modal chọn ngày giờ và ghi chú
    const handleOrderClick = () => {
        if (selectedItems.length === 0) {
            showNotification({
                title: "Thông báo",
                message: "Vui lòng chọn sản phẩm để đặt hàng",
                type: "warning"
            });
            return;
        }
        setShowOrderModal(true);
    };

    // Khi xác nhận đặt hàng trong modal
    const handleOrderSubmit = () => {
        if (!deliveryDate) {
            showNotification({
                title: "Thông báo",
                message: "Vui lòng chọn ngày giờ giao hàng",
                type: "warning"
            });
            return;
        }
        createOrder({ cart_ids: selectedItems, delivery_date: deliveryDate, notice }).then((res) => {
            if (res && res.status === 200) {
                setCarts(carts.filter(cart => !selectedItems.includes(cart.id)));
                setSelectedItems([]);
                setTotalPrice(0);
                setShowOrderModal(false);
                setDeliveryDate("");
                setNotice("");
            } else {
                showNotification({
                    title: "Lỗi",
                    message: res.data.message,
                    type: "error"
                });
            }
        });
    };

    return (
        <div id="cart" className="cart container my-4 p-3 shadow rounded bg-white">
            <div className="row mb-3">
                <div className="col-12">
                    <h4 className="text-center py-2 text-white rounded" style={{backgroundColor: "var(--primary-color)"}}>GIỎ HÀNG ({carts && carts.length})</h4>
                </div>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    {carts && carts?.map((item, index) => (
                        <div key={index} className="d-flex align-items-center gap-3 py-2 border-bottom">
                            <CartItem selectItem={handleSelectItem} updateQuantity={updateQuantity} removeCartItem={removeCartItem} data={item}/>
                        </div>
                    ))}
                    {carts.length == 0 && (
                        <div className="text-center py-4">
                            <img className="img-fluid" style={{maxWidth: '140px', opacity: 0.85}} src="src/assets/images/nocake.png" alt="not found" />
                            <div className="mt-2 text-muted">Không có sản phẩm nào trong giỏ hàng</div>
                        </div>
                    )}
                </li>
            </ul>
            <div className="list-group-item d-flex justify-content-between align-items-center ">
                <span className="fw-semibold" style={{fontSize:"1.2rem"}}>Tổng cộng:</span>
                <span className="fw-bold" style={{fontSize:"1.2rem", color: "var(--primary-color)"}} >{totalPrice.toLocaleString()} VNĐ</span>
            </div>

            <button
                className="btn btn-secondary w-100"
                    onClick={handleOrderClick}
                disabled={selectedItems.length === 0}
                style={{backgroundColor: "var(--primary-color)", border: "none"}}
            >
                Mua ngay
            </button>

                {/* Modal chọn ngày giờ và ghi chú */}
                {showOrderModal && (
                    <div className="modal" style={{display: 'block', background: 'rgba(0,0,0,0.3)', position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:9999}}>
                        <div className="modal-dialog" style={{maxWidth: 400, margin: '10vh auto'}}>
                            <div className="modal-content p-4">
                                <h5 className="mb-3">Chọn ngày giờ giao hàng</h5>
                                <input
                                    type="datetime-local"
                                    className="form-control mb-3"
                                    value={deliveryDate}
                                    onChange={e => setDeliveryDate(e.target.value)}
                                    required
                                />
                                <h5 className="mb-2">Ghi chú (không bắt buộc)</h5>
                                <textarea
                                    className="form-control mb-3"
                                    value={notice}
                                    onChange={e => setNotice(e.target.value)}
                                    placeholder="Nhập ghi chú nếu có..."
                                />
                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>Hủy</button>
                                    <button className="btn btn-primary" style={{backgroundColor: "var(--primary-color)"}} onClick={handleOrderSubmit}>Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Cart