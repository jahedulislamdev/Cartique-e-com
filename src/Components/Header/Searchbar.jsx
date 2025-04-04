import { IoSearch } from "react-icons/io5";
import { CiShoppingCart, CiUser, CiWarning, CiHeart, CiLogout, CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useContext } from "react";
import { contextProvider } from "../Provider/DataProvider";

const Searchbar = () => {
   const { dialogColsingRef, user, logOutUser, itemCouter } = useContext(contextProvider);
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
                        <button className="text-gray-400 cursor-pointer">✕</button>
                     </form>
                     <MobileNav />
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
            <div className="navbar-end space-x-4 sm:space-x-7 ">
               {/* search bar modal for mobile device */}
               <button type='button' onClick={() => document.getElementById('searchbarModal').showModal()} className='cursor-pointer block md:hidden'><CiSearch className='size-6' /></button>
               <dialog id="searchbarModal" className="modal modal-top">
                  <div className="modal-box h-1/2 w-full">
                     <form method="dialog" className='mb-3 flex justify-end items-center'>
                        <button className="text-sm text-gray-400 hover:bg-base-100 rounded p-0.5">✕</button>
                     </form>
                     <div className="join w-full border-base-300 border rounded">
                        <input type="text" className="input input-sm md:input-md border w-full focus:outline-0 focus:border-e-0 join-item" placeholder="Search Your Products" />
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
               {!user ? <Link to={'/login'} type='button' className='cursor-pointer tooltip tooltip-bottom' data-tip="Login or Register"><CiUser className='size-5 md:size-6' /></Link> :
                  <div className="dropdown dropdown-hover dropdown-end">
                     <button className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer border border-cyan-700">{user?.displayName ? user.displayName.slice(0, 1) : <CiUser className="size-6" />}</button>
                     <div className="dropdown-content space-y-3 text-center menu bg-base-300 font-display rounded-box z-1 min-w-60 sm:min-w-72 mt-5 min-h-32 p-2 shadow-sm">
                        <div className="flex justify-center items-center">
                           <div className="w-8 h-8 flex justify-center items-center bg-purple-950 rounded-full">{user?.displayName ? user.displayName.slice(0, 1) : <CiUser className="size-5" />}</div>
                        </div>
                        <p className="text-lg">{user?.displayName ? user.displayName : "Customer Name"}</p>
                        <div className="flex justify-around items-center">
                           <button onClick={logOutUser} className="btn border-0 bg-red-700 shadow my-1 text-base-100"><CiLogout className="size-5 " /> Logout</button>
                           <Link to={'/profile'} className="btn border-0 bg-violet-700 shadow my-1 text-base-100"><CiUser className="size-5" />Profile</Link>
                        </div>
                     </div>
                  </div>
               }
               <button type='button' className='cursor-pointer hidden md:block tooltip tooltip-bottom' data-tip="favourite"><CiHeart className='size-6' /></button>
               <Link to={'/cart'} type='button' className='cursor-pointer indicator me-1 md:me-2 tooltip tooltip-bottom' data-tip="cart"><CiShoppingCart className='size-6 text-yellow-800' />
                  <span className="indicator-item badge bg-transparent border-0">{itemCouter}</span>
               </Link>
            </div>
         </div>
         <DesktopNav />
      </div>
   );
};

export default Searchbar;