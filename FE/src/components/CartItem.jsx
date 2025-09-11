import React, { useState, useEffect } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";

const CartItem = ({selectItem, updateQuantity, removeCartItem, data}) => {
    console.log(data)
    const min = 0;
    const max = 10;
    const [quantity, setQuantity] = useState(data?.quantity || 1)

    return (
        <>
            <div>
                <input 
                    name="selectItem"
                    type="checkbox" 
                    className="form-check-input custom-checkbox" 
                    onChange={(e) => selectItem(data.id, e.target.checked)} 
                />
            </div>
            <div>
                <img className="item__img" src={data?.Cake?.Images[0].path} alt="" />
            </div>
            <div className="item__body">
                <div className="cart__item-trash">
                    <h4 className="item__heading">{data.name}</h4>
                </div>

                <h5 className="item__price">{(data.quantity * data?.Size?.origin_price * (1 - (data?.Size?.discount || 0))).toLocaleString()} VND </h5>
                <div className="d-flex flex-row align-items-center gap-3">
                    <h5 className="item__size">Kích thước</h5>
                    <h5 className="item__size--value">{data?.Size?.size}</h5>
                </div>
                <div className="d-flex flex-row align-items-center gap-3">
                    <div className="fw-semibold">Số lượng</div>
                    <div className="quantity-group">
                        <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(data.id, quantity - 1, setQuantity)}
                            disabled={quantity <= min}
                        >
                            −
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            min={min}
                            max={max}
                            onChange={(e) => updateQuantity(data.id, parseInt(e.target.value), setQuantity)}
                            className="quantity-input text-center"
                        />

                        <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(data.id, quantity + 1, setQuantity)}
                            disabled={quantity >= max}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <button 
                    onClick={() => removeCartItem(data.id)}
                    style={{fontSize: '1.5rem', backgroundColor: "transparent", color: "var(--primary-color) !important", border: 'none', cursor: 'pointer'}}
                >
                    <FaRegTrashCan />
                </button>
            </div>
        </>
    )
} 

export default CartItem;