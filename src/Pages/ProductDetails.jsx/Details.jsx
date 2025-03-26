import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { motion } from 'framer-motion'; // I don't know why it's happning err


const Details = () => {
   const { products, loading, setLoading } = useContext(contextProvider);
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

   if (loading || !selectedProduct) {
      return <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>;
   }
   return (
      <div className='container mx-auto md:grid grid-cols-2 space-x-5 my-7 md:p-5 rounded-lg'>
         <div className='grid grid-cols-5'>
            {/* Thumbnail List */}
            <div className='col-span-1 p-0.5'>
               {selectedProduct.Product_showcase?.map((img, idx) => (
                  <img key={idx} onClick={() => setShowcaseImage(img)}
                     className={`w-16 h-20 object-cover transition-all cursor-pointer p-1 border-2 rounded-md 
                        ${showcaseImage === img ? "border-black" : "border-transparent"}`}
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
            <p className='font-medium text-lg'>
               Availability: {selectedProduct.availability || 'Stock Out'}
            </p>

            {/* Color */}
            <p className='font-medium text-lg'>
               Color: {selectedProduct.color || "Not Specified"}
            </p>

            {/* Size Options */}
            <div>
               <div className="join space-x-2.5">
                  {["S", "M", "L", "XL", "XXL"].map(size => (
                     <input key={size} className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white"
                        type="radio" name="size" aria-label={size} />
                  ))}
               </div>
            </div>

            {/* Quantity Selector */}
            <div className="join join-horizontal mt-3">
               <button className="btn text-xl border-gray-50 join-item">-</button>
               <button type='' className="btn text-xl border-gray-50 cursor-default join-item">0</button>
               <button className="btn text-xl border-gray-50 join-item">+</button>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className='flex justify-start items-center space-x-3 mt-4'>
               <button className='uppercase font-display hover:bg-red-800 bg-red-700 hover:text-white transition-colors w-full p-2 cursor-pointer'>
                  Add to Bag
               </button>
               <button className='hover:bg-white p-2 hover:text-red-600 rounded-full cursor-pointer transition-colors'>
                  <CiHeart className='size-6 ' />
               </button>
            </div>

            {/* Divider */}
            <div className='flex justify-center items-center space-x-3 mt-5'>
               <p className='h-4 w-full bg-gray-700'></p>
               <p className='h-4 w-full bg-gray-700'></p>
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
                     You can include Your Shipping and Return policy here
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
      </div>
   );
};

export default Details;
