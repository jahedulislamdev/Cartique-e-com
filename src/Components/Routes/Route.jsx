import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Root";
import App from "../../App";
import NotFound from "../../Pages/Error/NotFound";
import Details from "../../Pages/ProductDetails.jsx/Details";


const route = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
         { path: '/', element: <App /> },
         { path: '/product_details/:id', element: <Details /> }
      ]
   }
])

export default route;