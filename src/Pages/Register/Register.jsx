import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Register = () => {
   const { registerUser, sendVerificationEmail, setLoading, setUser } = useContext(contextProvider);
   const [err, setErr] = useState(null);
   const handleFormSubmit = (e) => {
      setLoading(true);
      setErr(null);
      e.preventDefault();
      const userData = new FormData(e.currentTarget);
      const number = userData.get("number");
      const userName = userData.get("name");
      const email = userData.get("email");
      const password = userData.get("password");
      const terms = userData.get("terms")
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

      if (!number || number.length !== 11 || isNaN(number) || !number.startsWith("01")) {
         setLoading(false);
         return setErr("Please enter a valid 11-digit phone number starting with 01.");
      } else if (!passwordRegex.test(password)) {
         setLoading(false);
         return setErr("Password must be at least 6 characters with at least one uppercase and one lowercase letter.");
      } else if (!terms) {
         setLoading(false);
         return setErr("Plese Accept our Terms and Conditions!")
      }
      registerUser(email, password)
         .then((res) => {
            updateProfile(res.user, { displayName: userName })
               .then(() => sendVerificationEmail()) // send varification email
               .then(() => {
                  Swal.fire({
                     text: "We send a varification link to your email.Please varify before login.",
                     icon: "success",
                     confirmButtonText: "GOT IT!",
                     confirmButtonColor: "#2c2c54",
                  });
                  e.target.reset(); // reset form after registration
                  // Don't set user in context immediately after registration.
                  // User should login after verifying their email.
                  setUser(null)
                  // console.log(res.user)
               })
         })
         .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
               toast.error("Email Already In Use."), { autoClose: 2000, }
            } else {
               toast.error("Registration Faild! Please Try Again."), { autoClose: 2000 }
               // console.log(err)
            }
         })
         .finally(() => setLoading(false));
   }
   return (
      <div className="rounded-2xl my-8 max-w-md mx-auto px-4 py-8 bg-white border border-gray-200 shadow-lg">
         <Helmet>
            <title>Register | Chartique</title>
         </Helmet>

         <form onSubmit={handleFormSubmit} className="space-y-5">
            <p className="text-center text-3xl font-semibold text-gray-800">Create an Account</p>

            <div className="form-control">
               <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
               <input
                  name="number"
                  type="number"
                  placeholder="018XXXXXXXX"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
               />
            </div>

            <div className="form-control">
               <label className="block text-sm text-gray-600 mb-1">Username</label>
               <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
               />
            </div>

            <div className="form-control">
               <label className="block text-sm text-gray-600 mb-1">Email Address</label>
               <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
               />
            </div>

            <div className="form-control">
               <label className="block text-sm text-gray-600 mb-1">Password</label>
               <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
               />
               {err && <p className="mt-1 text-xs text-red-500">{err}</p>}
            </div>

            <div className="flex items-start text-sm space-x-2">
               <input
                  name="terms"
                  type="checkbox"
                  className="mt-1 checkbox checkbox-sm border-violet-500 focus:ring-violet-500"
                  required
               />
               <span className="text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-violet-600 underline hover:text-violet-800">
                     Terms & Conditions
                  </Link>
               </span>
            </div>

            <div className="form-control">
               <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-violet-700 hover:bg-violet-800 text-white font-medium transition duration-300"
               >
                  Register
               </button>
               <p className="text-sm text-center text-gray-600 mt-3">
                  Already have an account?{" "}
                  <Link to="/login" className="text-violet-600 font-medium hover:underline">
                     Login
                  </Link>
               </p>
            </div>
         </form>

         <ToastContainer transition={Slide} />
      </div>


   );
};

export default Register;