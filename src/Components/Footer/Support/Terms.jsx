import React from 'react';

const Terms = () => {
   return (
      <div className="p-6 bg-gray-100 text-gray-800">
         <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
         <p className="mb-6">
            Welcome to our Terms and Conditions page. Please read these terms carefully before using our services.
         </p>
         <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
               These terms govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms.
            </p>
         </section>
         <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
            <p>
               You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>
         </section>
         <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Prohibited Activities</h2>
            <p>
               You agree not to engage in any activities that may harm the platform, other users, or violate any applicable laws.
            </p>
         </section>
         <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Changes to Terms</h2>
            <p>
               We reserve the right to modify these terms at any time. Please review this page periodically for updates.
            </p>
         </section>
         <footer className="mt-6 border-t pt-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} E-commerce React. All rights reserved.</p>
         </footer>
      </div>
   );
};

export default Terms;