import { useEffect, useState } from 'react';
import { GiMilkCarton } from "react-icons/gi";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cart = ({openCart,handleIsCart,changeCart}) => {
    // const [openCart, setOpenCart] = useState(true);
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalProducts,setTotalProducts] = useState(0);
    const handleOpenCart2 = () => {
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        handleIsCart();
        handleChangeTotalPrice(cart);
    }
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        handleChangeTotalPrice(JSON.parse(localStorage.getItem('cart')));
    },[changeCart,totalPrice]);
   
    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        handleChangeTotalPrice(JSON.parse(localStorage.getItem('cart')));
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        }
      }, [localStorage,totalPrice]); 
      
      const handleStorageChange = () => {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }

    const handleRemoveCake = (index) => {
        const ans = cart.filter((c,i) => i !== index);
        setCart(ans);
        localStorage.setItem("cart",JSON.stringify(ans));
        handleChangeTotalPrice(ans);
    }
    const handleChangeTotalPrice = (a) => {
        let total = 0;
        let totalCakes = 0;
        a?.forEach((e) => {
            total += e.moreInfo.price*e.quantity;
            totalCakes += e.quantity;
        });
        setTotalPrice(total);
        setTotalProducts(totalCakes);
    }

  return (
    <div className="cart">
        <div className="cart__container" onClick={() => handleOpenCart2()}>
            <span className="cart__number">{totalProducts}</span>
            <GiMilkCarton />
        </div>
    
            <div id="cart" className={`cart__products ${openCart ? 'cart__display' : 'cart__visible'}`}
        >
            <span className="caret"></span>
            <ul className="list-group">
                <li className="list-group-item title">
                    GIỎ HÀNG (
                    <span className="countProduct">{totalProducts}</span>
                    )
                </li>
                <li className="list-group-item divider"></li>
                <li className="list-group-item item">
                    {cart?.map((item,index)=>(
                        <>
                            <div key={index} className="item__container">
                                <div>
                                    <div>
                                        <img className="item__img" src={item.list_image[0].image} alt="" />
                                    </div>
                                </div>
                                <div className="item__body">
                                    <div className="cart__item-trash">
                                        <h4 className="item__heading">{item.name}</h4>
                                        <span onClick={() => handleRemoveCake(index)}><FaRegTrashCan /></span>
                                    </div>
                                    
                                    <h5><span className="item__price">{item.quantity * item.moreInfo.price+ " VND"} </span></h5>
                                    <h5><span className="item__size">Kích thước</span>
                                    <span className="item__size--value">{item.moreInfo.size}</span>
                                    </h5>
                                    <h5><spa className="item__quantity">Số lượng</spa>
                                    <span className="item__quantity--value">{item.quantity}</span>
                                    </h5>
                                </div>
                            </div>
                            <div className="divider"></div>
                        </>
                        
                    ))}
                    {cart.length == 0 && (
                        <div className="cart__no--product">
                            <img className="no__product" src="src/assets/images/nocake.png" alt="not found" />
                        </div>
                    )}
                
                </li>
                <li className="list-group-item divider-1"></li>
                <li className="list-group-item total">
                    <span className="tleft">Tổng cộng:</span>
                    <span className="tright">{totalPrice + " VNĐ"}</span>
                </li>
                {
                    totalPrice == 0 && (
                        <li className="list-group-item butn">
                            <button disabled className= "dis__link btn btn-checkout ">
                                Mua ngay
                            </button>
                        </li>
                    )
                }
                {totalPrice != 0 && (
                   <li className="list-group-item butn">
                    
                    <div href="#" className={totalProducts == 0 ? "btn btn-checkout dis__link" : "btn btn-checkout"}>
                        <Link to="/payment">Mua ngay</Link>
                    </div>
                </li> 
                )}
                
                
            </ul>
        </div>
        
        
        
    </div>
  )
}

export default Cart