import CartNavbar from 'components/CartNavbar';
import Footer from 'components/Footer';
import React, { useEffect } from 'react';

const ReturnAndRefund = () => {
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
        <h1 className="text-3xl font-bold mb-4">Return and Refund Policy</h1>

        <h2 className="text-xl font-semibold mt-4 mb-2">Return Policy</h2>
        <p className="text-gray-700 mb-4">
          For safety reasons, we are unable to accept returned medication once it has been opened.
          Our pharmacy is not able to use returned medication, which means that we cannot issue a refund 
          on any returned medication. If you do have unwanted medication from an order placed with our pharmacy, 
          please contact us and we can arrange for you to safely send the medication back to us for disposal.
        </p>
        <p className="text-gray-700 mb-4">
          If you believe that there has been an error made with your order, and the medication sent to you is incorrect, 
          please contact us upon receipt of the order. In the event of incorrect medication being sent to you, we will be 
          more than happy to work towards a resolution that suits you best.
        </p>
        <p className="text-gray-700 mb-4">
          However, if a customer placed an incorrect order by mistake and wants to return or refund it, 
          then the customer will be liable for the shipping and handling costs. Returns can take up to 
          5 to 7 working days to be processed during busy periods.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Refund Policy</h2>
        <p className="text-gray-700 mb-4">
          Once the package reaches our warehouse and passes all the necessary quality checks, we will issue a refund to you. 
          A refund confirmation e-mail will be sent to you once the refund is processed. Please note that it may take 3-5 business 
          days for the amount to reflect into your account.
        </p>
        <p className="text-gray-700 mb-4">
          For both canceled orders & returned products (due to incomplete sets, incorrect style, wrong sizes, or defective products delivered), 
          the refund amount will be credited back into the same account (Net banking, credit card, debit card) that was used to make the purchase.
        </p>
      </div>

      {/* Footer */}
      <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
    </>
  );
};

export default ReturnAndRefund;
