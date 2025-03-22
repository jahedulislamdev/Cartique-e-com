import Navbar from '../Header/DesktopNav';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Searchbar from '../Header/Searchbar';
import DesktopNav from '../Header/DesktopNav';

const Root = () => {
   return (
      <div>
         <Searchbar />
         <Outlet />
         <Footer />
      </div>
   );
};

export default Root;