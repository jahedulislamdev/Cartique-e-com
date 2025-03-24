import { IoSearch } from "react-icons/io5";
import { CiShoppingCart, CiUser, CiWarning, CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useRef } from "react";

const Searchbar = () => {
   const dialogColsingRef = useRef(null);
   const closeModal = () => {
      if (dialogColsingRef.current) {
         dialogColsingRef.current.close();
      }
   }

   return (
      <div className="sticky top-0 bg-base-100 border-b border-base-300 z-1000">
         <div className=" navbar border-b border-gray-500 space-x-2">
            {/* navbar start */}
            <div className="navbar-start">
               {/* sidebar modal start*/}
               <button
                  onClick={() => { document.getElementById('sidebarModal').showModal() }} role="button"
                  className="btn btn-ghost lg:hidden">
                  <HiOutlineMenuAlt3 className='size-5' />
               </button>
               <dialog id="sidebarModal" ref={dialogColsingRef} className="modal flex modal-start">
                  <div className="modal-box w-full">
                     <form method="dialog" className='mb-3 flex justify-between items-center'>
                        <p className="text-lg font-semibold uppercase">Chartique</p>
                        <button className="text-gray-400 cursor-pointer">ese</button>
                     </form>
                     <MobileNav closeModal={closeModal} />
                  </div>
               </dialog>
               {/* sidebar modal end*/}
               <Link to={'/'} className='text-lg md:text-2xl font-semibold uppercase'>Cartique</Link>
            </div>
            {/* navbar center */}
            <div className="join w-full border border-gray-500 rounded hidden md:flex">
               <input type="text" className="bg-transparent input input-sm md:input-md border-0 w-full focus:outline-0 focus:border-0 join-item" placeholder="Search Your Products" />
               <button type='button' className='join-item p-2 cursor-pointer'><IoSearch className='size-4 lg:size-6' /></button>
            </div>
            {/* navbar end */}
            <div className="navbar-end space-x-4 lg:space-x-6 ">
               {/* search bar modal for mobile device */}
               <button type='button' onClick={() => document.getElementById('searchbarModal').showModal()} className='cursor-pointer block md:hidden'><IoIosSearch className='size-5 md:size-6' /></button>
               <dialog id="searchbarModal" className="modal modal-top">
                  <div className="modal-box h-1/2 w-full">
                     <form method="dialog" className='mb-3 flex justify-end items-center'>
                        <button className="text-sm text-gray-400 hover:bg-base-100 rounded p-0.5">ese</button>
                     </form>
                     <div className="join w-full border-base-300 border rounded">
                        <input type="text" className="input input-sm md:input-md border-0 w-full focus:outline-0 focus:border-0 join-item" placeholder="Search Your Products" />
                        <button type='button' className='join-item bg-indigo-400 p-2 cursor-pointer'><IoSearch className='size-4 lg:size-6' /></button>
                     </div>
                     <div className="modal-body text-gray-400 mt-2">
                        <div role="alert" className="alert flex items-center justify-around">
                           <CiWarning className='size-5' />
                           <span className='text-yellow-500'>No products were found matching your selection.</span>
                        </div>
                     </div>
                  </div>
               </dialog>
               <button type='button' className='cursor-pointer tooltip tooltip-bottom' data-tip="Login or Register"><CiUser className='size-5 md:size-6' /></button>
               <button type='button' className='cursor-pointer hidden md:block tooltip tooltip-bottom' data-tip="favourite"><CiHeart className='size-5 md:size-6' /></button>
               <button type='button' className='cursor-pointer indicator me-1 md:me-2 tooltip tooltip-bottom' data-tip="cart"><CiShoppingCart className='size-5 md:size-6 text-yellow-800' />
                  <span className="indicator-item badge bg-transparent border-0">8</span>
               </button>
            </div>
         </div>
         <DesktopNav />
      </div>
   );
};

export default Searchbar;