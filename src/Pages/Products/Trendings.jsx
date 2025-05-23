import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './product.css'
import { Autoplay, Navigation } from "swiper/modules";
import { useContext } from "react";
import { contextProvider } from "../../Components/Provider/DataProvider";
import { Link } from "react-router-dom";

const Trendings = () => {
   const { products } = useContext(contextProvider);

   // Duplicate slides if there are not enough for loop mode
   const duplicatedProducts = [...products, ...products];
   if (duplicatedProducts.length === 0) {
      return <div className="flex justify-center items-center py-2">No Product Available In This Moment!</div>;
   }
   return (
      <div className="pt-5 px-2">
         <Swiper
            slidesPerView={1}
            spaceBetween={10}
            speed={1500}
            loop={products.length >= 8} // Enable loop only if there are more then 8 slides
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={true}
            breakpoints={{
               320: { slidesPerView: 2, spaceBetween: 20 },
               640: { slidesPerView: 2, spaceBetween: 20 },
               768: { slidesPerView: 3, spaceBetween: 30 },
               1024: { slidesPerView: 4, spaceBetween: 10 },
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
         >
            {
               duplicatedProducts.map((slide, index) => (
                  <SwiperSlide key={`${slide.id}-${index}`} id="trendingSlide">
                     <Link to={`/product_details/${slide.id}`} className='transition-all relative'>
                        <img className='h-full w-full object-cover object-top' src={slide.product_img} alt={slide.title} />
                     </Link>
                  </SwiperSlide>
               ))
            }
         </Swiper>
      </div>
   );
};

export default Trendings;