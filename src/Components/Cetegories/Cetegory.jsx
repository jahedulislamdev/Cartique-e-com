import React, { useContext } from 'react';
import { contextProvider } from '../Provider/DataProvider';
import { Link } from 'react-router-dom';

const Cetegory = () => {
   const { productCategories } = useContext(contextProvider)
   // console.log(productCategories)
   return (
      <div className='flex justify-around items-center space-x-5 p-2 md:p-3 my-4 overflow-x-auto scrollbar-none rounded'>
         {
            productCategories.map((c) =>
               <Link to={`/category/${c.category}`} key={c.id} className='flex justify-center items-center border border-gray-700 text-nowrap py-3 px-3 text-sm md:w-42 rounded-md md:h-16 uppercase'>
                  {c?.category ? c.category : ''}
               </Link>)
         }
      </div>
   );
};

export default Cetegory;