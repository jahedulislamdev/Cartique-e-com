import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Root";
import App from "../../App";
import NotFound from "../../Pages/Error/NotFound";
import Details from "../../Pages/ProductDetails.jsx/Details";
import CetegoryDetails from "../Cetegories/CetegoryDetails";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Cart from "../../Pages/Cart/Cart";
import Checkout from "../../Pages/Checkout/Checkout";
import Compleate from "../../Pages/OrderCompleate/Compleate";
import FavouriteItmes from "../../Pages/Favourite/FavouriteItmes";
import Profile from "../../Pages/Profile/Profile";
import Shop from "../../Pages/Shop/Shop";
import PersonalInfo from "../../Pages/Profile/Tabs/PersonalInfo";
import Orders from "../../Pages/Profile/Tabs/Orders";
import Reviews from "../../Pages/Profile/Tabs/Reviews";


const route = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
         { path: '/', element: <App /> },
         { path: '/product_details/:id', element: <Details /> },
         { path: '/category/:category', element: <CetegoryDetails /> },
         { path: '/login', element: <Login /> },
         { path: '/Register', element: <Register /> },
         { path: '/cart', element: <Cart /> },
         { path: '/shop/products', element: <Shop /> },
         { path: '/checkout', element: <Checkout /> },
         { path: '/order/compleate', element: <Compleate /> },
         { path: '/favourite', element: <FavouriteItmes /> },

         { // nasted route (new*)
            path: '/profile', element: <Profile />,
            children: [
               { path: 'personal', element: <PersonalInfo /> },
               { path: 'orders', element: <Orders /> },
               { path: 'reviews', element: <Reviews /> },
            ]
         }
      ]
   }
])

export default route;