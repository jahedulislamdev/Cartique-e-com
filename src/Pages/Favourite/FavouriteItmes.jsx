import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { getFavouriteItmes } from '../../Components/Hooks/SaveCartModels';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import Spin from '../../Components/Loader/Spin';
import { Helmet } from 'react-helmet-async';

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
      setLoading(false)
   }

   // SORTING FAVOURITE PRODUCTS 
   const [sortValue, setSortValue] = useState();
   useEffect(() => {
      if (!sortValue) return;
      setLoading(true);
      if (sortValue === "highToLow") {
         setFaouriteItems(favouriteItems.sort((a, b) => b.price - a.price));
      } else if (sortValue === "lowToHigh") {
         setFaouriteItems(favouriteItems.sort((a, b) => a.price - b.price));
      }
      setTimeout(() => {
         setLoading(false);
      }, 300);
      // return () => clearTimeout();
   }, [favouriteItems, sortValue, setLoading])

   // FALLBACK
   if (favouriteItems.length === 0) {
      return (
         <div className="h-96 flex flex-col justify-center items-center text-center">
            <img
               src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
               alt="Empty Wishlist"
               className="w-24 h-24 mb-4 opacity-60"
            />
            <p className="text-lg font-semibold text-gray-600">Your wishlist is empty</p>
            <p className="text-sm text-gray-500 mt-1"><Link to={'/shop/products'} className='font-medium text-md text-blue-400'>Browse products</Link> and add your favorites ❤️</p>
         </div>
      );
   }
   return (
      <div className='py-3 sm:px-7 px-1'>
         <Helmet><title>Your Wishlist | Chartique</title></Helmet>
         {/* sroting start */}
         <div className='flex justify-between items-center'>
            <p className='uppercase font-medium text-xs md:text-lg'>Favourite Products</p>
            <select onChange={(e) => setSortValue(e.target.value)} value={sortValue} className="select select-sm w-32 P-0 focus:outline-0">
               <option value={''} disabled={true}>Pick a text editor</option>
               <option value={'highToLow'}>Price High to Low</option>
               <option value={'lowToHigh'}>Price Low to High</option>
            </select>
         </div>
         {/* sroting end */}
         {loading ? <Spin /> :
            <div className='mt-3 grid @min-xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
               {
                  favouriteItems?.map(i => (
                     <div key={i.id} className='relative bg-white'>
                        <Link to={`/product_details/${i.id}`} className='flex alert alert-soft p-2 bg-white'>
                           <div>
                              <img className='h-32 object-cover object-top border-e-3 border-red-500' src={i?.product_img} alt="" />
                           </div>
                           <div className='space-y-1'>
                              <p className='font-medium'>{i.title}</p>
                              <p>Price : {i.price} BDT</p>
                              <p>Category: {i.category}</p>
                              <p>Stock: {i.stock}</p>
                           </div>
                        </Link>
                        <button onClick={() => handleRemoveItem(i.model)} className=" p-0.5 rounded border-0 bg-red-600 text-white absolute top-2 right-2 cursor-pointer"><MdOutlineDelete className='size-5' /></button>
                     </div>
                  ))
               }
            </div>}
      </div>
   );
};

export default FavouriteItmes;