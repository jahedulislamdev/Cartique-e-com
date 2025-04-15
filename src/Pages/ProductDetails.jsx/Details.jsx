import React, { useContext, useEffect, useRef, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { motion } from 'framer-motion'; // I don't know why it's happning 
import { Slide, ToastContainer } from 'react-toastify';

const Details = () => {
   const { products, loading, setLoading, addToCart } = useContext(contextProvider);
   const { id } = useParams();

   const [selectedProduct, setSelectedProduct] = useState(null);
   const [showcaseImage, setShowcaseImage] = useState(null);

   // find selected product (lazy load)
   useEffect(() => {
      const expectedProduct = products?.find(p => p.id === id);
      if (expectedProduct) {
         setSelectedProduct(expectedProduct);
         setShowcaseImage(expectedProduct.Product_showcase?.[0] || expectedProduct.product_img);
         setLoading(false);
      }
   }, [id, products, setLoading])
   const quantity = useRef();
   const handleQuantityChange = (sign) => {
      const value = sign.target.innerText;
      if (value === "+") {
         quantity.current.innerText = parseInt(quantity.current.innerText) + 1;
      } else if (value === "-") {
         if (parseInt(quantity.current.innerText) > 1) {
            quantity.current.innerText = parseInt(quantity.current.innerText) - 1
         }
      }
   }
   // select product size 
   const [size, setSize] = useState(null);
   const handleSelectedSize = (s) => {
      const selectedSize = s.target.ariaLabel;
      const sizeOptions = document.querySelectorAll("input[name='size']");
      sizeOptions.forEach((option) => {
         option.checked = option.ariaLabel === selectedSize;
      });
      setSize(selectedSize);
   }
   if (loading || !selectedProduct) {
      return <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>;
   }
   return (
      <div className='container mx-auto md:grid grid-cols-2 space-x-5 mb-4 md:p-5 rounded-lg'>
         <div className='grid grid-cols-5'>
            {/* Thumbnail List */}
            <div className='col-span-1 p-0.5'>
               {selectedProduct.Product_showcase?.map((img, idx) => (
                  <img key={idx} onClick={() => setShowcaseImage(img)}
                     className={`w-16 h-20 object-cover transition-all cursor-pointer p-1 border-2 rounded-md 
                        ${showcaseImage === img ? "border-red-900" : "border-transparent"}`}
                     src={img} alt=''>
                  </img>
               ))}
            </div>

            {/* Main Image */}
            <div className='col-span-4'>
               < motion.img
                  key={showcaseImage}
                  src={showcaseImage}
                  alt="Selected Product"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className='w-full h-auto object-center object-cover rounded-lg shadow-md'
               />
            </div>
         </div>

         {/* Product Details */}
         <div className='space-y-2 p-2 h-dvh overflow-auto scrollbar-none'>
            <p className='font-medium text-2xl md:text-3xl'>{selectedProduct.title}</p>

            {/* Price */}
            <div className="flex items-center">
               {selectedProduct.old_price && (
                  <span className="text-gray-400 line-through text-2xl me-3">{selectedProduct.old_price}</span>
               )}
               <span className="text-red-600 font-bold text-2xl">৳ {selectedProduct.price}</span>
            </div>

            {/* Stock Status */}
            <div className={`font-medium text-lg`}>
               Availability: <span className={`${selectedProduct.stock_status === "in_stock" ? "text-purple-500" : "text-red-700"}`}>{selectedProduct.stock_status}</span>
               <p className="badge badge-sm opacity-50">{selectedProduct.stock}</p>
            </div>

            {/* Color */}
            <p className='font-medium text-lg'>
               Color: {selectedProduct.color || "Not Specified"}
            </p>

            {/* Size Options */}
            <div>
               <div className="join space-x-2.5">
                  {selectedProduct.size.map(size => (
                     <input onChange={handleSelectedSize} key={size} className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white"
                        type="radio" name="size" aria-label={size} />
                  ))}
               </div>
            </div>

            {/* Quantity Selector */}
            <div className="join join-horizontal mt-3">
               <button onClick={handleQuantityChange} className="btn text-xl border-gray-50 join-item">-</button>
               <button ref={quantity} className="btn text-xl border-gray-50 cursor-default join-item">1</button>
               <button onClick={handleQuantityChange} className="btn text-xl border-gray-50 join-item">+</button>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className='flex justify-start items-center space-x-3 mt-4'>
               <button onClick={() => addToCart(selectedProduct.model, quantity.current?.innerText, size && size)} className='uppercase font-display hover:bg-red-950 bg-red-800 text-white transition-colors w-full p-2 cursor-pointer'>
                  Add to Bag
               </button>
               <button className='hover:bg-white p-2 hover:text-red-600 rounded-full cursor-pointer transition-colors'>
                  <CiHeart className='size-6 ' />
               </button>
            </div>

            {/* Divider */}
            <div className='flex justify-center items-center space-x-3 mt-5'>
               <p className='h-4 w-full bg-base-300'></p>
               <p className='h-4 w-full bg-base-300'></p>
            </div>

            {/* Measurement Guide */}
            <div className='my-3'>
               <img src="https://i.postimg.cc/bYg9MNz2/cloath_measurement.jpg" alt="Measurement Guide" />
            </div>

            {/* Additional Info */}
            <div className='space-y-4 ps-4 '>
               <p className='font-medium text-lg'>Category: <span>{selectedProduct.category}</span></p>
               <p className='font-medium text-lg'>SKU: {selectedProduct.id}</p>
               <p className='font-medium text-lg'>Tag: {selectedProduct.tag || 'Adding Soon'}</p>
               <p className='font-medium text-lg'>Share: Adding Soon</p>
            </div>

            {/* Description, Shipping & Features */}
            <div className="join join-vertical bg-base-100">
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-lg">Description</div>
                  <div className="collapse-content text-md">{selectedProduct.description}</div>
               </div>
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-lg">Shipping and Returns</div>
                  <div className="collapse-content text-md">
                     <p><strong>🚚 Shipping & Return Policy</strong></p>
                     <p> <strong>📦 Shipping Policy</strong></p>
                     <p><strong>Shipping Time:</strong></p>
                     All orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day.

                     <p><strong>Delivery Estimates:</strong></p>
                     <ul>
                        <li>📍 Local Delivery (within city): 2–4 business days</li>
                        <li>🚚 Nationwide Delivery: 4–7 business days</li>
                        <li>🌐 International Orders: 7–14 business days</li>
                     </ul>
                     <p><strong>Shipping Charges:</strong></p>
                     <ul>
                        <li>Orders over $50 qualify for Free Shipping</li>
                        <li>Orders below $50 will incur a flat shipping fee of $4.99</li>
                     </ul>
                     <p><strong>Order Tracking:</strong></p>
                     Once your order is shipped, you'll receive an email with the tracking number and a link to track your package in real-time.
                     <p><strong>🔄 Return & Exchange Policy</strong></p>
                     <p><strong>Return Window:</strong></p>
                     We accept returns within 7 days of delivery.
                     <p><strong> Eligibility:</strong></p>
                     <ul>
                        <li>Items must be unused, unwashed, and in original packaging.</li>
                        <li>Products marked as Final Sale are not eligible for return or exchange.</li>
                     </ul>
                     <p><strong> Process:</strong></p>
                     <ol>
                        <li>Go to the Returns section on our website.</li>
                        <li>Enter your order number and email address.</li>
                        <li>Choose the item(s) you wish to return and follow the steps.</li>
                     </ol>
                     <p><strong> Refunds:</strong></p>
                     <p>Refunds are processed to the original payment method within 5–7 business days after we receive the returned item.
                     </p>
                     <p><strong> Return Shipping:</strong></p>
                     <ul>
                        <li>If the return is due to our error (wrong/damaged item), we cover return shipping.</li>
                        <li> For all other returns, customers are responsible for shipping costs.</li>
                     </ul>
                     <p><strong>  Need Help❓</strong></p>
                     <p>Contact our support team at 📧 <a href="support@example.com">support@example.com</a> or call us at ☎️ +1 (234) 567-8901.
                        We’re here to help Monday–Friday, 9 AM – 6 PM.</p>
                  </div>
               </div>
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-md">Features</div>
                  <div className="collapse-content">
                     {selectedProduct.features?.map((feature, i) => (
                        <ul key={i}>
                           <li className='mb-3'>{i + 1}. {feature}</li>
                        </ul>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer transition={Slide} />
      </div >
   );
};

export default Details;
