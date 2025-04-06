import React, { useContext, useEffect } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { getItemFromLocalStorage } from '../../Components/Hooks/SaveCartModels';
import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const Cart = () => {
   const { cartItems, setCartItems, products, loading, setLoading } = useContext(contextProvider);
   // load local storage data to state
   useEffect(() => {
      const cartData = getItemFromLocalStorage();
      // console.log(savedModels);
      const matchedProducts = cartData.map(o => {
         const fullProduct = products.find(p => p.model === o.model);
         if (fullProduct) {
            return { ...fullProduct, quantity: o.quantity }
         }
         return null;
      }).filter(Boolean);
      setCartItems(matchedProducts);
   }, [products, setCartItems]);

   // remove item from (cart) local storage and state
   const removeFromLoaclStorage = (model) => {
      setLoading(true);
      const saveItems = getItemFromLocalStorage();
      const updatedModels = saveItems.filter(i => i.model !== model);
      localStorage.setItem("cartItems", JSON.stringify(updatedModels));

      setCartItems(prev => prev.filter(i => i.model !== model));
      setTimeout(() => {
         setLoading(false);
      }, 300);
   }

   if (loading || products.length === 0) {
      return (
         <div className='flex items-center justify-center h-screen opacity-80'>
            <button btn className='text-xl text-gray-500'><span className="loading loading-spinner text-xs font-light text-red-700"></span> Updating.. </button>
         </div>
      );
   }

   if (!cartItems?.length) {
      return (
         <div className='flex items-center justify-center h-screen md:h-96'>
            <div className='space-y-3 font-display text-center'>
               <div className='flex justify-center opacity-25'><BsCartX className='size-15' /></div>
               <h1 className=' text-3xl'> Your cart is currently empty.</h1>
               <Link to={'/'} className='w-full flex justify-center btn bg-base-900 text-base mt-4 uppercase'>Return to Shop</Link>
            </div>
         </div >
      );
   }

   return (
      <div className='sm:grid grid-cols-6 sm:px-5 px-2 gap-x-2'>
         <div className='col-span-4 overflow-x-auto  border border-base-content/5 bg-base-100'>
            <h1 className='text-2xl font-semibold mb-4'>🛒 Cart Items ({cartItems?.length})</h1>
            <table className='table'>
               <thead>
                  <tr className='uppercase '>
                     <th>Product Name</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Total</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {cartItems?.map((item) => (
                     <tr key={item.model}>
                        <td>
                           <div className="flex items-center gap-2">
                              <img className='w-20 h-20 rounded object-cover object-top' src={item.product_img} alt='img' />
                              <div>
                                 <p className="font-semibold sm:font-bold text-xs sm:text-md">{item.title}</p>
                                 <p className="text-sm opacity-50">Size</p>
                                 <p className="text-sm opacity-50">{item.color}</p>
                              </div>
                           </div>
                        </td>
                        <td>
                           <p className="font-bold">{item.price}</p>
                        </td>
                        <td>
                           <div className="join join-horizontal mt-3">
                              <button className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">-</button>
                              <button type='' className="btn py-0.5 px-2.5  text-sm border-base-500 cursor-default join-item">{item.quantity}</button>
                              <button className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">+</button>
                           </div>
                        </td>
                        <td>
                           <p className="font-bold">{item.price * item.quantity}</p>
                        </td>
                        <th>
                           <button onClick={() => removeFromLoaclStorage(item.model)}
                              className='bg-red-800 hover:bg-red-600 transition-colors text-white cursor-pointer p-1 rounded'>
                              <MdOutlineDelete className='size-5 ' />
                           </button>
                        </th>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="col-span-2 border-s p-2">
            subtotal inplement here
         </div>
      </div >
   );
};

export default Cart;
