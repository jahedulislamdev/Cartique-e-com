import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../Provider/DataProvider';
import { Link, useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { BsCartPlus } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';

const CetegoryDetails = () => {
   const { productCategories, products, loading, setLoading } = useContext(contextProvider);
   console.log(products.length)
   const [openCategory, setOpenCategory] = useState(null);
   const { category } = useParams();
   console.log(category);

   // Collapse toggle function
   const handleCollapseToggle = (CurrentIndex) => {
      setOpenCategory(openCategory === CurrentIndex ? null : CurrentIndex);  // Close the current one if it is open
   };
   const [filteredCategory, setFilteredCategory] = useState([]);
   useEffect(() => {
      setLoading(true);
      const matchingProducts = products?.filter(product => product.category === category);
      setFilteredCategory(matchingProducts);
      setLoading(false);
   }, []);


   if (loading) {
      <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>;
   }

   return (
      <div className='md:grid grid-cols-5 mt-6 justify-center'>
         <div className="col-span-1 hidden md:block">
            {
               productCategories.map((pc, index) =>
                  <div className="collapse collapse-arrow border border-base-300" key={index}>
                     <input
                        type="checkbox"
                        checked={openCategory === index}  // Only check if this is the open category
                        onChange={() => handleCollapseToggle(index)}  // Toggle only this category
                     />
                     <div className="collapse-title font-semibold uppercase">{pc.category}</div>
                     <div className="collapse-content">
                        {
                           pc.sub_category.map((sc, subIndex) => (
                              <label className="fieldset-label" key={subIndex}>
                                 <input type="checkbox" className="checkbox checkbox-sm checkbox-primary my-2" />
                                 <span className='uppercase text-sm'>{sc}</span>
                              </label>
                           ))
                        }
                     </div>
                  </div>
               )
            }
         </div>
         <div className={`col-span-4 ${!filteredCategory.length < 1 && "grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-20 pb-3 px-2"}`}>
            {filteredCategory.length < 1 ?
               <div className='flex justify-center items-center'>
                  <span className='text-yellow-300 font-display antialiased'> No product found in this category!</span>
               </div> :
               filteredCategory.map(p => <div id='productCard' key={p.id} className='h-56 cursor-pointer md:h-64 transition-all relative'>
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
               </div>)
            }
         </div>
      </div>
   );
};

export default CetegoryDetails;
