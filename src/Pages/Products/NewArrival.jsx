import React, { useContext, useEffect } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import './product.css'
import { BsCartPlus } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';

const NewArrival = () => {
   const { products } = useContext(contextProvider);
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   return (
      <div className='grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-20 py-4 px-3'>
         {
            products.map((p) => (
               <div id='productCard' key={p.id} className='h-56 cursor-pointer md:h-64 transition-all relative'>
                  <button className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                     <CiHeart className='text-black hovr:bg-white size-5' />
                  </button>
                  <img className='h-full w-full object-cover object-center' src={p.product_img && p.product_img} alt={p.product_img} />
                  <div id='hoverElements' className='space-x-5'>
                     <button className='w-8 h-8 flex justify-center items-center rounded-sm cursor-pointer bg-gray-600 text-white'><BsCartPlus className='size-5 hover:opacity-50 transition-all' /></button>
                     <Link to={`/product_details/${p.id}`} className='w-8 h-8 flex justify-center items-center rounded-sm text-white cursor-pointer bg-gray-600'><IoEyeOutline className='size-5 hover:opacity-50 transition-all' /></Link>
                  </div>
                  <div>
                     <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                     <p className='text-sm md:text-md '>৳ {p.price}</p>
                  </div>
               </div>))
         }
      </div>
   );
};

export default NewArrival;