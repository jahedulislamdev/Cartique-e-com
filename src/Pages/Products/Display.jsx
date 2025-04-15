import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useContext } from "react";
import { contextProvider } from "../../Components/Provider/DataProvider";
import { Link } from "react-router-dom";

const Display = () => {
   const { displayImg } = useContext(contextProvider)
   return (
      <div>
         <Swiper id="displaySwiper"
            slidesPerView={1}
            spaceBetween={10}
            speed={2000}
            loop={true}
            autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper h-[200px] md:h-[400px] xl:h-[700px] 2xl:h-[800px]"
         >
            {
               displayImg.map((d, idx) =>
               (<SwiperSlide key={idx}>
                  <Link to={'/'}><img className="object-cover object-center h-full w-full" src={d} /></Link>
               </SwiperSlide>))
            }
         </Swiper>
      </div>
   );
};

export default Display;