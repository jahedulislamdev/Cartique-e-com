import React, { useContext } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { GiShoppingCart } from 'react-icons/gi';
import { CiShoppingCart } from 'react-icons/ci';
import { LuMessageSquareMore } from 'react-icons/lu';
import { IoMdKey } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';

const Profile = () => {
   const { user, logOutUser } = useContext(contextProvider);
   const navigate = useNavigate()
   return (
      <div className='grid grid-cols-4 p-2'>
         <div className='col-span-1 p-2 border-e border-gray-500'>
            {user && <p className='font-medium text-lg'> Hello, {user.displayName.split(" ")[0]}!</p>}
            <ul className='space-y-3 mt-3 p-1 capitalize'>
               <Link to={'personal'} className='flex items-center border p-3 rounded-md alert-soft alert'><FaUser className='size-4' /> Personal Info</Link>
               <Link to={'orders'} className='flex items-center border p-3 rounded-md alert-soft alert'><GiShoppingCart className='size-5' />previous  Orders</Link>
               <Link to={'/cart'} className='flex items-center border p-3 rounded-md alert-soft alert'> <CiShoppingCart className='size-5' />Cart</Link>
               <Link to={'/favourite'} className='flex items-center border p-3 rounded-md alert-soft alert'><FaHeart className='size-4' /> Wishlist</Link>
               <Link to={'reviews'} className='flex items-center border p-3 rounded-md alert-soft alert'><LuMessageSquareMore className='size-5' /> Reviews</Link>
               <Link to={'forget_pass'} className='flex items-center border p-3 rounded-md alert-soft alert'><IoMdKey className='size-5' /> Change Password</Link>
               <Link onClick={() => logOutUser(navigate)} className='flex items-center border p-3 rounded-md alert-soft alert'><RiLogoutCircleLine className='size-5' /> Logout</Link>
            </ul>
         </div>
         <div className='col-span-3 p-3'>
            <Outlet />
         </div>
      </div>
   );
};

export default Profile;