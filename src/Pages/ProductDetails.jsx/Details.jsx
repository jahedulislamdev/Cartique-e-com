import React, { useContext } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

const Details = () => {
   const { products } = useContext(contextProvider);
   const { id } = useParams();
   const selectedProducts = products?.find(p => p.id === id);
   if (!selectedProducts) {
      return <div role="alert" className="alert alert-warning alert-outline">
         <span>Sorry! This Product Could't Found</span>
      </div>
   }
   return (
      <div className='container mx-auto md:grid grid-cols-2 space-x-5 my-7 p-5 rounded-lg'>
         <div className='grid grid-cols-5'>
            <div className='col-span-1 p-0.5'>
               trails image fixing soon..
            </div>
            <div className='col-span-4'>
               <img className='max-h-4/5 object-center object-cover' src={selectedProducts.product_img} alt="https://i.postimg.cc/Hs4xb1JW/demo-img.jpg" />
            </div>
         </div>
         <div className='space-y-2 p-2'>
            <p className='font-medium text-3xl'>{selectedProducts.title}</p>
            <div className="flex items-center">
               <span className={`text-gray-400 line-through text-2xl ${selectedProducts.old_price ? "me-3" : ""}`}>{selectedProducts.old_price ? selectedProducts.old_price : ""}</span>
               <span className="text-red-600 font-bold text-2xl">৳ {selectedProducts.price}</span>
            </div>
            <p className='font-medium text-lg'>Abailability :{selectedProducts.abailability ? selectedProducts.abailability : ''}</p>
            <p className='font-medium text-lg'>Color : {selectedProducts.color ? selectedProducts.color : "Not Specified"}</p>
            {/* size */}
            <div>
               <div className="join space-x-2.5">
                  <input className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white" type="radio" name="options" aria-label="S" />
                  <input className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white" type="radio" name="options" aria-label="M" />
                  <input className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white" type="radio" name="options" aria-label="L" />
                  <input className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white" type="radio" name="options" aria-label="XL" />
                  <input className="join-item btn rounded-4xl border-0 checked:bg-red-700 checked:text-white" type="radio" name="options" aria-label="XXL" />
               </div>
            </div>
            {/* quantity */}
            <div className="join join-horizontal mt-3">
               <button className="btn text-xl border-gray-50 cursor-default rounded-s join-item">0</button>
               <button className="btn text-xl border-gray-50 rounded-e join-item">-</button>
               <button className="btn text-xl border-gray-50 join-item">+</button>
            </div>
            <div className='flex justify-start items-center space-x-3 mt-4'>
               <button className='uppercase hover:bg-red-800 hover:text-white transition-colors w-full border p-2 cursor-pointer'>Add to bag</button>
               <button className='hover:bg-red-800 p-2 hover:text-white rounded-full cursor-pointer transition-colors'><CiHeart className='size-6 ' /></button>
            </div>
            <div className='flex justify-center items-center space-x-3 mt-5'>
               <p className='h-4 w-full bg-gray-700'></p>
               <p className='h-4 w-full bg-gray-700'></p>
            </div>
            {/* measurement */}
            <div className='my-3'>
               <img src="https://i.postimg.cc/bYg9MNz2/cloath_measurement.jpg" alt="" />
            </div>
            <div className='space-y-4 ps-4 '>
               <p className='font-medium text-lg'>Cetegory: <span>{selectedProducts.category}</span></p>
               <p className='font-medium text-lg'>SKU : {selectedProducts.id}</p>
               <p className='font-medium text-lg'>Tag: {selectedProducts.tag ? selectedProducts.tag : 'Adding soon'}</p>
               <p className='font-medium text-lg'>Share: Adding soon</p>
            </div>
            {/* description */}
            <div className="join join-vertical bg-base-100">
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-lg">Description</div>
                  <div className="collapse-content text-md">{selectedProducts.description}</div>
               </div>
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-lg">Shipping and Returns</div>
                  <div className="collapse-content text-md">You can include Your Shipping and Return policy here </div>
               </div>
               <div className="collapse collapse-arrow join-item border-base-300 border">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold text-md">Features</div>
                  <div className="collapse-content">{selectedProducts.features.map((f, i) =>
                     <ul key={i}>
                        <li className='mb-3'>{i + 1}. {f}</li>
                     </ul>)}
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Details;