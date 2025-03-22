import { useContext } from "react";
import { contextProvider } from "../Provider/DataProvider";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from "react-router-dom";

const DesktopNav = () => {
   const { navData } = useContext(contextProvider);
   return (
      <div>
         <ul className="hidden md:flex md:gap-x-7 md:justify-center md:items-center md:py-2">
            {navData.map((item) => (
               <li key={item.id} className="uppercase text-sm relative group flex items-center cursor-pointer md:border-e pe-1 border-gray-700">
                  <Link to={item.direct_path && item.direct_path}>{item.title}</Link>
                  {item.submenu && <MdOutlineKeyboardArrowDown className="ms-1" />}
                  {item.submenu && (
                     <ul className="absolute transition-all left-0 top-full hidden bg-base-100 shadow-lg rounded-md p-2 min-w-56 group-hover:block">
                        {item.submenu.map((subItem, subIndex) => (
                           <li key={subIndex} className="hover:text-red-300 transition-colors px-3 py-1 cursor-pointer">
                              <Link to={subItem.path}>{subItem.name}</Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
};
export default DesktopNav;