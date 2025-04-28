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
      <div className="relative w-full max-w-md mx-auto my-6 p-0.5 rounded-2xl md:bg-gradient-to-r from-cyan-900 via-purple-700 to-blue-900 shadow-xl">
         <div className="rounded-2xl px-2 py-4 md:py-8 bg-base-100 border border-[#353535] shadow-[0_0_0_2px_rgba(255,255,255,0.05)]">
            <Helmet>Register | Chartique</Helmet>

            <form onSubmit={handleFormSubmit} className="space-y-4">
               <p className="text-center text-violet-300 text-3xl font-bold mb-4">Register</p>

               <div className="form-control">
                  <input
                     name="number"
                     type="number"
                     placeholder="018XXXXXXXX"
                     className="w-full px-4 py-3 rounded-lg bg-base-200 border border-transparent placeholder-gray-400 focus:outline-none"
                     required
                  />
               </div>

               <div className="form-control">
                  <input
                     name="name"
                     type="text"
                     placeholder="Username"
                     className="w-full px-4 py-3 rounded-lg bg-base-200 border border-transparent placeholder-gray-400 focus:outline-none"
                     required
                  />
               </div>

               <div className="form-control">
                  <input
                     name="email"
                     type="email"
                     placeholder="example@email.com"
                     className="w-full px-4 py-3 rounded-lg bg-base-200 border border-transparent placeholder-gray-400 focus:outline-none"
                     required
                  />
               </div>

               <div className="form-control">
                  <input
                     name="password"
                     type="password"
                     placeholder="Password"
                     className=" w-full px-4 py-3 rounded-lg bg-base-200 border border-transparent placeholder-gray-400 focus:outline-none"
                     required
                  />
                  {err && <p className="m-1 text-xs text-red-500">{err}</p>}
               </div>

               <div className="flex items-center space-x-2 text-sm">
                  <input
                     name="terms"
                     type="checkbox"
                     className="checkbox checkbox-xs rounded-md border-pink-500 "
                     required
                  />
                  <span className="text-gray-300">
                     Accept our{" "}
                     <Link to={'/terms'} className="text-violet-300 underline hover:text-pink-400">
                        Terms and Conditions
                     </Link>
                  </span>
               </div>

               <div className="form-control">
                  {/* <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90  font-semibold transition-all">
                     Register
                  </button> */}
                  <button className="btn bg-violet-700 w-full text-white rounded ">Register</button>
                  <p className="text-sm font-light mt-3 text-center text-gray-400">
                     Already have an Account?{" "}
                     <Link to={"/login"} className="font-medium text-violet-300 hover:underline">
                        Login
                     </Link>
                  </p>
               </div>
            </form>

            <ToastContainer transition={Slide} />
         </div>
      </div>

   );
};

export default Register;