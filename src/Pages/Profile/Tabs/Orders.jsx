import React from 'react';

const Orders = () => {
   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">My previous Orders</h1>
         <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-base-300">
               <thead>
                  <tr className="bg-base-100">
                     <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                     <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                     <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                     <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className="border border-gray-300 px-4 py-2">12345</td>
                     <td className="border border-gray-300 px-4 py-2">2023-10-01</td>
                     <td className="border border-gray-300 px-4 py-2">Shipped</td>
                     <td className="border border-gray-300 px-4 py-2">$100.00</td>
                  </tr>
                  <tr className="bg-base-50">
                     <td className="border border-gray-300 px-4 py-2">12346</td>
                     <td className="border border-gray-300 px-4 py-2">2023-10-02</td>
                     <td className="border border-gray-300 px-4 py-2">Processing</td>
                     <td className="border border-gray-300 px-4 py-2">$50.00</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Orders;