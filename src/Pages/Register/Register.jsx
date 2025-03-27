import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { contextProvider } from '../../Components/Provider/DataProvider';

const Register = () => {
   const { registerUser } = useContext(contextProvider);
   const handleFormSubmit = (e) => {
      e.preventDefault();
      const userData = new FormData(e.currentTarget);
      const userName = userData.get("name");
      const photoURl = userData.get("profile");
      const email = userData.get("email");
      const password = userData.get("password");
      const terms = userData.get("terms")
      console.log(userName, photoURl, email, password, terms);
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

      if (!passwordRegex.test(password)) {
         return console.log("Password must be at least 6 characters including at least one uppercase and one lowercase latter")
      } else if (terms === null) {
         return console.log("plese accept our terms and conditions!")
      }
      registerUser(email, password)
         .then((userCredential) => {
            console.log(userCredential.user)
         })
         .catch(err => console.err(err))

   }
   return (
      <div className='w-11/12 sm:w-1/2 md:w-2/4 xl:w-1/3 mx-auto border font-display border-[#354c74] shadow-md my-3 md:py-4 rounded-lg'>
         <form onSubmit={handleFormSubmit} className="card-body space-y-2">
            <p className='px-2 text-violet-300 text-2xl font-semibold'>Registration</p>
            <div className="form-control">
               <input name='name' type="text" placeholder="Username" className="input focus:outline-0 w-full" required />
            </div>
            <div className="form-control">
               <input name='profile' type="url" placeholder="PhotoURl" className="input focus:outline-0 w-full" required />
            </div>
            <div className="form-control">
               <input name='email' type="email" placeholder="example@email.com" className="input focus:outline-0 w-full" required />
            </div>
            <div className="form-control">
               <input name='password' type="password" placeholder="password" className="input focus:outline-0 w-full" required />
            </div>
            <div className="form-control">
               <label className="cursor-pointer justify-start label">
                  <input name='terms' type="checkbox" className="checkbox checkbox-xs rounded-box checkbox-primary" />
                  <span className="label-text text-xs">Accept our <Link to={''} className='text-violet-300'>Terms and Conditions</Link></span>
               </label>
            </div>
            <div className="form-control">
               <button className="btn btn-primary w-full">Register</button>
               <p className='text-sm font-light mt-2 ps-1'>Don&apos;t have an Account? <Link to={"/login"} className='font-medium text-violet-300'>Login</Link></p>
            </div>
         </form>
      </div>
   );
};

export default Register;