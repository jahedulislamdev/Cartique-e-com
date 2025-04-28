import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <footer className="bg-base-200 text-base-content mt-16">
         <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Services */}
            <div>
               <h6 className="footer-title text-lg font-semibold mb-4">Services</h6>
               <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline" to={''}>Branding</Link></li>
                  <li><Link className="hover:underline" to={''}>Design</Link></li>
                  <li><Link className="hover:underline" to={''}>Marketing</Link></li>
                  <li><Link className="hover:underline" to={''}>Advertisement</Link></li>
               </ul>
            </div>

            {/* Company */}
            <div>
               <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
               <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline" to={""}>About us</Link></li>
                  <li><Link className="hover:underline" to={""}>Contact</Link></li>
                  <li><Link className="hover:underline" to={""}>Jobs</Link></li>
                  <li><Link className="hover:underline" to={""}>Press kit</Link></li>
               </ul>
            </div>

            {/* Support */}
            <div>
               <h6 className="footer-title text-lg font-semibold mb-4">Support</h6>
               <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline" to={'/'}>Help Center</Link></li>
                  <li><Link className="hover:underline" to={''}>Terms of Service</Link></li>
                  <li><Link className="hover:underline" to={''}>Privacy Policy</Link></li>
                  <li><Link className="hover:underline" to={''}>Refund Policy</Link></li>
               </ul>
            </div>

            {/* Social Media */}
            <div>
               <h6 className="footer-title text-lg font-semibold mb-4">Follow Us</h6>
               <div className="flex space-x-4">
                  <Link to={''} className="hover:text-primary text-2xl"><FaFacebookF /></Link>
                  <Link to={''} className="hover:text-primary text-2xl"><FaInstagram /></Link>
                  <Link to={''} className="hover:text-primary text-2xl"><FaYoutube /></Link>
               </div>
            </div>

         </div>

         {/* Bottom Footer */}
         <div className="border-t mt-10 pt-6 pb-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} <Link to={''} className='text-violet-200'> Jahedulislamdev</Link> All rights reserved.
         </div>
      </footer>

   );
};

export default Footer;