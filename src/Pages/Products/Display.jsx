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
      <>
         <Swiper
            slidesPerView={1}
            spaceBetween={10}
            speed={2000}
            loop={true}
            autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
         >
            {
               displayImg.map((d, idx) =>
               (<SwiperSlide key={idx}>
                  <Link to={'/'}><img src={d} /></Link>
               </SwiperSlide>))
            }
         </Swiper>
      </>
   );
};

export default Display;