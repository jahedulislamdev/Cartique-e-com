import React, { useContext, useState } from "react";
import { contextProvider } from "../Provider/DataProvider";
import { Link } from "react-router-dom";

const MobileNav = () => {
   const { navData, handleModalClose } = useContext(contextProvider);
   const [openMenu, setOpenMenu] = useState(null);

   const handleToggle = (idx) => {
      setOpenMenu(openMenu === idx ? null : idx);
   };

   return (
      <div>
         <Link onClick={handleModalClose} to={'/'} className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">Home</div>
         </Link>
         {
            navData.map((menu, idx) => (<div key={menu.id}>
               <div className={`collapse ${menu.submenu && "collapse-arrow"} bg-base-100 border border-base-300`}>
                  <input onChange={() => handleToggle(idx)} checked={openMenu === idx} type="checkbox" name="my-accordion-2" />
                  <Link className={`collapse-title font-semibold uppercase ${openMenu === idx ? 'bg-violet-300 font-black opacity-70' : "font-normal"}`}>{menu.title}</Link>
                  {menu.submenu &&
                     <div className="collapse-content text-sm ">
                        {
                           menu.submenu.map((subItem, idx) =>
                              <div key={idx}>
                                 <Link to={`/category/${subItem.name}`} onClick={handleModalClose} className="text-sm uppercase alert alrt-soft m-1 shadow-none">{subItem.name}</Link>
                              </div>)
                        }
                     </div>}
               </div>
            </div>))
         }
      </div>
   );
};

export default MobileNav;
