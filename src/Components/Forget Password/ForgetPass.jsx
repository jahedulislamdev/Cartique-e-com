import React, { useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { contextProvider } from '../Provider/DataProvider';

const ForgetPass = () => {
   const { handleResetPassword } = useContext(contextProvider);
   // forget password functionality
   const emailRef = useRef(null);
   const [err, setErr] = useState(null);
   const handleForgotPassword = (e) => {
      e.preventDefault();
      setErr(null);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailRef.current.value)) {
         setErr("Please enter valid email address")
      } else {
         handleResetPassword(emailRef.current.value)
            .then(() => {
               Swal.fire({
                  text: "Password reset link sent to your email if you are a registered user.",
                  icon: "warning",
                  confirmButtonText: "GOT IT!",
                  confirmButtonColor: "#2c2c54",
               });
               document.getElementById('showForgotPasswordModal')?.close();
               emailRef.current.value = null;
            })
            .catch((err) => {
               if (err.code === "auth/user-not-found") {
                  setErr("User not found")
               } else if (err.code === "auth/invalid-email") {
                  setErr("Invalid email address")
               } else {
                  Swal.fire("Oops!", "Something went wrong!", "error");
                  console.log(err)
               }
            })
      }

   }
   return (
      <form className="py-5">
         <label htmlFor="email" className='font-Poppins py-4'>Enter your registered email address. We will send you a link that will allow you to change your password via email.</label>
         <input type="email" ref={emailRef} name='email' required placeholder="example@gmail.com" className="input bg-white mt-4 w-full border border-black" />
         <p className='text-sm mt-2 text-red-600'>{err}</p>
         <button onClick={handleForgotPassword} className='btn bg-purple-950 w-full my-3'>Reset Password</button>
      </form>
   );
};

export default ForgetPass;