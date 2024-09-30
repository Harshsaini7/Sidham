import CartNavbar from 'components/CartNavbar';
import Footer from 'components/Footer';
import React, { useEffect } from 'react';

const Tnc = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional for smooth scrolling
    });
  }, []); 
  return (
    <>
      {/* CartNavbar */}
      <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />

      {/* Content Section */}
      <div className="flex flex-col items-start justify-start md:px-10 sm:px-5 px-[75px] py-[50px] w-full">
        <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>

        <p className="text-gray-700 mb-4">
          Please read these terms of use carefully. By accessing or using this internet-based platform, you agree to be bound by the terms described herein and all terms incorporated by reference. If you do not agree to all of these terms, do not use this internet-based platform.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">About GANPATI HERBAL AYURVEDA (SIDHAM PHARMACY)</h2>
        <p className="text-gray-700 mb-4">
          The domain name www.sidham.in, an internet-based portal, is operated by M/S GANPATI HERBAL AYURVEDA (formerly known as SIDHAM PHARMACY), having a registered office at PHALSANDA JATTAN, DISTT. KURUKSHETRA, HARYANA with GSTIN 06BWYPD0859B1ZH. The domain name and the mobile application are collectively referred to as the “Website”.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Use of Content</h2>
        <p className="text-gray-700 mb-4">
          All logos, brands, marks, headings, names, signatures, or any combinations thereof, appearing on this site, except as otherwise noted, are properties either owned or used under license by the business and/or its associate entities. The use of these properties, except as provided in these terms, is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Acceptable Website Use</h2>
        <h3 className="text-lg font-medium mt-4">Security Rules</h3>
        <p className="text-gray-700 mb-4">
          Visitors are prohibited from violating or attempting to violate the security of the website, including accessing data not intended for such user, probing or testing system vulnerabilities, or interfering with the service.
        </p>

        <h3 className="text-lg font-medium mt-4">General Rules</h3>
        <p className="text-gray-700 mb-4">
          Visitors may not use the website to transmit or store any content that could encourage criminal offense, violate laws, or infringe intellectual property rights.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Account Creation</h2>
        <p className="text-gray-700 mb-4">
          Certain operations like ordering products require setting up an account. You represent and warrant that the information provided during registration is accurate. Your account is personal and non-transferable.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We take utmost care to handle your information responsibly. We do not share your information with anyone other than our business partners necessary to fulfill the service.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Customer Complaint</h2>
        <p className="text-gray-700 mb-4">
          Customer complaints lodged will be addressed via return emails with tracking details and status updates.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Payment Security Policy</h2>
        <p className="text-gray-700 mb-4">
          All transactions are encrypted for privacy and security.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Pricing</h2>
        <p className="text-gray-700 mb-4">
          All products will be sold at MRP unless specified otherwise. M/S GANPATI HERBAL AYURVEDA reserves the right to change prices without notice.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Termination</h2>
        <p className="text-gray-700 mb-4">
          This User Agreement is valid until terminated by you or M/S GANPATI HERBAL AYURVEDA. You may terminate by deleting your account. M/S GANPATI HERBAL AYURVEDA reserves the right to terminate this agreement without notice.
        </p>
      </div>

      {/* Footer */}
      <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
    </>
  );
};

export default Tnc;
