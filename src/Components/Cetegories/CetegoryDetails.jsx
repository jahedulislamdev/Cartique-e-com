import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../Provider/DataProvider';
import { Link, useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { BsCartPlus } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';

const CetegoryDetails = () => {
   const { productCategories, products, loading, setLoading } = useContext(contextProvider);
   const [openCategory, setOpenCategory] = useState(null);
   const { category } = useParams();
   const [filteredCategory, setFilteredCategory] = useState([]);
   const [checkedCheckbox, setcheckedCheckbox] = useState([]);

   useEffect(() => {
      setLoading(true);
      const matchingCategories = products.filter(product => product.category === category);
      setFilteredCategory(matchingCategories);
      setLoading(false);
   }, [category, products, setLoading]);

   // ovserve subcategory checkbox for checked or unchecked
   const observeChange = (sc) => {
      setcheckedCheckbox((prev) => prev.includes(sc) ? prev.filter((c) => c !== sc) : [...prev, sc]);
   };
   // filter product by click on category (category wise filter)
   const filterByCategory = (sc) => {
      const filteredByCategory = products.filter(p => p.category === sc);
      setFilteredCategory(filteredByCategory);

   }
   // load and filter data based on checkbox checking
   useEffect(() => {
      if (checkedCheckbox.length > 0) {
         setFilteredCategory(products.filter(p => checkedCheckbox.includes(p.sub_category.toLowerCase())));
      } else {
         setFilteredCategory(products.filter(p => p.category === category));
      }
   }, [category, checkedCheckbox, products]);

   // loading spinner
   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
         </div>
      );
   }

   return (
      <div className='md:grid grid-cols-5 mt-6 justify-center'>
         <div className="col-span-1 hidden md:block">
            {productCategories.map((pc, index) =>
               <div className="collapse collapse-arrow border border-base-300" key={index}>
                  <input
                     type="checkbox"
                     checked={openCategory === index}
                     onClick={() => filterByCategory(pc.category)}
                     onChange={() => setOpenCategory(openCategory === index ? null : index)}
                  />
                  <div className="collapse-title font-semibold uppercase">{pc.category}</div>
                  <div className="collapse-content">
                     {pc.sub_category.map((sc, subIndex) => (
                        <label className="fieldset-label" key={subIndex}>
                           <input type="checkbox"
                              onChange={() => observeChange(sc)}
                              className="checkbox checkbox-sm checkbox-primary my-2" />
                           <span className='uppercase text-sm'>{sc}</span>
                        </label>
                     ))}
                  </div>
               </div>
            )}
         </div>
         <div className={`col-span-4 ${filteredCategory.length > 0 && "grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-20 pb-3 px-2"}`}>

            {filteredCategory.length < 1 ?
               <div className='flex justify-center items-center'>
                  <span className='text-yellow-300 font-display antialiased'> No product found in this category!</span>
               </div> :
               filteredCategory.map(p => (
                  <div id='productCard' key={p.id} className='h-56 cursor-pointer md:h-64 transition-all relative'>
                     <button className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                        <CiHeart className='text-black hovr:bg-white size-5' />
                     </button>
                     <img className='h-full w-full object-cover object-center' src={p.product_img} alt={p.title} />
                     <div id='hoverElements' className='space-x-5'>
                        <button className='w-8 h-8 flex justify-center items-center rounded-sm cursor-pointer bg-gray-600 text-white'>
                           <BsCartPlus className='size-5 hover:opacity-50 transition-all' />
                        </button>
                        <Link to={`/product_details/${p.id}`} className='w-8 h-8 flex justify-center items-center rounded-sm text-white cursor-pointer bg-gray-600'>
                           <IoEyeOutline className='size-5 hover:opacity-50 transition-all' />
                        </Link>
                     </div>
                     <div>
                        <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                        <p className='text-sm md:text-md '>৳ {p.price}</p>
                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   );
};

export default CetegoryDetails;
