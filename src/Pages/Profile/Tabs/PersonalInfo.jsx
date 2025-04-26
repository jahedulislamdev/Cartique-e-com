import React, { useContext } from 'react';
import { contextProvider } from '../../../Components/Provider/DataProvider';
import { Helmet } from 'react-helmet-async';

const PersonalInfo = () => {
   const { user } = useContext(contextProvider)
   return (
      <div>
         <Helmet>Personal Info | Chartique </Helmet>
         <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
         <form className="space-y-4">
            <div>
               <label className="block font-medium mb-1">Name</label>
               <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded"
               />
            </div>
            <div>
               <label className="block font-medium mb-1">Phone Number</label>
               <input
                  type="text"
                  value="01831303692"
                  readOnly
                  className="w-full border px-3 py-2 rounded"
               />
            </div>
            <div>
               <label className="block font-medium mb-1">Email Address</label>
               <input
                  type="email"
                  value="iamjishan91@gmail.com"
                  readOnly
                  className="w-full border px-3 py-2 rounded"
               />
            </div>
         </form>
      </div>
   );
};

export default PersonalInfo;