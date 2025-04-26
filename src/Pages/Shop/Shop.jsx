import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Link } from 'react-router-dom';
import { saveFavouriteItems } from '../../Components/Hooks/SaveCartModels';
import { CiHeart } from 'react-icons/ci';
import { Slide, ToastContainer } from 'react-toastify';
import Spin from '../../Components/Loader/Spin';

const Shop = () => {
   // Get products and loading state from context
   const { products, setLoading, loading } = useContext(contextProvider);

   // State for selected filter options, filtered products, and open collapse section
   const [selectedOption, setSelectedOption] = useState([]);
   const [filterdProducts, setFilterdProducts] = useState([]);
   const [openCollapse, setOpenCollapse] = useState(null);

   // Set filtered products when original products or selected filters change
   useEffect(() => {
      if (products.length) {
         setLoading(false);
         setTimeout(() => {
            setFilterdProducts(products);
         }, 300);
      }
   }, [products, setLoading]);

   // Predefined filter options for sidebar
   const filterOptions = [
      { title: "Category", options: ["BOISHAKH COLLECTION/2025", "LATEST COLLECTION/25", "MEN", "WOMEN", "KIDS", "NEWBORN", "FOOTWEAR", "ACCESSORIES", "SPRING 2025", "FESTIVE SPOT LIGHT", "KING COLLECTION"] },
      { title: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { title: "Color", options: ["Black", "White", "Red", "Blue", "Green", "Pink", "Gray", "Multicolor"] },
      { title: "Brand", options: ["Nike", "Adidas", "Calvin Klein", "Gucci", "H&M", "Zara", "Puma", "Uniqlo", "Tommy Hilfiger"] },
      { title: "Fits", options: ["Regular Fit", "Slim Fit", "Loose Fit", "Oversized", "Skinny", "Relaxed"] }
   ];

   // Handle selecting/deselecting a filter option
   const handlefilterProducts = (option) => {
      setLoading(true);
      let updatedOption = option.toLowerCase();
      let updated = [...selectedOption];
      if (updated.includes(updatedOption)) {
         updated = updated.filter(i => i !== updatedOption);
      } else {
         updated.push(updatedOption);
      }
      setTimeout(() => {
         setSelectedOption(updated);
         setLoading(false);
      }, 300);
   };

   // Filter products based on selected options
   const sortedProducts = filterdProducts.filter(p => {
      return selectedOption.length === 0 || selectedOption.some(option =>
         [
            p.category?.toLowerCase(),
            p.color?.toLowerCase(),
            p.brand?.toLowerCase(),
            p.fits?.toLowerCase(),
            ...(p.size?.map(s => s.toLowerCase()) || [])
         ].includes(option)
      );
   });

   // Pagination logic
   const [curentPage, setCurrentPage] = useState(1);
   const itemPerPage = 9;
   const idxOfLastItem = curentPage * itemPerPage;
   const idxOfFirstItem = idxOfLastItem - itemPerPage;
   const currentItem = sortedProducts.slice(idxOfFirstItem, idxOfLastItem);
   const totalPage = Math.ceil(sortedProducts.length / itemPerPage);

   // Handle sorting
   const handleSort = (o) => {
      if (!o || !currentItem.length) return;

      setLoading(true)
      const sorted = [...currentItem];

      if (o === "priceHigh") {
         sorted.sort((a, b) => b.price - a.price);
      } else if (o === "priceLow") {
         sorted.sort((a, b) => a.price - b.price);
      }
      setTimeout(() => {
         setFilterdProducts(sorted);
         setLoading(false)
      }, 400);
   };

   // Fallback UI if no products
   if (!products || products.length === 0) {
      return (
         <div className="h-96 flex flex-col justify-center items-center text-center">
            <img
               src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
               alt="Empty Products"
               className="w-24 h-24 mb-4 opacity-60"
            />
            <p className="text-lg font-semibold text-gray-600">Currently No product Available in our shop!</p>
            <p className=" text-gray-500 mt-1 text-lg">Go to
               <Link to="/" className="text-blue-500 font-medium text-lg">
                  {" "}Home
               </Link>
            </p>
         </div>
      );
   }

   return (
      <div className='flex justify-center'>
         {/* Sidebar Filters */}
         <div className='hidden md:block'>
            {filterOptions.map((i, index) =>
               <div key={index} className='collapse collapse-arrow border border-base-300 first:mt-3 mt-1'>
                  <input
                     type="checkbox"
                     name="filterOptions"
                     checked={openCollapse === index}
                     onChange={() => setOpenCollapse(openCollapse === index ? null : index)}
                  />
                  <p className='uppercase font-medium text-sm collapse-title'>{i.title}</p>
                  <div className='collapse-content'>
                     {i.options.map((option, i) => (
                        <label className="fieldset-label py-1" key={i}>
                           <input
                              type="checkbox"
                              onChange={() => handlefilterProducts(option)}
                              checked={selectedOption.includes(option.toLowerCase())}
                              className="checkbox checkbox-xs checkbox-primary"
                           />
                           <span className='uppercase text-sm'>{option}</span>
                        </label>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Right Side - Product Display */}
         <div className='flex-1 md:p-4'>
            {/* Header and Sorting Dropdown */}
            <div className='flex md:flex-row justify-between items-center md:items-center my-3'>
               <h1 className="text-lg uppercase font-bold opacity-50 hidden md:block">Your perfect pick is waiting</h1>

               {/* sidebar for shop category */}
               <button className="border py-2 px-3 rounded text-xs border-gray-500 md:hidden alert alert-soft" onClick={() => document.getElementById('my_modal_1').showModal()}>Filterd By</button>
               <dialog id="my_modal_1" className="modal modal-start">
                  <div className="modal-box">
                     <form method="dialog" className='mb-3 flex justify-between items-center'>
                        <p className="text-lg font-semibold uppercase">Chartique</p>
                        <button className="text-gray-400 cursor-pointer">ese</button>
                     </form>
                     {filterOptions.map((i, index) =>
                        <div key={index} className='collapse collapse-arrow border border-base-300 first:mt-3 mt-1'>
                           <input
                              type="checkbox"
                              name="filterOptions"
                              checked={openCollapse === index}
                              onChange={() => setOpenCollapse(openCollapse === index ? null : index)}
                           />
                           <p className='uppercase font-medium text-sm collapse-title'>{i.title}</p>
                           <div className='collapse-content'>
                              {i.options.map((option, i) => (
                                 <label className="fieldset-label py-1" key={i}>
                                    <input
                                       type="checkbox"
                                       onChange={() => handlefilterProducts(option)}
                                       checked={selectedOption.includes(option.toLowerCase())}
                                       className="checkbox checkbox-xs checkbox-primary"
                                    />
                                    <span className='uppercase text-sm'>{option}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </dialog>
               {/* sidebar for shop category */}

               <select
                  defaultValue=""
                  className="select select-sm w-40 focus:outline-none md:mt-0"
                  onChange={(e) => handleSort(e.target.value)}
               >
                  <option disabled value="">Sort by</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
               </select>
            </div>

            {/* Product Grid or Spinner */}
            <div>
               {loading ? <Spin /> :
                  <div>
                     {currentItem.length === 0 ?
                        <div className='border-s-8 p-5 rounded border-yellow-900 text-yellow-600 bg-[#ffff001f]'>
                           No Product Found!
                        </div> :
                        <div>
                           {/* Product Cards */}
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                              {currentItem.map((p) => (
                                 <div key={p.id} className='cursor-pointer transition-all relative'>
                                    <button onClick={() => saveFavouriteItems(p.model)} className='rounded-full absolute top-1.5 right-1.5 hover:bg-white p-0.5 transition-colors'>
                                       <CiHeart className='text-black hover:text-red-500 size-5' />
                                    </button>
                                    <Link to={`/product_details/${p.id}`}>
                                       <img
                                          className='h-[210px] sm:h-[280px] lg:h-[350px] rounded w-full object-cover object-top'
                                          src={p.product_img}
                                          alt={p.title}
                                       />
                                    </Link>
                                    <div className='ps-1'>
                                       <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                                       <p className='text-sm md:text-md'>৳ {p.price}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>

                           {/* Pagination */}
                           <div className='mt-12'>
                              <div className="join flex justify-center items-center gap-2">
                                 <button
                                    className="join-item btn btn-md"
                                    onClick={() => curentPage > 1 && setCurrentPage(curentPage - 1)}
                                 >«</button>
                                 <button className="join-item btn btn-md">Page {curentPage} of {totalPage}</button>
                                 <button
                                    className="join-item btn btn-md"
                                    onClick={() => curentPage < totalPage && setCurrentPage(curentPage + 1)}
                                 >»</button>
                              </div>
                           </div>
                        </div>}
                  </div>}
            </div>
            <ToastContainer transition={Slide} theme='light' />
         </div>
      </div>
   );
};

export default Shop;
