import React, { useContext, useState } from 'react';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Slide, toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import ForgetPass from './../../Components/Forget Password/ForgetPass';

const Login = () => {
   const { loginUser, setUser, loginWithGoogle, loginWithFacebook } = useContext(contextProvider);
   const [showPass, setShowPass] = useState(false);
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
               navigate('/')
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
      <div className='w-11/12 sm:w-1/2 md:w-2/3 lg:w-1/3 mx-auto border font-display border-[#354c74] shadow-md my-3 py-4 rounded-lg'>
         <form onSubmit={handleFormSubmit} className='space-y-5 px-5'>
            <p className='px-2 text-violet-300 text-2xl font-semibold card-title'>Login</p>
            <div className="form-control border rounded border-gray-400">
               <input name='email' type="email" placeholder="example@email.com" className="input sm:input-lg w-full border-0 focus:outline-0" required />
            </div>
            <div className="form-control mt-1.5">
               <div className="join items-center w-full border rounded border-gray-400">
                  <input className="join-item sm:input-lg w-full input focus:outline-none border-0" name='password' type={showPass ? "text" : "password"} placeholder="password" required />
                  <button onClick={() => setShowPass(!showPass)} type='button' className='cursor-pointer join-item p-2 focus:border-violet-500'>{showPass ? <IoEye className='size-5' /> : <IoEyeOff className='size-5' />}</button>
               </div>
            </div>
            <div className="form-control my-2 flex justify-between items-center">
               <div>
                  <label className="cursor-pointer justify-start label">
                     <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                     <span className="label-text text-xs sm:text-md">Remember me</span>
                  </label>
               </div>
               <button type='button' onClick={() => document.getElementById('showForgotPasswordModal').showModal()} className='opacity-60 text-xs sm:text-md cursor-pointer'>Forget Password?</button>
            </div>
            <div className="form-control">
               <button className="btn bg-purple-700 w-full shadow-none">Login</button>
               <p className='text-sm font-light mt-2 ps-1'>Don&apos;t have an Account? <Link to={'/register'} className='font-medium text-violet-300'>Register</Link></p>
            </div>
         </form>
         {/* forget password modal enterd here because form cann't stay in a form (start)*/}
         <dialog id="showForgotPasswordModal" className="modal p-2">
            <div className="modal-box">
               <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-700 absolute right-2 top-2">✕</button>
               </form>
               <p className='text-xl'>Loss your Password?</p>
               <ForgetPass />
            </div>
         </dialog>
         {/* forget password modal enterd here because form cann't stay in a form  (end)*/}
         <div>
            <div className="flex flex-col items-center px-9 mx-auto">
               <div className="divider opacity-50">Or Login with</div>
               <div className='flex w-full space-x-5'>
                  <button onClick={() => loginWithGoogle(navigate)} className='flex rounded-sm cursor-pointer items-center justify-center border border-orange-400 py-2 w-full px-4'><FcGoogle className='size-5 me-1' /> Google</button>
                  <button onClick={() => loginWithFacebook(navigate)} className='flex rounded-sm cursor-pointer items-center justify-center border border-blue-500 py-2 w-full px-4'><FaFacebook className='size-5 me-1 text-blue-400' /> Facebook</button>
               </div>
            </div>
         </div>
         <ToastContainer transition={Slide} />
      </div>
   );
};

export default Login;