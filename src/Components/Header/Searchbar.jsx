import { IoSearch } from "react-icons/io5";
import { CiShoppingCart, CiUser, CiHeart, CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { contextProvider } from "../Provider/DataProvider";
import { useContext, useRef, useState, } from "react";
import Fuse from "fuse.js";
import { RiLogoutCircleLine } from "react-icons/ri";

const Searchbar = () => {
   const { dialogColsingRef, user, logOutUser, cartItems, products } = useContext(contextProvider);
   const [query, setQuery] = useState(null);
   const modelColseRef = useRef()
   const handleSearch = (e) => {
      const input = e.target.value.trim().toLowerCase(); // trim() remove the extra space 
      if (!input) return setQuery(null);

      const options = {
         keys: ["title", "category", "sub_category"],
         threshold: 0.6,
      }
      const fuse = new Fuse(products, options) // use fuse.js for fuzzy search
      const result = fuse.search(input).map(i => i.item)
      setQuery(result);
   }
   const handleModal = () => {
      setQuery(null)
      modelColseRef.current.close();
   }
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
            <div className="w-full relative">
               <div className="hidden md:flex join w-full border border-gray-300 rounded">
                  <input onChange={handleSearch} name="searchbox" type="text" className="input input-sm md:input-md border-0 bg-transparent w-full focus:outline-none join-item" placeholder="Search Your Products" />
                  <button className="join-item p-2 cursor-pointer">
                     <IoSearch className="size-4 lg:size-6" />
                  </button>
               </div>
               {/* search result form desktop */}
               <div className="absolute w-full max-h-80 overflow-scroll bg-base-300 z-1000 rounded scrollbar-none">
                  <div className={`${query && "p-2"} space-y-1`}>
                     {query?.length < 1 ? <div className="text-yellow-5 00 p-4">No Product Found!</div>
                        : query?.map(r =>
                           <Link onClick={handleModal} to={`/product_details/${r.id}`} key={r.model} className="alert">
                              <img src={r.product_img} className="w-10 h-12 object-cover object-top" />
                              <p>{r.title}</p>
                           </Link>)
                     }
                  </div>
               </div>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-4 sm:space-x-7">
               {/* Mobile Search Modal */}
               <button onClick={() => document.getElementById('searchbarModal').showModal()} className="md:hidden">
                  <CiSearch className="size-6" />
               </button>
               <dialog ref={modelColseRef} id="searchbarModal" className="modal modal-top">
                  <div className="modal-box h-3/5 w-full overflow-auto scrollbar-none border-b-3">
                     <form method="dialog" className="mb-3 flex justify-end">
                        <button className="text-sm text-gray-400 hover:bg-base-100 p-1 rounded">✕</button>
                     </form>
                     <div className="join w-full border border-base-300 rounded">
                        <input onChange={handleSearch} type="text" className="input input-sm w-full focus:outline-0 join-item" placeholder="Search Your Products" />
                        <button className="join-item bg-indigo-400 p-2 cursor-pointer">
                           <IoSearch className="size-4 lg:size-6" />
                        </button>
                        {/* search result form Mobile */}
                     </div>
                     <div className="absolute w-full max-h-80 overflow-scroll bg-base-300 z-1000 rounded scrollbar-none">
                        <div className={`${query && "p-2"} space-y-1`}>
                           {query?.length < 1 ? <div className="text-yellow-5 00 p-4">No Product Found!</div>
                              : query?.map(r =>
                                 <Link onClick={handleModal} to={`/product_details/${r.id}`} key={r.model} className="alert">
                                    <img src={r.product_img} className="w-10 h-12 object-cover object-top" />
                                    <p>{r.title}</p>
                                 </Link>)
                           }
                        </div>
                     </div>
                  </div>
               </dialog>

               {!user ? (
                  <Link to="/login">
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
                              <RiLogoutCircleLine className="size-5" /> Logout
                           </button>
                           <Link to="/profile" className="btn bg-violet-700 text-white shadow-sm text-sm">
                              <CiUser className="size-5" /> Profile
                           </Link>
                        </div>
                     </div>
                  </div>
               )}

               <Link to={'/favourite'} className="cursor-pointer">
                  <CiHeart className="size-6" />
               </Link>
               <Link to="/cart" className="indicator">
                  <CiShoppingCart className="size-6 text-yellow-800" />
                  <span className="indicator-item badge bg-transparent border-0">{cartItems?.length}</span>
               </Link>
            </div>
         </div>
         <DesktopNav />
      </div >
   );
};

export default Searchbar;
