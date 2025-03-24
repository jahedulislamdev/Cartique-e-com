import React, { useContext, useState } from "react";
import { contextProvider } from "../Provider/DataProvider";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const MobileNav = ({ closeModal }) => {
   const { navData } = useContext(contextProvider);
   const [openMenu, setOpenMenu] = useState(null);

   const handleToggle = (idx) => {
      setOpenMenu(openMenu === idx ? null : idx);
   };


   const handleSubmenuClick = () => {
      setTimeout(() => {
         closeModal();
      }, 300);
   };

   const handleMenuClick = (hasSubmenu) => {
      if (!hasSubmenu) {
         setTimeout(() => {
            closeModal();
         }, 500);
      }
   };

   return (
      <ul className="w-full">
         {navData.map((item, idx) => (
            <li key={idx} className="border-b border-x first:border-t border-gray-700 cursor-pointer">
               {/* Main Menu */}
               <div
                  className="flex justify-between items-center"
                  onClick={() => {
                     handleToggle(idx);
                     handleMenuClick(item.submenu);
                  }}
               >
                  <Link
                     to={item.direct_path}
                     className={`${openMenu === idx && "font-semibold transition-all opacity-50"} p-3 uppercase text-sm`}
                  >
                     {item.title}
                  </Link>
                  {item.submenu && (
                     <MdOutlineKeyboardArrowDown
                        className={`size-5 me-1 transition-transform duration-300 ${openMenu === idx ? "rotate-180" : "rotate-0"}`}
                     />
                  )}
               </div>

               {/* Collapsible Submenu */}
               <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === idx ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                     }`}
               >
                  {item.submenu && (
                     <ul className="mt-3">
                        {item.submenu.map((subItem, i) => (
                           <li key={i} className="border-t last:border-b-0 border-gray-700 px-4 py-2.5 hover:bg-gray-300">
                              <Link to={subItem.path}
                                 className="uppercase text-sm"
                                 onClick={handleSubmenuClick}>
                                 {subItem.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </li>
         ))}
      </ul>
   );
};

export default MobileNav;
