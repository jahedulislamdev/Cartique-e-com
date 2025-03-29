import React from 'react';
import { useRouteError } from 'react-router-dom';

const NotFound = () => {
   const listenErr = useRouteError();
   return (
      <>
         {
            listenErr.status === 404 ?
               <div className="bg-[#0F172A] h-screen flex justify-center items-center space-x-2">
                  <p className="text-lg sm:text-2xl font-bold border-e pe-2 sm:pe-4 text-gray-400">404</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-300">This page could not be found.</p>
               </div> :
               <div className="bg-[#0F172A] h-screen flex justify-center items-center space-x-2">
                  <p className="text-2xl font-bold border-e pe-4">{listenErr.status}</p>
                  <p className="text-xs sm:text-lg md:text-xl font-semibold text-red-600">An Unexpected Application Error occared</p>
               </div>
         }
      </>
   );
};

export default NotFound;