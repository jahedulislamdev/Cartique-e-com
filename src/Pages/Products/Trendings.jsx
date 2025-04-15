import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './product.css'
import { Autoplay, Navigation } from "swiper/modules";
import { useContext } from "react";
import { contextProvider } from "../../Components/Provider/DataProvider";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const Trendings = () => {
   const { products } = useContext(contextProvider);

   // Duplicate slides if there are not enough for loop mode
   const duplicatedProducts = [...products, ...products];

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
                        {/* <button className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                           <CiHeart className='text-black size-5' />
                        </button> */}
                        <img className='h-full w-full object-cover object-top' src={slide.product_img} alt={slide.title} />
                        <div>
                           <p className='text-sm md:text-md mt-1 md:uppercase hover:opacity-50 transition-colors'>{slide.title}</p>
                           <p className='md:text-md '>৳ {slide.price}</p>
                        </div>
                     </Link>
                  </SwiperSlide>
               ))
            }
         </Swiper>
      </div>
   );
};

export default Trendings;