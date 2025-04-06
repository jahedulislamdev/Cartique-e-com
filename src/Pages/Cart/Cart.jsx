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

   // update specipic quantity 
   const updateModelQuantity = (model, quantity) => {
      if (quantity < 1) {
         removeFromLoaclStorage(model);
         return;
      }
      // console.log("clicked", model, quantity);
      const saveItems = getItemFromLocalStorage();
      const updatedModels = saveItems.map(item =>
         item.model === model ? { ...item, quantity } : item,
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedModels));
      setCartItems(prev => prev.map(item => item.model === model ? { ...item, quantity } : item));
   }
   // calculate amount
   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
   const gift = 0;
   const coupon = 0
   const discout = gift + coupon;
   const vat = subtotal * 0.15;
   const total = subtotal - (discout + gift) + vat;

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
      <div>
         <h1 className='text-2xl font-semibold mb-4'>🛒 Cart Items ({cartItems?.length})</h1>
         <div className='sm:grid grid-cols-6 sm:px-5 px-2 gap-x-2'>
            <div className='sm:col-span-3 md:col-span-4 overflow-x-auto border border-base-content/5 bg-base-100'>
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
                                 <button onClick={() => updateModelQuantity(item.model, item.quantity - 1)} className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">-</button>
                                 <button type='' className="btn py-0.5 px-2.5  text-sm border-base-500 cursor-default join-item">{item.quantity}</button>
                                 <button onClick={() => updateModelQuantity(item.model, item.quantity + 1)} className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">+</button>
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
            <div className="sm:col-span-3 md:col-span-2 border-s-base-content shadow-sm p-2">
               <p className='opacity-70 font-semibold uppercase'>What would you like to do next?</p>
               <div className=" collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="cartiquePaymentStatus" defaultChecked />
                  <div className="collapse-title font-medium uppercase text-xs m-0">Use Copon Code</div>
                  <div className="join collapse-content text-sm">
                     <input className="input join-item focus:outline-0" placeholder="coupon code here" />
                     <button className="btn bg-base-700 uppercase join-item border rounded-e-sm border-s-0 border-base-700">Apply</button>
                  </div>
               </div>
               <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="cartiquePaymentStatus" />
                  <div className="collapse-title font-medium uppercase text-xs m-0">Estimate shipping and taxes</div>
                  <div className="collapse-content text-sm space-y-4">
                     <p className=' mb-1'>Country <span className='text-red-700'>*</span></p>
                     <select name='country' required className="select focus:outline-0">
                        <option selected>Bangladesh</option>
                     </select>
                     <p className=' mb-1'>Region/State<span className='text-red-700'>*</span></p>
                     <select className="select focus:outline-0">
                        <option disabled={true}>Please Select</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                     </select>
                     <p className='mb-1'>City<span className='text-red-700'>*</span></p>
                     <select className="select focus:outline-0">
                        <option disabled={true}>Please Select</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                     </select>
                  </div>
               </div>
               <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="cartiquePaymentStatus" />
                  <div className="collapse-title font-medium uppercase text-xs">use gift card</div>
                  <div className="join collapse-content text-sm">
                     <input className="input join-item focus:outline-0" placeholder="Gift card code here" />
                     <button className="btn bg-base-700 uppercase join-item border rounded-e-sm border-s-0 border-base-700">Apply</button>
                  </div>
               </div>
               <div className="border-2 border-base-300 rounded p-3 bg-base-300">
                  <table className='ps-5 table w-full border border-base-300 table-sm'>
                     <tbody className='text-sm'>
                        <tr className='uppercase'>
                           <th>subtotal</th>
                           <td>{subtotal} BDT</td>
                        </tr>
                        <tr className='uppercase'>
                           <th>Discount</th>
                           <td>{discout} BDT</td>
                        </tr>
                        <tr className='uppercase'>
                           <th>Vat</th>
                           <td>{vat} BDT</td>
                        </tr>
                        <tr className='uppercase'>
                           <th>Total</th>
                           <td>{total} BDT</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div >
      </div>
   );
};

export default Cart;
