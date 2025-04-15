import { IoSearch } from "react-icons/io5";
import { CiShoppingCart, CiUser, CiWarning, CiHeart, CiLogout, CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { contextProvider } from "../Provider/DataProvider";
import { useContext } from "react";

const Searchbar = () => {
   const { dialogColsingRef, user, logOutUser, cartItems } = useContext(contextProvider);

   return (
      <div className={`sticky top-0 left-0 w-full z-50 bg-base-100 shadow transition-all duration-300 ease-in-out`}>
         <div className="navbar border-b border-gray-300 px-2 md:px-4 lg:px-8">
            {/* Navbar Start */}
            <div className="navbar-start">
               {/* Sidebar Modal for Mobile */}
               <button
                  onClick={() => document.getElementById('sidebarModal').showModal()}
                  className="btn btn-ghost lg:hidden"
               >
                  <HiOutlineMenuAlt3 className="size-5" />
               </button>

               <dialog id="sidebarModal" ref={dialogColsingRef} className="modal modal-start">
                  <div className="modal-box w-full">
                     <form method="dialog" className="mb-3 flex justify-between items-center">
                        <p className="text-lg font-semibold uppercase">Cartique</p>
                        <button className="text-gray-400">✕</button>
                     </form>
                     <MobileNav />
                  </div>
               </dialog>

               <Link to="/" className="text-lg md:text-2xl font-semibold uppercase">Cartique</Link>
            </div>

            {/* Navbar Center */}
            <div className="hidden md:flex join w-full border border-gray-300 rounded">
               <input type="text" className="input input-sm md:input-md border-0 bg-transparent w-full focus:outline-none join-item" placeholder="Search Your Products" />
               <button className="join-item p-2 cursor-pointer">
                  <IoSearch className="size-4 lg:size-6" />
               </button>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-4 sm:space-x-7">
               {/* Mobile Search Modal */}
               <button onClick={() => document.getElementById('searchbarModal').showModal()} className="md:hidden">
                  <CiSearch className="size-6" />
               </button>

               <dialog id="searchbarModal" className="modal modal-top">
                  <div className="modal-box h-1/2 w-full">
                     <form method="dialog" className="mb-3 flex justify-end">
                        <button className="text-sm text-gray-400 hover:bg-base-100 p-1 rounded">✕</button>
                     </form>
                     <div className="join w-full border border-base-300 rounded">
                        <input type="text" className="input input-sm border-0 w-full focus:outline-none join-item" placeholder="Search Your Products" />
                        <button className="join-item bg-indigo-400 p-2 cursor-pointer">
                           <IoSearch className="size-4 lg:size-6" />
                        </button>
                     </div>
                     <div className="text-gray-400 mt-2">
                        <div role="alert" className="alert justify-around items-center">
                           <CiWarning className="size-5" />
                           <span className="text-yellow-500">No products were found matching your selection.</span>
                        </div>
                     </div>
                  </div>
               </dialog>

               {!user ? (
                  <Link to="/login" className="tooltip tooltip-bottom" data-tip="Login or Register">
                     <CiUser className="size-6" />
                  </Link>
               ) : (
                  <div className="dropdown dropdown-hover dropdown-end">
                     <button className="w-6 h-6 flex justify-center items-center rounded-full border border-cyan-700">
                        {user?.displayName ? user.displayName[0] : <CiUser className="size-6" />}
                     </button>
                     <div className="dropdown-content menu space-y-3 bg-base-300 rounded-box p-4 shadow-sm min-w-60 sm:min-w-72 mt-5 z-10">
                        <div className="flex justify-center">
                           <div className="w-8 h-8 flex items-center justify-center bg-purple-950 text-white rounded-full">
                              {user?.displayName ? user.displayName[0] : <CiUser className="size-5" />}
                           </div>
                        </div>
                        <p className="text-lg text-center">{user?.displayName || "Customer Name"}</p>
                        <div className="flex justify-around">
                           <button onClick={logOutUser} className="btn bg-red-700 text-white shadow-sm text-sm">
                              <CiLogout className="size-5" /> Logout
                           </button>
                           <Link to="/profile" className="btn bg-violet-700 text-white shadow-sm text-sm">
                              <CiUser className="size-5" /> Profile
                           </Link>
                        </div>
                     </div>
                  </div>
               )}

               <button className="hidden md:block tooltip tooltip-bottom" data-tip="Favourite">
                  <CiHeart className="size-6" />
               </button>
               <Link to="/cart" className="indicator tooltip tooltip-bottom" data-tip="Cart">
                  <CiShoppingCart className="size-6 text-yellow-800" />
                  <span className="indicator-item badge bg-transparent border-0">{cartItems?.length}</span>
               </Link>
            </div>
         </div>
         <DesktopNav />
      </div>
   );
};

export default Searchbar;
