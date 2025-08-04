import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Searchbar from '../Header/Searchbar';
import UseScrollToTop from '../Hooks/UseScrollToTop';

const Root = () => {
   return (
      <div>
         <UseScrollToTop />
         <Searchbar />
         <Outlet />
         <Footer />
      </div>
   );
};

export default Root;