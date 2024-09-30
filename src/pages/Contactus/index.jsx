import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

import { Button, Img, Input, Line, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import Footer from "components/Footer";
import Header from "components/Header";
import CartNavbar from "components/CartNavbar";
import ShopPageImage from "../../assets/shop page photo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserDetails } from "services/operations/profileAPI";
import SummaryApi from "common";
const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const ContactusPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hue huhe hue" , message);
    if (!token) {
      toast.error("Please Login");
    }

    

    try {
      const response = await fetch(SummaryApi.uploadContactUs.url, {
        method: SummaryApi.uploadContactUs.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          comment: message,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add review");
      }
      toast.success("Message Sent Successfully");
      setMessage("");
    } catch (error) {
      toast.error("Failed To Send Message");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user && token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, [user]);

  const faqData = [
    {
      question: "How can I make refund from your website?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id a enim, consectetur cursus. At mattis nulla in pretium. Condimentum sagittis mauris augue maecenas fusce commodo neque purus et. Integer eu amet at pretium id ultrices faucibus. In vestibulum pretium, potenti molestie."
    },
    {
      question: "How to buy a product?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id a enim, consectetur cursus. At mattis nulla in pretium. Condimentum sagittis mauris augue maecenas fusce commodo neque purus et. Integer eu amet at pretium id ultrices faucibus. In vestibulum pretium, potenti molestie."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id a enim, consectetur cursus. At mattis nulla in pretium. Condimentum sagittis mauris augue maecenas fusce commodo neque purus et. Integer eu amet at pretium id ultrices faucibus. In vestibulum pretium, potenti molestie."
    },
    {
      question: "Kya haal hai aryan bhai?",
      answer: " Badhiya hai , bas chal raha hai"
    }
  ];

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[75px] items-start justify-start w-full">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
          <div className="flex flex-col font-poppins items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
            <div className="flex flex-col items-start justify-start max-w-[1291px] mx-auto w-full">
              <div className="h-[450px] relative w-full">
                <img
                  className="h-[450px] m-auto object-cover w-full"
                  src={ShopPageImage}
                  alt="rectangleTwentyEight"
                />
                <div className="absolute flex flex-col gap-[30px] h-max inset-y-[0] items-start justify-start left-[5%] my-auto w-auto">
                  <div className="flex flex-col gap-4 items-start justify-start w-full">
                    <Text
                      className="text-lg text-yellow-100 tracking-[-0.50px]"
                      size="txtRubikSemiBold18Yellow100"
                    >
                      Best Medicine Items
                    </Text>
                    <Text
                      className="leading-[60px] max-w-[465px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-white tracking-[-0.50px]"
                      size="txtRalewayRomanBold36"
                    >
                      Our medicine have the best quality and suggested by expert
                      doctors
                    </Text>
                  </div>
                  <Button
                    className="bg-yellow-100 cursor-pointer font-bold min-w-[170px] py-[15px] text-bluegray-900 text-xl tracking-[-0.50px]"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-raleway items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex md:flex-col flex-row md:gap-10 gap-[71px] items-start justify-start max-w-[1291px] mx-auto w-full">
            <div className="flex flex-1 flex-col items-start justify-start w-full">
            <div className="flex flex-col gap-11 items-start justify-start w-full">
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-black-900 tracking-[-0.50px] w-full"
                size="txtRalewayRomanBold32Black900"
              >
                Frequently asked questions
              </Text>
              <Accordion
                allowZeroExpanded
                className="flex flex-col gap-[30px] w-full"
              >
                {faqData.map((item, index) => (
                  <AccordionItem key={index}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="flex justify-between items-center w-full">
                        <Text
                          className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                          size="txtRalewayRomanRegular24"
                        >
                          {item.question}
                        </Text>
                        <Img
                          className="h-6 w-6"
                          src="images/img_plus_bluegray_902.svg"
                          alt="plus"
                        />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Text
                        className="leading-[35.00px] text-gray-500 text-sm tracking-[-0.50px]"
                        size="txtRubikRegular14"
                      >
                        {item.answer}
                      </Text>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          
            </div>
            <div className="flex flex-1 flex-col gap-6 items-center justify-start w-full">
              <Text
                className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                size="txtRalewayBold24"
              >
                Contact Us
              </Text>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 items-start justify-start w-full"
              >
                <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                  <div className="flex md:flex-col flex-row gap-4 items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanSemiBold18"
                      >
                        Your Name
                      </Text>
                      <input
                        name="name"
                        placeholder="Your name"
                        className="font-rubik p-3 placeholder:text-gray-500 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 rounded-md h-12"
                        wrapClassName="border border-bluegray-100 border-solid pl-[18px] pr-[35px] py-5 w-full"
                        type="text"
                        value={user?.name || ""}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanSemiBold18"
                      >
                        Your Email
                      </Text>
                      <input
                        name="email"
                        placeholder="Your email"
                        className="font-rubik p-3 placeholder:text-gray-500 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 rounded-md h-12"
                        wrapClassName="border border-bluegray-100 border-solid pl-[18px] pr-[35px] py-5 w-full"
                        type="email"
                        value={user?.email || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[17px] items-start justify-start w-full">
                    <Text
                      className="text-black-900 text-lg tracking-[-0.50px] w-full"
                      size="txtRalewayRomanSemiBold18"
                    >
                      Your Comment
                    </Text>
                    <textarea
                      className="border border-bluegray-100 border-solid flex flex-col font-rubik h-[218px] md:h-auto items-start justify-start p-4 w-full"
                      placeholder="Write your comment here...."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col font-poppins items-start justify-start w-full">
                  <Button
                    type="submit"
                    className="bg-bluegray-900 border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[140px] py-[13px] text-base text-center text-white-A700 tracking-[-0.50px]"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1291px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default ContactusPage;
