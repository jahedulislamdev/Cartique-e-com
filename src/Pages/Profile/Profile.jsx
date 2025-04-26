import React, { useContext, useEffect } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import { CiShoppingCart } from 'react-icons/ci';
import { LuMessageSquareMore } from 'react-icons/lu';
import { IoMdKey } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide, ToastContainer } from 'react-toastify';
import './profile.css'
const Profile = () => {
   const { user, logOutUser } = useContext(contextProvider);
   const navigate = useNavigate();
   const location = useLocation(); // use location for key-based animation
   useEffect(() => {
      if (location.pathname === "/profile") {
         navigate('personal')
      }
   }, [location.pathname, navigate])
   return (
      <div className='grid grid-cols-4 py-3 '>
         {/* Sidebar */}
         <div className='col-span-1 md:p-2 pe-1 border-e border-gray-500 w-16 md:w-full'>
            {user && <p className='text-xs md:font-medium md:text-lg'> Hello, {user.displayName.split(" ")[0]}!</p>}
            <ul className='space-y-3 mt-3 p-1 capitalize'>
               <NavLink to={'personal'} className='flex items-center border md:p-3 rounded-md alert-soft alert'><FaUser className='size-4' /> <span className='hidden md:block'>Personal Info</span></NavLink>
               <NavLink to={'orders'} className='flex items-center border md:p-3 rounded-md alert-soft alert'><GiShoppingCart className='size-5' /><span className='hidden md:block'>previous  Orders</span></NavLink>
               <NavLink to={'/cart'} className='flex items-center border md:p-3 rounded-md alert-soft alert'> <CiShoppingCart className='size-5' /><span className='hidden md:block'>Cart</span></NavLink>
               <NavLink to={'/favourite'} className='flex items-center border md:p-3 rounded-md alert-soft alert'><FaHeart className='size-4' /> <span className='hidden md:block'>Wishlist</span></NavLink>
               <NavLink to={'reviews'} className='flex items-center border md:p-3 rounded-md alert-soft alert'><LuMessageSquareMore className='size-5' /> <span className='hidden md:block'>Reviews</span></NavLink>
               <NavLink to={'forget_pass'} className='flex items-center border md:p-3 rounded-md alert-soft alert'><IoMdKey className='size-5' /> <span className='hidden md:block'>Change Password</span></NavLink>
               <button onClick={() => logOutUser(navigate)} className='flex items-center w-full border cursor-pointer md:p-3 rounded-md alert-soft alert'><RiLogoutCircleLine className='size-5' /> <span className='hidden md:block'>Logout</span></button>
            </ul>
         </div>

         {/* Animated Outlet Section */}
         <div className='col-span-3 md:px-3'>
            <AnimatePresence mode="wait">
               <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
               >
                  <Outlet />
               </motion.div>
            </AnimatePresence>
         </div>
         <ToastContainer transition={Slide} theme='light' />
      </div>
   );
};

export default Profile;
