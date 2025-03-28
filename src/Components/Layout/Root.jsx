import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Searchbar from '../Header/Searchbar';
import ScrollToTop from '../Utility/ScrollToTop';
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

const Root = () => {
   const [preloader, setPreloader] = useState(true);
   useEffect(() => {
      setTimeout(() => {
         setPreloader(false)
      }, 1000);
   })
   if (preloader) {
      return <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>;
   }
   return (
      <div data-scroll-container>
         <ScrollToTop />
         <Searchbar />
         <Outlet />
         <Footer />
         <ToastContainer transition={Slide} />
      </div>
   );
};

export default Root;