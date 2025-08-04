import { useContext } from "react";
import { contextProvider } from "../Provider/DataProvider";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from "react-router-dom";

const DesktopNav = () => {
   const { navData } = useContext(contextProvider);
   return (
      <div>
         <ul className="hidden md:flex md:gap-x-7 md:justify-center md:items-center md:py-3 font-Onset">
            {navData.map((item) => (
               <li key={item.id} className="uppercase text-sm relative group flex items-center cursor-pointer md:border-e pe-1 border-gray-700">
                  <Link to={item.direct_path ? item.direct_path : ''}>{item.title}</Link>
                  {item.submenu && <MdOutlineKeyboardArrowDown className="ms-1" />}
                  {item.submenu && (
                     <ul className="absolute transition-all left-0 top-full hidden bg-gray-100 shadow-lg rounded-b-lg p-5 min-w-100 group-hover:block">
                        {item.submenu.map((subItem, subIndex) => (
                           <li key={subIndex} className=" hover:bg-gray-200 transition-all duration-100 ps-3 pe-5 py-2 cursor-pointer">
                              <Link className="" to={`/category/${subItem.name}`}>{subItem.name}</Link>
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