import { useContext, useState } from 'react';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Slide, toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import ForgetPass from './../../Components/Forget Password/ForgetPass';
import { Helmet } from 'react-helmet-async';

const Login = () => {
   const { loginUser, setUser, loginWithGoogle, loginWithFacebook } = useContext(contextProvider);
   const [showPass, setShowPass] = useState(false);
   const location = useLocation();
   const navigate = useNavigate()
   const handleFormSubmit = (e) => {
      e.preventDefault();
      const userData = new FormData(e.currentTarget)
      const email = userData.get("email");
      const password = userData.get("password");
      loginUser(email, password)
         .then((res) => {
            if (res.user.emailVerified === false) {
               return Swal.fire({
                  title: "Email Not Verified",
                  text: "Please verify your email before logging in.",
                  icon: "warning",
                  confirmButtonText: "Close",
                  confirmButtonColor: "#f59e0b",
               });
            }
            setUser(res.user)
            toast.success("Login successfull", { autoClose: 1000 })
            setTimeout(() => {
               navigate(location?.state ? location.state : "/")
            }, 400);
         })
         .catch(err => {
            if (err.code === "auth/invalid-credential") {
               toast.error("Invalid Email or Password", { autoClose: 1000 })
            } else {
               toast.error("Login Faild!", { autoClose: 500 })
            }
         });
   }
   return (
      <div className="flex items-center justify-center py-5">
         <div className="relative w-full max-w-md p-6 rounded-xl border border-gray-300 bg-gray-50 ">
            <Helmet>Login | Chartique</Helmet>

            <form onSubmit={handleFormSubmit} className="space-y-4">
               {/* Header */}
               <h2 className="text-3xl font-bold text-violet-400 text-center">Login</h2>

               {/* Email input */}
               <div>
                  <label className="text-sm font-medium block p-1">Email</label>
                  <input
                     type="email"
                     name="email"
                     required
                     placeholder="Enter your email here"
                     className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none"
                  />
               </div>

               {/* Password input */}
               <div>
                  <label className="text-sm font-medium p-1 block">Password</label>
                  <div className="relative">
                     <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        required
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-3  "
                     >
                        {showPass ? <IoEye className="size-5" /> : <IoEyeOff className="size-5" />}
                     </button>
                  </div>
               </div>

               {/* Remember Me and Forgot Password */}
               <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                     <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                     Remember Me
                  </label>
                  <button
                     type="button"
                     onClick={() => document.getElementById('showForgotPasswordModal').showModal()}
                     className="text-xs text-violet-400 hover:underline cursor-pointer "
                  >
                     Forgot Password?
                  </button>
               </div>

               {/* Login Button */}
               <div className="space-y-3">
                  <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 duration-100  rounded-lg text-white font-semibold">
                     Sign In
                  </button>
                  <p className="text-center text-sm text-gray-400">
                     Don’t have an account? <Link to={'/register'} className="text-violet-500 hover:underline font-medium">Register</Link>
                  </p>
               </div>
            </form>

            {/* Divider */}
            <div className="divider opacity-30"> OR Login With </div>

            {/* Social Login */}
            <div className="flex gap-4">
               <button
                  onClick={() => loginWithGoogle(navigate, location)}
                  className="flex items-center justify-center w-full py-2 shadow rounded-lg hover:bg-gray-200"
               >
                  <FcGoogle className="size-5 mr-2" /> Google
               </button>
               <button
                  onClick={() => loginWithFacebook(navigate, location)}
                  className="flex items-center justify-center w-full py-2 shadow rounded-lg hover:bg-gray-200"
               >
                  <FaFacebook className="size-5 mr-2 text-blue-400" /> Facebook
               </button>
            </div>

            {/* Toast and Modal */}
            <ToastContainer transition={Slide} />
            <dialog id="showForgotPasswordModal" className="modal p-2">
               <div className="modal-box bg-gray-50 p-5 relative">
                  <form method="dialog">
                     <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-700 absolute right-2 top-2">✕</button>
                  </form>
                  <p className="text-xl">Lost your Password?</p>
                  <ForgetPass />
               </div>
            </dialog>
         </div>
      </div>

   );
};

export default Login;