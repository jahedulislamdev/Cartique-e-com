import React, { useContext, useEffect, useRef, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Link, useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { motion } from 'framer-motion'; // I don't know why it's happning 
import { Slide, ToastContainer } from 'react-toastify';
import { saveFavouriteItems } from '../../Components/Hooks/SaveCartModels';
import { Helmet } from 'react-helmet-async';

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
      return <div className="flex items-center justify-center min-h-screen bg-transparent">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>;
   }
   return (
      <div className='px-2 md:px-6'>
         <div className='mt-2 md:mt-0  md:grid grid-cols-2 space-x-5 mb-4 md:p-5 rounded-lg'>
            <Helmet><title>Explore Product | Chartique</title></Helmet>
            <div className="">
               {/* Main Image */}
               <motion.div
                  key={showcaseImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full rounded-lg overflow-hidden shadow-lg"
               >
                  <img
                     src={showcaseImage}
                     alt="Selected Product"
                     className="w-full h-[400px] sm:h-[850px] md:h-[550px] lg:h-[500px] object-cover object-top rounded-lg"
                  />
               </motion.div>

               {/* Thumbnail List */}
               <div className="flex justify-center items-center gap-2 flex-nowrap overflow-auto scrollbar-none mt-2">
                  {selectedProduct.Product_showcase?.map((img, idx) => (
                     <motion.img
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowcaseImage(img)}
                        className={`w-16 h-20 object-cover cursor-pointer p-1 border-2 rounded-md transition-all duration-300 
                        ${showcaseImage === img ? "border-red-900 shadow-md" : "border-transparent"}`}
                        src={img}
                        alt={`Thumbnail ${idx}`}
                     />
                  ))}
               </div>
            </div>
            {/* Product Details */}
            <div className='space-y-2 p-2'>
               <p className='font-medium text-2xl md:text-3xl'>{selectedProduct.title}</p>

               {/* Price */}
               <div className="flex items-center">
                  {selectedProduct.old_price && (
                     <span className="text-gray-400 line-through text-2xl me-3">{selectedProduct.old_price}</span>
                  )}
                  <span className="text-red-600 font-bold text-2xl">৳ {selectedProduct.price}</span>
               </div>

               {/* Stock Status */}
               <div className={` text-lg`}>
                  Availability : <span className={`${selectedProduct.stock_status === "in_stock" ? "text-purple-500" : "text-red-700"}`}>In Stock </span>
                  <p className="badge badge-xs ms-1 opacity-50">{selectedProduct.stock}</p>
               </div>

               {/* Color */}
               <p className='text-lg'>
                  Color : {selectedProduct.color || "Not Specified"}
               </p>

               {/* Size Options */}
               <div>
                  <div className="join space-x-2.5">
                     {selectedProduct.size.map(size => (
                        <input onChange={handleSelectedSize} key={size} className="join-item btn bg-gray-100 text-gray-800 shadow-xs rounded-4xl border-0 checked:bg-red-700 checked:text-white"
                           type="radio" name="size" aria-label={size} />
                     ))}
                  </div>
               </div>

               {/* Quantity Selector */}
               <div className="join join-horizontal mt-3 bg-white border border-gray-400 rounded px-3 space-x-5 text-lg">
                  <button onClick={handleQuantityChange} className='p-1 join-item cursor-pointer'>-</button>
                  <button ref={quantity} className="join-item p-1">1</button>
                  <button onClick={handleQuantityChange} className='p-1 join-item cursor-pointer'>+</button>
               </div>


               {/* Add to Cart & Wishlist */}
               <div className='flex justify-start items-center space-x-3 mt-4'>
                  <button onClick={() => addToCart(selectedProduct.model, quantity.current?.innerText, size && size)} className='uppercase font-display hover:bg-red-950 bg-red-800 text-white transition-colors w-full p-2 cursor-pointer'>
                     Add to Bag
                  </button>
                  <button onClick={() => { saveFavouriteItems(selectedProduct.model) }} className='hover:bg-white p-2 hover:text-red-600 rounded-full cursor-pointer transition-colors'>
                     <CiHeart className='size-6 ' />
                  </button>
               </div>

               {/* Divider */}
               <div className='flex justify-center items-center space-x-3 my-5'>
                  <p className='h-4 w-full bg-base-300'></p>
                  <p className='h-4 w-full bg-base-300'></p>
               </div>

               {/* Additional Info */}
               <div className='space-y-4'>
                  <p><span className='text-lg font-semibold'>Category :</span> <span>{selectedProduct.category}</span></p>
                  <p><span className='text-lg font-semibold'>Sku : </span>{selectedProduct.sku}</p>
                  <p><span className='text-lg font-semibold'>Tag : </span>{selectedProduct.tags?.map(t => <span className='me-3'>{t},</span>)}</p>
                  <p><span className='text-lg font-semibold'>Share :</span></p>
               </div>

               {/* Description, Shipping & Features */}
               <div className="join join-vertical bg-base-100 w-full">
                  <div className="collapse collapse-arrow join-item border-b border-base-300">
                     <input type="checkbox" />
                     <div className="collapse-title ps-0 font-semibold text-md">Description</div>
                     <div className="collapse-content text-md">
                        <p>{selectedProduct.description}</p>
                        {/* Measurement Guide */}
                        <div className='my-3'>
                           <img src="https://i.postimg.cc/bYg9MNz2/cloath_measurement.jpg" alt="Measurement Guide" />
                        </div>
                     </div>

                  </div>
                  <div className="collapse collapse-arrow join-item border-0">
                     <input type="checkbox" />
                     <div className="collapse-title ps-0 font-semibold text-md">Features</div>
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
         {/* recomended products */}
         <div>
            <p className='uppercase font-medium my-5'>You May Interested In...</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5'>
               {
                  products?.slice(0, 5).map(p => (<div key={p.model}>
                     <Link to={`/product_details/${p.id}`} className='transition-all relative'>
                        <img className='h-[220px] sm:h-[350px] md:h-[300px] w-full object-cover object-top' src={p.product_img} alt={p.title} />
                        <div>
                           <p className='text-sm md:text-md mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                           <p className='md:text-md '>৳ {p.price}</p>
                        </div>
                     </Link>
                  </div>))
               }
            </div>
         </div>
         {/* recently viewed products */}
         <div className='mt-12'>
            <p className='uppercase font-medium my-5'>Recently Viewed</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5'>
               {
                  products?.slice(4, 6).map(p => (<div key={p.model}>
                     <Link to={`/product_details/${p.id}`} className='transition-all relative'>
                        <img className='h-[220px] sm:h-[350px] md:h-[300px] w-full object-cover object-top' src={p.product_img} alt={p.title} />
                        <div>
                           <p className='text-sm md:text-md mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                           <p className='md:text-md '>৳ {p.price}</p>
                        </div>
                     </Link>
                  </div>))
               }
            </div>
         </div>
      </div>
   );
};

export default Details;
