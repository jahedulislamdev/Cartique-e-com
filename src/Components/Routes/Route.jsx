import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Root";
import App from "../../App";
import NotFound from "../../Pages/Error/NotFound";
import Details from "../../Pages/ProductDetails.jsx/Details";
import CetegoryDetails from "../Cetegories/CetegoryDetails";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Cart from "../../Pages/Cart/Cart";


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
      ]
   }
])

export default route;