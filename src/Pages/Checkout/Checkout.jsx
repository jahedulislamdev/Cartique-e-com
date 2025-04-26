import React, { useContext, useEffect, useState } from "react";
import { contextProvider } from "../../Components/Provider/DataProvider";
import { getItemFromLocalStorage } from "../../Components/Hooks/SaveCartModels";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Checkout = () => {
   const { products, setCartItems } = useContext(contextProvider);
   const [chekoutProducts, setCheckoutProducts] = useState(null);
   useEffect(() => {
      const savedProducts = getItemFromLocalStorage();
      const matchedProducts = savedProducts.map(item => {
         const fullProduct = products.find(p => p.model === item.model)
         // console.log(fullProduct);
         if (fullProduct) {
            return { ...fullProduct, quantity: parseInt(item.quantity) }
         } return null;
      }).filter(Boolean)
      // console.log(matchedProducts)
      setCheckoutProducts(matchedProducts);

   }, [products])
   // console.log(chekoutProducts);
   const subtotal = chekoutProducts
      ? parseFloat(chekoutProducts.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2))
      : 0;

   const vat = parseFloat((subtotal * 0.10).toFixed(2));
   const total = parseFloat((subtotal + vat).toFixed(2));
   const discount = 0;
   // const subtotal = parseFloat(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
   const navigate = useNavigate()
   const handleOrder = () => {
      toast.success("order Pleased successfull!")
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems([]);
      setTimeout(() => {
         navigate('/order/compleate');
      }, 800);
   }

   return (
      <div className="p-7 bg-base-300 px-4 md:px-10 font-display">
         <Helmet><title>Secure Checkout | Chartique</title></Helmet>
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side: Form */}
            <div className="lg:col-span-2">
               {/* Billing Info */}
               <div className="bg-base-300 pb-4 rounded-2xl shadow">
                  <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="Full Name" className="input focus:outline-0 input-bordered w-full" />
                     <input type="email" placeholder="Email Address" className="input focus:outline-0 input-bordered w-full" />
                     <input type="text" placeholder="Card Number" className="input focus:outline-0 input-bordered w-full md:col-span-2" />
                     <input type="text" placeholder="Expiration Date (MM/YY)" className="input focus:outline-0 input-bordered w-full" />
                     <input type="text" placeholder="CVV" className="input input-bordered w-full focus:outline-0" />
                  </form>
               </div>

               {/* Shipping Info */}
               <div className="bg-base-300 pt-4 rounded-2xl shadow">
                  <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="Street Address" className="input focus:outline-0 input-bordered w-full md:col-span-2" />
                     <input type="text" placeholder="City" className="input focus:outline-0 input-bordered w-full" />
                     <input type="text" placeholder="Postal Code" className="input focus:outline-0 input-bordered w-full" />
                     <textarea className="textarea w-full block md:col-span-2 focus:outline-0" placeholder="Additional NOte"></textarea>
                  </form>
               </div>
            </div>

            {/* Right side: Cart Summary */}
            <div className="bg-base-300 rounded-2xl shadow space-y-4">
               <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
               {chekoutProducts?.map(item => (
                  <div key={item.model} className="flex justify-between items-center border-b pb-2">
                     <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-sm text-gray-500">
                           {parseInt(item.quantity)} × {parseFloat(item.price.toFixed(2))}
                        </p>
                     </div>
                     <p className="font-semibold text-sm ms-1">{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
               ))}
               <div className=" pt-2 space-y-1">
                  <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span>{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Discount</span>
                     <span>{discount}</span>
                  </div>
                  <div className="flex justify-between ">
                     <span>VAT (10%)</span>
                     <span>{vat}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2">
                     <span>Total</span>
                     <span>{total}</span>
                  </div>
               </div>
               <Link onClick={handleOrder} className="btn bg-violet-950 w-full mt-4">Place Order</Link>
            </div>
         </div>
      </div>
   );
};

export default Checkout;
