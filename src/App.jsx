import React from 'react';
import Cetegory from './Components/Cetegories/Cetegory';
import Display from './Pages/Products/Display';
import Trendings from './Pages/Products/Trendings';
import NewArrival from './Pages/Products/NewArrival';
import { Slide, ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='mt-2'>
      {/* DISPLAY PRODUCT */}
      <div>
        <Display />
      </div>
      {/* Product cetegories */}
      <Cetegory />
      <div>
        <p className='uppercase border-b border-gray-700 text-center p-3 md:p-5 text-xl md:text-3xl font-medium'>trending items</p>
        <Trendings />
      </div>
      <div>
        <p className='uppercase border-b border-gray-700 text-center p-3 md:p-5 text-xl md:text-3xl font-medium my-2'>new arrivals</p>
        <NewArrival />
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default App;