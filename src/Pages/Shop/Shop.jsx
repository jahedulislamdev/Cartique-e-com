import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Link } from 'react-router-dom';
import { saveFavouriteItems } from '../../Components/Hooks/SaveCartModels';
import { CiHeart } from 'react-icons/ci';
import { Slide, ToastContainer } from 'react-toastify';

const Shop = () => {
   const { products } = useContext(contextProvider);
   const [selectedOption, setSelectedOption] = useState([]);
   const [filterdProducts, setFilterdProducts] = useState([]);

   useEffect(() => {
      if (products.length) {
         setFilterdProducts(products)
         console.log(selectedOption)
      }
   }, [products, selectedOption])

   // filterd options fake array
   const filterOptions = [
      {
         title: "Category",
         options: ["BOISHAKH COLLECTION/2025", "LATEST COLLECTION/25", "MEN", "WOMEN", "KIDS", "NEWBORN", "FOOTWEAR", "ACCESSORIES", "SPRING 2025", "FESTIVE SPOT LIGHT", "KING COLLECTION"]
      },
      {
         title: "Size",
         options: ["S", "M", "L", "XL", "XXL"]
      },
      {
         title: "Color",
         options: ["Black", "White", "Red", "Blue", "Green", "Pink", "Gray", "Multicolor"]
      },
      {
         title: "Brand",
         options: ["Nike", "Adidas", "Calvin Klein", "Gucci", "H&M", "Zara", "Puma", "Uniqlo", "Tommy Hilfiger"]
      },
      {
         title: "Fits",
         options: ["Regular Fit", "Slim Fit", "Loose Fit", "Oversized", "Skinny", "Relaxed"]
      }
   ];

   // handle select category
   const handlefilterProducts = (option) => {
      let updatedOption = option.toLowerCase();
      let updated = [...selectedOption];
      if (updated.includes(updatedOption)) {
         updated = updated.filter(i => i !== updatedOption);
      } else {
         updated.push(updatedOption);
      }
      setSelectedOption(updated);
   }

   // filter data (everythig will be lowercase for safe matching)
   const sortedProducts = filterdProducts.filter(p => {
      return selectedOption.length === 0 || selectedOption.some(option =>
         [
            p.category?.toLowerCase(),
            p.color?.toLowerCase(),
            p.brand?.toLowerCase(),
            p.fits?.toLowerCase(),
            ...(p.size?.map(s => s.toLowerCase()) || []) // here use spread operator for flat the parameter 
         ].includes(option)
      );
   });

   // fallback
   if (!filterOptions || filterOptions.length === 0) {
      return (
         <div className="h-96 flex flex-col justify-center items-center text-center">
            <img
               src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
               alt="Empty Products"
               className="w-24 h-24 mb-4 opacity-60"
            />
            <p className="text-lg font-semibold text-gray-600">Currently No product Avilable in our shop!</p>
            <p className=" text-gray-500 mt-1 text-lg"> Go to Home
               <Link to="/" className="text-blue-500 font-medium text-lg">
                  {" "} Home
               </Link>
            </p>
         </div>
      );
   }

   return (
      <div className='flex justify-center'>
         <div className='hidden md:block'>
            {
               filterOptions?.map((i, index) =>
                  <div key={index} className='collapse collapse-arrow border border-base-300 first:mt-3 mt-1'>
                     <input type="checkbox" name="filterOptions" />
                     <p className='uppercase font-medium text-sm collapse-title'>{i.title}</p>
                     <div className='collapse-content'>
                        {i.options.map((option, i) => (
                           <label className="fieldset-label py-1" key={i}>
                              <input type="checkbox"
                                 onChange={() => handlefilterProducts(option)}
                                 checked={selectedOption.includes(option.toLowerCase())}
                                 className="checkbox checkbox-xs checkbox-primary" />
                              <span className='uppercase text-sm'>{option}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               )
            }
         </div>

         {/* Right Side - Scrollable */}
         <div className='flex-1 overflow-y-auto md:p-4 scrollbar-none h-screen'>
            {/* Header and Sorting */}
            <div className='flex md:flex-row justify-between items-center md:items-center mb-3'>
               <h1 className="text-lg uppercase font-bold opacity-50 hidden md:block">Your perfect pick is waiting</h1>
               <button className='md:hidden btn py-0.5 border-red-800 border-2'>Filter By</button>
               <select
                  defaultValue=""
                  className="select select-sm w-40  focus:outline-none md:mt-0"
                  onChange={(e) => console.log("Sort by:", e.target.value)}
               >
                  <option disabled value="">Sort by</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="nameAsc">Name: A-Z</option>
                  <option value="nameDesc">Name: Z-A</option>
               </select>
            </div>

            {/* Product Grid */}
            <div>
               {sortedProducts.length === 0 ? <div className='alert alert-error alert-soft flex justify-center'>No product found</div> :
                  <div>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                        {sortedProducts.map((p) => (
                           <div key={p.id} className='cursor-pointer transition-all relative'>
                              <button onClick={() => saveFavouriteItems(p.model)} className='rounded-full absolute top-1.5 right-1.5 hover:bg-white p-0.5 transition-colors'>
                                 <CiHeart className='text-black hover:text-red-500 size-5' />
                              </button>
                              <Link to={`/product_details/${p.id}`}>
                                 <img
                                    className='h-[210px] sm:h-[280px] rounded w-full object-cover object-top'
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
                           <button className="join-item btn btn-md">«</button>
                           <button className="join-item btn btn-md">Page 1</button>
                           <button className="join-item btn btn-md">»</button>
                        </div>
                     </div>
                  </div>}

            </div>
            <ToastContainer transition={Slide} theme='light' />
         </div>
      </div>
   );
};

export default Shop;
