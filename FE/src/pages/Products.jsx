import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from "react";
import { getCakesByIdType } from "../services/product";
import ProductItem from "../components/ProductItem";

const Products = ({handleOpenCart,type}) => {
    
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [cakes,setCakes] = useState([]);
    const handleAddToCart = (cake,quantity,moreInfo) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const relCake = cake;
      relCake["quantity"] = quantity;
      relCake["moreInfo"] = moreInfo;
      
      let first = true;
      for(let i in cart){
        if(cart[i].name === relCake.name && cart[i].moreInfo.size === relCake.moreInfo.size){
          let quantityItem = cart[i].quantity + relCake.quantity;
          cart[i]["quantity"] = quantityItem;
          first = false;
          break;
        }
      }
      if (first) {
        cart.push(relCake);
      }
      localStorage.setItem("cart",JSON.stringify(cart));
      handleOpenCart();
   }
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getCakesByIdType(type.id_type);
              console.log(data);
              handleGetCakes(data.data.data);
            } catch (error) {
              console.error("Error fetching type:", error);
            }
          };
      
          const handleGetCakes = (data) => {
            setCakes(data);
          };
      
          fetchData();
          function handleResize() {
          const windowWidth = window.innerWidth;
          if (windowWidth >= 1508) {
            setSlidesPerView(5);
          }else if (windowWidth >= 1248) {
            setSlidesPerView(4);
          } else if (windowWidth >= 800) {
            setSlidesPerView(3);
          } else if (windowWidth >= 600) {
            setSlidesPerView(2);
          } else if (windowWidth >= 500) {
            setSlidesPerView(1);
          }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    },[])
  return (
    <div className="category__cake--content">
            <h3 className="category__cake--title">{type.type}</h3>
            <div className="category__cake--body">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={slidesPerView}
                        navigation
                        pagination
                        onSlideChange={() => console.log('slide change')}
                        >
                            {cakes?.map((cake,i)=>
                            {                  
                              return(
                                  <SwiperSlide key={i}>
                                      <ProductItem cake={cake} key={i} handleAddToCart={handleAddToCart}/>
                                  </SwiperSlide>
                              ) 
                            }
                              
                            )} 
                            <div className="three__dot">...</div>
                            

                    </Swiper>
            </div>
        </div>
  )
}

export default Products