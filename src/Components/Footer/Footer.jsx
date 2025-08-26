import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
         <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* Services */}
            <div>
               <h6 className="text-lg font-semibold mb-4 uppercase tracking-wide text-white">Services</h6>
               <ul className="space-y-2">
                  <li><Link className="hover:text-violet-400 transition" to={''}>Branding</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Design</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Marketing</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Advertisement</Link></li>
               </ul>
            </div>

            {/* Company */}
            <div>
               <h6 className="text-lg font-semibold mb-4 uppercase tracking-wide text-white">Company</h6>
               <ul className="space-y-2">
                  <li><Link className="hover:text-violet-400 transition" to={""}>About Us</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={""}>Contact</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={""}>Jobs</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={""}>Press Kit</Link></li>
               </ul>
            </div>

            {/* Support */}
            <div>
               <h6 className="text-lg font-semibold mb-4 uppercase tracking-wide text-white">Support</h6>
               <ul className="space-y-2">
                  <li><Link className="hover:text-violet-400 transition" to={'/'}>Help Center</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Terms of Service</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Privacy Policy</Link></li>
                  <li><Link className="hover:text-violet-400 transition" to={''}>Refund Policy</Link></li>
               </ul>
            </div>

            {/* Social Media */}
            <div>
               <h6 className="text-lg font-semibold mb-4 uppercase tracking-wide text-white">Follow Us</h6>
               <div className="flex space-x-5">
                  <Link to={''} className="hover:text-violet-400 text-2xl transition"><FaFacebookF /></Link>
                  <Link to={''} className="hover:text-violet-400 text-2xl transition"><FaInstagram /></Link>
                  <Link to={''} className="hover:text-violet-400 text-2xl transition"><FaYoutube /></Link>
               </div>
            </div>

         </div>

         {/* Bottom Footer */}
         <div className="border-t border-gray-700 mt-10 pt-6 pb-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()}
            <Link to={'https://www.facebook.com/jahedulislam.jishan.9'} className="text-violet-300 hover:text-violet-400 transition font-medium"> Jahedulislamdev</Link>
            &nbsp;| All Rights Reserved.
         </div>
      </footer>
   );
};

export default Footer;
