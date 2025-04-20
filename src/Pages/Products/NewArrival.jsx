import React, { useContext } from 'react';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import './product.css';
import { BsCartPlus } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';
import { contextProvider } from '../../Components/Provider/DataProvider';
import OverviewModal from '../../Components/Hooks/OverviewModal';
import { saveFavouriteItems } from '../../Components/Hooks/SaveCartModels';

const NewArrival = () => {
   const { products, overviewProduct, setOverviewProduct, setLoading } = useContext(contextProvider);
   // load favourite items form local storage 

   const showOverviewProduct = (id) => {
      setLoading(true);
      const checkedProduct = products.find(p => p.id === id);
      if (checkedProduct) {
         setOverviewProduct(checkedProduct);
         document.getElementById('overView').showModal();
      }
      setLoading(false);
   }
   if (!products || products.length === 0) {
      return <div className='capitalize flex justify-center items-center'>Sorry no product avilable in this moment!</div>
   }
   return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-10 sm:gap-y-20 md:gap-y-18 py-4 px-3 '>
         {
            products.slice(0, 10).map((p) => (
               <div id='productCard' key={p.id} className='h-54 cursor-pointer md:h-64 transition-all relative mb-10 sm:mb-0'>
                  <button onClick={() => saveFavouriteItems(p.model)} className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                     <CiHeart className='text-black hovr:bg-white hover:text-red-500 size-5' />
                  </button>
                  <Link to={`/product_details/${p.id}`}><img className='h-[250px] w-full object-cover object-top' src={p.product_img && p.product_img} alt={p.product_img} /></Link>
                  <div id='hoverElements' className='space-x-5'>
                     <button onClick={() => showOverviewProduct(p.id)} className='w-8 h-8 flex justify-center items-center rounded-sm cursor-pointer bg-gray-600 text-white'><BsCartPlus className='size-5 hover:opacity-50 transition-all' /></button>
                     <Link to={`/product_details/${p.id}`}
                        className='w-8 h-8 flex justify-center items-center rounded-sm text-white cursor-pointer bg-gray-600'><IoEyeOutline className='size-5 hover:opacity-50 transition-all' /></Link>
                     {/* modal content (product overview) */}
                     <dialog id="overView" className="modal modal-lg">
                        <OverviewModal overviewProduct={overviewProduct} />
                     </dialog>
                  </div>
                  <div>
                     <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                     <p className='text-sm md:text-md '>৳ {p.price}</p>
                  </div>
               </div>))
         }
      </div>
   );
};

export default NewArrival;