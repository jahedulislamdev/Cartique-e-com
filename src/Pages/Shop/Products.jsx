import React, { useContext } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Link } from 'react-router-dom';
import { saveFavouriteItems } from '../../Components/Hooks/SaveCartModels';
import { CiHeart } from 'react-icons/ci';
import OverviewModal from '../../Components/Hooks/OverviewModal';
import { IoEyeOutline } from 'react-icons/io5';
import { BsCartPlus } from 'react-icons/bs';
import { Slide, ToastContainer } from 'react-toastify';
const Products = () => {
   const { products, setLoading, setOverviewProduct, productCategories } = useContext(contextProvider);
   // products.length = 0;

   const showOverviewProduct = (id) => {
      setLoading(true);
      const checkedProduct = products.find(p => p.id === id);
      if (checkedProduct) {
         setOverviewProduct(checkedProduct);
         document.getElementById('overView').showModal();
      }
      setLoading(false);
   };

   showOverviewProduct();



   if (!products || products.length === 0) {
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
      <div className='py-3'>
         {/* sorting products */}
         <div className="flex justify-end items-center mb-6">
            {/* <h2 className="text-lg font-semibold uppercase text-gray-700">All Products</h2> */}
            <select
               defaultValue=""
               className="select select-sm w-40 border border-gray-300 focus:outline-none"
               onChange={(e) => console.log("Sort by:", e.target.value)} // You can connect this
            >
               <option disabled value="">Sort by</option>
               <option value="priceHigh">Price: High to Low</option>
               <option value="priceLow">Price: Low to High</option>
               <option value="nameAsc">Name: A-Z</option>
               <option value="nameDesc">Name: Z-A</option>
            </select>
         </div>
         <div className='grid grid-cols-5'>
            <div className='col-span-1'>
               {
                  productCategories.map(c => <div key={c.id}><input type="checkbox" className="checkbox" /> {c.category}</div>)
               }
            </div>
            <div className="col-span-4">
               <div>
                  {/* Products Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                     {products.map((p) => (
                        <div id='productCard' key={p.id} className='cursor-pointer transition-all relative'>
                           <button onClick={() => saveFavouriteItems(p.model)} className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                              <CiHeart className='text-black hovr:bg-white hover:text-red-500 size-5' />
                           </button>
                           <Link to={`/product_details/${p.id}`}><img className='h-[350px] rounded w-full object-cover object-top' src={p.product_img && p.product_img} alt={p.product_img} /></Link>
                           {/* prodct hover here*/}
                           <div className='ps-1'>
                              <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                              <p className='text-sm md:text-md '>৳ {p.price}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Pagination */}
                  <p className='md:h-10'></p>
                  <div className='md:mt-16'>
                     <div className="join flex justify-center items-center gap-2">
                        <button className="join-item btn btn-md">«</button>
                        <button className="join-item btn btn-md">Page 1</button>
                        <button className="join-item btn btn-md">»</button>
                     </div>
                  </div>
               </div>
            </div>
            <ToastContainer transition={Slide} theme='light' />
         </div>
      </div >
   );
};

export default Products;
