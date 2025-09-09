import { useState } from "react";
import "../assets/styles/product.css";

const ProductItem = ({cake,handleAddToCart}) => {
    let min = 1;
    let max = 10;
    const [quantity, setQuantity] = useState(min);
    const [disMin, setDisMin] = useState(true);
    const [disMax, setDisMax] = useState(false);
    const [indexSize,setIndexSize] = useState(0);
    // const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    
    
    // const handleAddToCart = () => {
    //     console.log(cart);
    //     const relCake = cake;
    //     relCake["quantity"] = quantity;
    //     relCake["moreInfo"] = cake.list_size[indexSize];
    //     console.log(relCake);
    //     cart.push(relCake);
    //     localStorage.setItem("cart",JSON.stringify(cart));
    //  }

    const handleInputChange = (e) => {
      let newQuantity = parseInt(e.target.value);
      if (isNaN(newQuantity) || newQuantity < min) {
        newQuantity = min;
      } else if (newQuantity > max) {
        newQuantity = max;
      }
      setQuantity(newQuantity);
    };
  
    const handleCountClick = (operator) => {
      let newQuantity;
      if (operator === 'add') {
        newQuantity = quantity + 1;
        setDisMin(false);
        if (newQuantity >= max) {
          newQuantity = max;
          setDisMax(true);
        }else{
            setDisMax(false);
        }
      } else {
        newQuantity = quantity - 1;
        setDisMax(false);
        if (newQuantity <= min) {
          newQuantity = min;
          setDisMin(true);
        }else{
            setDisMin(false);
        }
      }
      setQuantity(newQuantity);
    };

  return (
    <div className="product__body">
        <div className="product__body--content">
            <div className="product__image">
                <img className="image__cake" src={cake.list_image[0].image} alt="" />
            </div>
            <div className="product__content">
                <h3 className="product__title">{cake.name}</h3>
                <div className="product__description">{cake.description}</div>
            </div>
            <div className="product__content">
                <div>
                    <span className="product__price">Giá: 
                    {cake.list_size[indexSize].old_price !== null && (<span className="product__old--price">{cake.list_size[indexSize].old_price} VND</span>)} 
                    {cake.list_size[indexSize].price} VND</span>
                    <div className="product__size">
                        <h3>Kích thước</h3>
                        <div className="product__size--info">
                            {cake.list_size.map((size,i)=>  (<div className={indexSize === i ? "active__size" : ""} key={i}
                                onClick={() => setIndexSize(i)}
                            >{size.size}</div>)
                            )}
                        </div>
                    </div>
                    <div className="qty-input">
                        <div id={disMin ? "dis__min" : "" } className="qty-count qty-count--minus" onClick={() => handleCountClick('subtract')}>
                            -</div>
                        <input
                        className="product-qty"
                        type="number"
                        value={quantity}
                        min={min}
                        max={max}
                        onChange={handleInputChange}
                        />
                        <div id={disMax ? "dis__max" : "" } className="qty-count qty-count--add" onClick={() => handleCountClick('add')}>+</div>
                        </div>
                    <div className="btn__add--cart">
                        <button className="btn__cart" onClick={()=> handleAddToCart(
                            cake,
                            quantity,
                            cake.list_size[indexSize]
                        )}>Thêm vào giỏ hàng</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
   
  )
}

export default ProductItem