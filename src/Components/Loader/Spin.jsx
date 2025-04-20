import React from 'react';

const Spin = () => {
   return (
      <div className="flex justify-center items-center h-96">
         <button className="btn btn-primary hover:bg-blue-950 btn-soft">
            <span className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500 border-solid"></span>
            Loading..
         </button>
      </div>
   );
};

export default Spin;