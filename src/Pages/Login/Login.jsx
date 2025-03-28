import React, { useContext, useState } from 'react';
import { FaFacebook } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Components/Provider/DataProvider';
import { Slide, toast, ToastContainer } from 'react-toastify';

const Login = () => {
   const { loginUser, setUser } = useContext(contextProvider);
   const [showPass, setShowPass] = useState(false);
   const navigate = useNavigate()
   const handleFormSubmit = (e) => {
      e.preventDefault();
      const userData = new FormData(e.currentTarget)
      const email = userData.get("email");
      const password = userData.get("password");
      loginUser(email, password)
         .then((res) => {
            setUser(res.user)
            toast.success("Login successfull", { autoClose: 500 })
            setTimeout(() => {
               navigate('/')
            }, 300);
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
         <form onSubmit={handleFormSubmit} className="card-body">
            <p className='px-2 text-violet-300 text-2xl font-semibold'>Login</p>
            <div className="form-control border rounded border-gray-400">
               <input name='email' type="email" placeholder="example@email.com" className="input w-full border-0 focus:outline-0" required />
            </div>
            <div className="form-control mt-1.5">
               <div className="join items-center w-full border rounded border-gray-400">
                  <input className="join-item w-full input focus:outline-none border-0" name='password' type={showPass ? "text" : "password"} placeholder="password" required />
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
               <Link className='opacity-60 text-xs sm:text-md'>Forget Password?</Link>
            </div>
            <div className="form-control">
               <button className="btn btn-primary w-full shadow-none">Login</button>
               <p className='text-sm font-light mt-2 ps-1'>Don&apos;t have an Account? <Link to={'/register'} className='font-medium text-violet-300'>Register</Link></p>
            </div>
         </form>
         <div className=''>
            <div className="flex flex-col items-center px-9 mx-auto">
               <div className="divider opacity-50">Or Login with</div>
               <div className='flex w-full space-x-5'>
                  <button className='flex rounded-sm cursor-pointer items-center justify-center border border-orange-400 py-2 w-full px-4'><FcGoogle className='size-5 me-1' /> Google</button>
                  <button className='flex rounded-sm cursor-pointer items-center justify-center border border-blue-500 py-2 w-full px-4'><FaFacebook className='size-5 me-1 text-blue-400' /> Facebook</button>
               </div>
            </div>
         </div>
         <ToastContainer transition={Slide} />
      </div>
   );
};

export default Login;