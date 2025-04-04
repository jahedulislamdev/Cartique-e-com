import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';

const Cart = () => {
   const { counter, products } = useContext(contextProvider);
   const [cartModels, setCartModels] = useState([])
   useEffect(() => {
      const savedModels = localStorage.getItem("cartModels");
      let cartModelsArray = savedModels ? JSON.parse(savedModels) : [];
      // console.log(cartModelsArray);
      const cartItems = products?.filter((i) => cartModelsArray.includes(i.model));
      // console.log(cartItems);
      setCartModels(cartItems);
   }, [products]);

   return (
      <div>
         <h1>Cartitem ( {counter} )</h1>
         {
            cartModels?.map((item) => (
               <div key={item.id} className='flex items-center justify-between border-b border-gray-300 py-2'>
                  <img className='w-16 h-16 object-cover' src={item.product_img} alt={item.product_img} />
                  <div className='flex flex-col'>
                     <p className='text-sm'>{item.title}</p>
                     <p className='text-sm'>৳ {item.price}</p>
                  </div>
                  <button className='btn btn-sm'>Remove</button>
               </div>
            ))
         }
      </div >
   );
};

export default Cart;