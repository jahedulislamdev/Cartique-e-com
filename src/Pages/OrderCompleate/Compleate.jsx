import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Complete = () => {
   return (
      <div className='p-6 md:p-10 bg-base-100 rounded-xl shadow-lg max-w-2xl mx-auto font-display'>
         <p className='text-2xl font-semibold text-center text-green-600 mb-6'>🎉 Order Confirmation</p>

         <div className='flex flex-col items-center justify-center space-y-4'>
            <FaCheckCircle className='text-green-500 text-5xl' />
            <p className='text-lg font-medium text-center'>Your order has been successfully placed.</p>
            <p className='text-center text-gray-500 px-4'>
               We have received your order and will deliver it within <span className="font-semibold text-gray-700">1-2 working days</span> to the provided address.
            </p>
            <p className='text-sm text-gray-600'>🧾 <span className='font-medium'>Order ID:</span> <span className='text-indigo-600 font-semibold'>29B773</span></p>
         </div>
      </div>
   );
};

export default Complete;
