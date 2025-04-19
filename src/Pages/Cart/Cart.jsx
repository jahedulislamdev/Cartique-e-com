import React, { useContext, useEffect } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { getItemFromLocalStorage } from '../../Components/Hooks/SaveCartModels';
import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import Spin from '../../Components/Loader/Spin';

const Cart = () => {
   const { cartItems, setCartItems, products, loading, setLoading } = useContext(contextProvider);

   // load local storage data to state
   useEffect(() => {
      const cartData = getItemFromLocalStorage();
      // console.log(savedModels);
      const matchedProducts = cartData.map(o => {
         const fullProduct = products.find(p => p.model === o.model);
         if (fullProduct) {
            return { ...fullProduct, quantity: o.quantity, selectedSize: o.selectedSize }
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
      }, 700);
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
   const subtotal = parseFloat(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
   const gift = 0;
   const shipping = 0;
   const coupon = 0
   const discout = (gift + coupon);
   const vat = parseFloat((subtotal * 0.1).toFixed(2));
   const total = parseFloat(subtotal - discout + vat + shipping);

   if (!cartItems?.length) {
      return (
         <div className="flex items-center justify-center h-screen md:h-96">
            <div className="space-y-4 text-center font-display">
               <div className="flex justify-center text-gray-400">
                  <BsCartX className="w-16 h-16" />
               </div>
               <h1 className="text-lg text-gray-700"> Your cart is empty.{" "}
                  <Link to="/" className="text-violet-800 underline hover:text-violet-600 transition">
                     Browse products
                  </Link>{" "}
                  and find something you love!
               </h1>
            </div>
         </div>
      );
   }

   return (
      <div className='font-display'>
         <h1 className='font-semibold ps-2 my-3 md:mt-0'>🛒 Cart Items ({cartItems?.length})</h1>
         <div className='sm:grid grid-cols-6 sm:px-5 gap-x-2'>
            <div className='sm:col-span-3 md:col-span-4 overflow-x-auto scrollbar-none border border-base-content/5 bg-base-100'>
               {loading || products.length === 0 ? <Spin /> :
                  <table className='table border border-gray-600'>
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
                           <tr key={item.model} className='align-top'>
                              <td className="w-[300px] min-w-[200px] max-w-[350px]">
                                 <div className="flex items-center gap-2 ">
                                    <img className='w-17 h-20 rounded object-cover object-top' src={item.product_img} alt='img' />
                                    <div>
                                       <p className="font-semibold sm:font-bold text-xs sm:text-md">{item.title}</p>
                                       <p className="text-sm opacity-50">Size: {item.selectedSize || "Not selected"}</p>
                                       <p className="text-sm opacity-50">Color: {item.color}</p>
                                    </div>
                                 </div>
                              </td>
                              <td>
                                 <p className="font-bold">{item.price}</p>
                              </td>
                              <td>
                                 <div className="join join-horizontal mt-3">
                                    <button onClick={() => updateModelQuantity(item.model, item.quantity - 1)} className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">-</button>
                                    <button className="btn py-0.5 px-2.5  text-sm border-base-500 cursor-default join-item">{item.quantity}</button>
                                    <button onClick={() => updateModelQuantity(item.model, item.quantity + 1)} className="btn py-0.5 px-2.5 text-sm border-base-500 join-item">+</button>
                                 </div>
                              </td>
                              <td>
                                 <p className="font-bold">  {parseFloat(item.price) * parseInt(item.quantity)}</p>
                              </td>
                              <th>
                                 <button onClick={() => removeFromLoaclStorage(item.model)}
                                    className='bg-red-600 hover:bg-red-800 transition-colors text-white cursor-pointer p-1 rounded'>
                                    <MdOutlineDelete className='size-5' />
                                 </button>
                              </th>
                           </tr>
                        ))}
                     </tbody>
                  </table>}
            </div>
            <div className="sm:col-span-3 md:col-span-2 border-s-base-content shadow-sm sm:p-2 mt-7 sm:mt-0">
               <p className='opacity-70 font-semibold uppercase mb-3'>What would you like to do next?</p>
               <div className=" collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="cartiquePaymentStatus" />
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
                     <select defaultValue="Bangladesh" name='country' required className="select focus:outline-0">
                        <option>Bangladesh</option>
                     </select>
                     <p className=' mb-1'>Region/State<span className='text-red-700'>*</span></p>
                     <select defaultValue="Please Select" className="select focus:outline-0">
                        <option>Please Select</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                     </select>
                     <p className='mb-1'>City<span className='text-red-700'>*</span></p>
                     <select defaultValue="Please Select" className="select focus:outline-0">
                        <option>Please Select</option>
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
               <div className="border-2 mt-2 border-base-300 rounded p-3 bg-base-200">
                  <table className='ps-5 table w-full table-sm'>
                     <tbody className='text-sm'>
                        <tr className='uppercase bg-base-200 '>
                           <th>subtotal</th>
                           <td className='font-medium'>{subtotal} BDT</td>
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
                           <th>Shipping</th>
                           <td>{shipping} BDT</td>
                        </tr>
                        <tr className='uppercase bg-base-200'>
                           <th>Total</th>
                           <td className='font-medium'>{total} BDT</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className='sm:grid grid-cols-2 gap-2 my-2 uppercase '>
                  <Link to={'/shop/products'} className='btn text-xs w-full'>continue shopping</Link>
                  <Link to={'/checkout'} className='btn text-xs w-full mt-2 sm:mt-0'>Checkout</Link>
               </div>
            </div>
         </div >
      </div>
   );
};

export default Cart;
