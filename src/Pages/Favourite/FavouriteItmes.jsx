import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { getFavouriteItmes } from '../../Components/Hooks/SaveCartModels';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import Spin from '../../Components/Loader/Spin';

const FavouriteItmes = () => {
   const { products, setLoading, loading } = useContext(contextProvider);
   const [favouriteItems, setFaouriteItems] = useState([]);

   useEffect(() => {
      setLoading(true);
      const savedFavouriteItems = getFavouriteItmes();
      const matchedItems = products?.filter(p => savedFavouriteItems?.includes(p.model));
      setFaouriteItems(matchedItems);
      setLoading(false);
   }, [setLoading, products]);

   // remove favourite product form localstorge
   const handleRemoveItem = (model) => {
      setLoading(true)
      const savedFavouriteItems = getFavouriteItmes();
      const updatedFavouriteModels = savedFavouriteItems.filter(p => p !== model);

      // update to localstorage
      localStorage.setItem('favouriteItem', JSON.stringify(updatedFavouriteModels));

      // Filter matched product with real objects
      const updatedMatchedItems = products.filter(p => updatedFavouriteModels.includes(p.model))
      setFaouriteItems(updatedMatchedItems);
      setTimeout(() => {
         setLoading(false)
      }, 700);
   }
   if (favouriteItems.length === 0) {
      return (
         <div className="h-96 flex flex-col justify-center items-center text-center">
            <img
               src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
               alt="Empty Wishlist"
               className="w-24 h-24 mb-4 opacity-60"
            />
            <p className="text-lg font-semibold text-gray-600">Your wishlist is empty</p>
            <p className="text-sm text-gray-500 mt-1"><Link to={'//shop/products'}>Browse products</Link> and add your favorites ❤️</p>
         </div>
      );
   }
   return (
      <div className='py-3 px-7'>
         {/* sroting start */}
         <div className='flex justify-between items-center'>
            <p className='uppercase font-medium text-xs @max-xs:font-semibold '>Favourite Products</p>
            <select defaultValue="Pick a text editor" className="select w-28 h-8 P-0 focus:outline-0">
               <option disabled={true}>Pick a text editor</option>
               <option>Price High to Low</option>
               <option>Price Low to High</option>
            </select>
         </div>
         {/* sroting end */}
         {loading ? <Spin /> :
            <div className='mt-3 grid @min-xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
               {
                  favouriteItems?.map(i => (
                     <div key={i.id} className='relative'>
                        <Link to={`/product_details/${i.id}`} className='flex alert alert-soft p-2'>
                           <div>
                              <img className='h-32 object-cover object-top border-e-3 border-red-500' src={i?.product_img} alt="" />
                           </div>
                           <div>
                              <p className='font-medium'>{i.title}</p>
                              <p className=''>Category: {i.category}</p>
                              <p className=''>Stock: {i.stock}</p>
                           </div>
                        </Link>
                        <button onClick={() => handleRemoveItem(i.model)} className=" p-0.5 rounded border-0 bg-red-600 text-white absolute top-1 right-1 cursor-pointer"><MdOutlineDelete className='size-4' /></button>
                     </div>
                  ))
               }
            </div>}
      </div>
   );
};

export default FavouriteItmes;