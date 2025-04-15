import React, { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../Provider/DataProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { BsCartPlus, BsLayoutSidebarReverse } from 'react-icons/bs';
import { IoEyeOutline, IoShareSocial } from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Slide, ToastContainer } from 'react-toastify';
import OverviewModal from '../Hooks/OverviewModal';

const CetegoryDetails = () => {
   const { productCategories, products, loading, setLoading, overviewProduct, setOverviewProduct } = useContext(contextProvider);
   const [openCategory, setOpenCategory] = useState(null);
   const { category } = useParams();
   const [filteredCategory, setFilteredCategory] = useState([]);
   const [checkedCheckbox, setcheckedCheckbox] = useState([]);
   const navigate = useNavigate()

   // ovserve subcategory checkbox for checked or unchecked
   const observeChange = (sc) => {
      setcheckedCheckbox((prev) => prev.includes(sc) ? prev.filter((c) => c !== sc) : [...prev, sc]);
   };
   // filter product by click on category (category wise filter)
   const filterByCategory = (sc) => {
      const filteredByCategory = products.filter(p => p.category === sc);
      setFilteredCategory(filteredByCategory);
      navigate(`/category/${sc}`)
   }
   // load and filter data based on checkbox checking
   useEffect(() => {
      setLoading(true);
      let matchingProducts = products.filter(
         product => (product.category === category) || (product.sub_category === category)
      )
      if (checkedCheckbox.length > 0) {
         matchingProducts = matchingProducts.filter(p => checkedCheckbox.includes(p.sub_category))
      }
      setFilteredCategory(matchingProducts);


      // gimme some time to update State
      setTimeout(() => {
         setLoading(false);
      }, 300);
   }, [category, products, setLoading, checkedCheckbox]);


   //remove from checklist 
   const deleteFromChecklist = (idx) => {
      setcheckedCheckbox((prev) => prev.filter((_, i) => i !== idx));
   }
   // show product overview modal
   const showProductOverview = (id) => {
      setLoading(true);
      const checkdProduct = products.find(p => p.id === id);
      if (checkdProduct) {
         setOverviewProduct(checkdProduct);
         document.getElementById('overView').showModal();
      }
      setLoading(false);
   }
   // loading spinner
   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
         </div>
      );
   }

   return (
      <div className='sm:grid grid-cols-5 mt-2 justify-center '>
         <button
            onClick={() => { document.getElementById('openCategory').showModal() }} role="button"
            className="btn btn-ghost sm:hidden">
            <BsLayoutSidebarReverse className='size-5' /> Show Category
         </button>
         {/* sidebar category start */}
         <dialog id="openCategory" className="modal flex modal-start">
            <div className="modal-box w-full">
               <form method="dialog" className='mb-3 flex justify-between items-center'>
                  <p className="text-lg font-semibold uppercase">Chartique</p>
                  <button className="text-gray-400 cursor-pointer">ese</button>
               </form>
               <div className="col-span-1">
                  {productCategories.map((pc, index) =>
                     <div className="collapse collapse-arrow border border-base-300" key={index}>
                        <input
                           type="checkbox"
                           checked={openCategory === index}
                           onClick={() => filterByCategory(pc.category)}
                           onChange={() => setOpenCategory(openCategory === index ? null : index)}
                        />
                        <div className="collapse-title font-semibold uppercase">{pc.category}</div>
                        <div className="collapse-content">
                           {pc.sub_category.map((sc, subIndex) => (
                              <label className="fieldset-label" key={subIndex}>
                                 <input type="checkbox"
                                    checked={checkedCheckbox.includes(sc)}
                                    onChange={() => observeChange(sc)}
                                    className="checkbox checkbox-sm checkbox-primary my-2" />
                                 <span className='uppercase text-sm'>{sc}</span>
                              </label>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </dialog>
         {/* sidebar category end */}


         <div className="col-span-1 hidden sm:block">
            {productCategories.map((pc, index) =>
               <div className="collapse collapse-arrow border border-base-300" key={index}>
                  <input
                     type="checkbox"
                     checked={openCategory === index}
                     onClick={() => filterByCategory(pc.category)}
                     onChange={() => setOpenCategory(openCategory === index ? null : index)}
                  />

                  <div className="collapse-title font-semibold uppercase">{pc.category}</div>
                  <div className="collapse-content">
                     {pc.sub_category.map((sc, subIndex) => (
                        <label className="fieldset-label" key={subIndex}>
                           <input type="checkbox"
                              checked={checkedCheckbox.includes(sc)}
                              onChange={() => observeChange(sc)}
                              className="checkbox checkbox-sm checkbox-primary my-2" />
                           <span className='uppercase text-sm'>{sc}</span>
                        </label>
                     ))}
                  </div>
               </div>
            )}
         </div>
         <div className="col-span-4 scrollbar-none overflow-auto h-screen">
            {/* show checked sub-categoy top start*/}
            <div className='flex items-center space-x-3 p-2 transition-all opacity-80 overflow-auto'>
               {
                  checkedCheckbox.map((ccb, idx) => <p className='btn uppercase text-xs' key={idx}>{ccb}
                     <button onClick={() => deleteFromChecklist(idx)} className='cursor-pointer'><FaCircleXmark className='size-4' /></button> </p>)
               }
            </div>
            {/* show checked sub-categoy top end*/}
            <div className={`${filteredCategory.length > 0 && "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-20 pb-3 px-2"}`}>
               {filteredCategory.length < 1 ?
                  <div className='flex justify-center items-center'>
                     <span className='text-base-800 font-display antialiased flex items-center text-sm'><RiErrorWarningFill className='me-1 size-5 text-yellow-700' /> No products were found matching your selection !</span>
                  </div> :
                  filteredCategory.map(p => (
                     <div id='productCard' key={p.id} className='h-56 cursor-pointer md:h-64 transition-all relative'>
                        <button className='rounded-full absolute top-1.5 right-1.5 cursor-pointer hover:bg-white p-0.5 transition-colors'>
                           <CiHeart className='text-black hovr:bg-white size-5' />
                        </button>
                        <Link to={`/product_details/${p.id}`}><img className='h-full w-full object-cover object-top' src={p.product_img} alt={p.title} /></Link>
                        <div id='hoverElements' className='space-x-5'>
                           <button onClick={() => showProductOverview(p.id)} className='w-8 h-8 flex justify-center items-center rounded-sm cursor-pointer bg-gray-600 text-white'>
                              <BsCartPlus className='size-5 hover:opacity-50 transition-all' />
                           </button>
                           <Link to={`/product_details/${p.id}`}
                              className='w-8 h-8 flex justify-center items-center rounded-sm text-white cursor-pointer bg-gray-600'>
                              <IoEyeOutline className='size-5 hover:opacity-50 transition-all' />
                           </Link>
                           {/* modal content (product overview) */}
                           <dialog id="overView" className="modal modal-lg">
                              <OverviewModal overviewProduct={overviewProduct} />
                           </dialog>
                        </div>
                        <div>
                           <p className='text-xs mt-1 md:uppercase hover:opacity-50 transition-colors'>{p.title}</p>
                           <p className='text-sm md:text-md '>৳ {p.price}</p>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
         <ToastContainer transition={Slide} />
      </div>
   );
};

export default CetegoryDetails;
