import { Link } from "react-router-dom";

const Display = () => {
   return (
      <div className="w-full h-[450px] relative bg-white">
         <Link to={'/'}><img className="h-[450px] w-full object-cover object-top" src="https://i.postimg.cc/1zH44YH9/Copilot_20250804_203243.png" alt="" /></Link>
      </div>
   );
};

export default Display;