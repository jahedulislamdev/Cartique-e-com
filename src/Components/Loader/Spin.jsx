const Spin = () => {
   return (
      <div className="flex justify-center items-center h-96">
         <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow">
            <span className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></span>
            <span className="text-blue-600 font-medium">Loading...</span>
         </div>
      </div>
   );
};

export default Spin;
