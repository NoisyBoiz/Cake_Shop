import { useEffect, useState } from "react";
import Products from "./Products";
import { getAllTypes } from "../services/type";
import Cart from "./Cart";

const ProductsContainer = () => {
    const [types,setTypes] = useState([]);
    const [openCart, setOpenCart] = useState(true);
    const [changeCart, setChangeCart] = useState(false);
    const handleIsCart = () => {
      setOpenCart(!openCart);
    }
    const handleOpenCart = () => {
      setChangeCart(!changeCart);
    }
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getAllTypes();
              console.log("Type data:", data.data);
              handleGetTypes(data.data);
            } catch (error) {
              console.error("Error fetching type:", error);
            }
          };
      
          const handleGetTypes = (data) => {
            setTypes(data);
          }; 
      
          fetchData();
    },[])
  return (
    <>
    <Cart openCart={openCart} changeCart={changeCart} handleIsCart={handleIsCart}/>
    <div className="category__cake">
        {
            types.length !==0 && 
            types.map((type,i) =>(
                  <Products handleOpenCart={handleOpenCart} type={type} key={i} />
                )
            )
        }
    </div>
    
    </>
    
  )
}

export default ProductsContainer