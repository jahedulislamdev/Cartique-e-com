import React, { useContext } from 'react';
import { contextProvider } from './../Components/Provider/DataProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({ children }) => {
   const { user } = useContext(contextProvider);
   const clickedRoute = useLocation();
   if (user) {
      return children;
   } else {
      return <Navigate to={'/login'} state={clickedRoute.pathname}></Navigate>
   }
};

export default Private;