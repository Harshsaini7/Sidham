import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./index.css";
import { toast } from 'react-toastify';
import { Img, List } from "components";
import { Button, PagerIndicator, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import HomepageCardblog from "components/HomepageCardblog";
import HomepageCardproduct from "components/HomepageCardproduct";
import SummaryApi from "common";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "helpers/addToCart";
import { setProduct } from "slices/productSlice";
import HomepageTopPhoto from "../../assets/Homepage Top photo.svg";
import CategoryGrid from "components/CategoryGrid";
import Safety from "../../assets/We guarantee the safety of your shopping.png";
import fssai from "../../assets/fssai_logo.svg";
import moaLogo from "../../assets/moa_logo.svg";
import isoLogo from "../../assets/iso_logo.svg";
import gmpLogo from "../../assets/gmp_logo.svg";
import tradeMarkLogo from "../../assets/tradeMarkLogo.svg";
import Footer from "components/Footer";
import leaf1 from "../../assets/leaf1.svg";
import leaf2 from "../../assets/leaf2.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CertificationsSection from "components/OurCertification";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const HomepagePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2 || sliderSettings.slidesToShow,
          slidesToScroll: 1 || sliderSettings.slidesToScroll,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1 || sliderSettings.slidesToShow,
          slidesToScroll: 1 || sliderSettings.slidesToScroll,
          arrows: true,
        },
      },
    ],
  };
  const homepageCardproductPropList = [
    { save: "images/img_save.svg" },
    { image: "images/img_image_7.png" },
    { image: "images/img_image_8.png" },
    { image: "images/img_image_9.png" },
    { image: "images/img_image_10.png" },
    { image: "images/img_image_11.png" },
    { image: "images/img_image_12.png" },
    { image: "images/img_image_13.png" },
  ];
  const homepageCardblogPropList = [
    {},
    { rectangleeighteen: "images/img_rectangle18_400x416.png" },
    { rectangleeighteen: "images/img_rectangle18_1.png" },
  ];

  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
    dispatch(setProduct(dataResponse?.data || []));
    // console.log(product);
  };

  const [allBlog, setAllBlog] = useState([]);

  const fetchAllBlog = async () => {
    const response = await fetch(SummaryApi.allBlog.url);
    const dataResponse = await response.json();
    setAllBlog(dataResponse?.data || []);
    console.log(dataResponse?.data || []);
  };

  const handleAddToCart = async (e, id, quantity) => {
    const res = await AddToCart(e, id, quantity, token, dispatch);
    //    console.log(res);
    //    fetchUserAddToCart()
  };

  useEffect(() => {
    fetchAllProduct();
    fetchAllBlog();
  }, []);

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full overflow-x-hidden">
        <div className="flex flex-col items-start justify-start w-full">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
          <div className="bg-orange-50 flex flex-col items-start justify-start md:px-10 sm:px-5 px-[75px] py-20 w-full">
            <div className="flex md:flex-col flex-row md:gap-10 gap-[60px] items-center justify-start max-w-[1290px] mx-auto w-full">
              <div className="flex flex-1 flex-col gap-[30px] items-start justify-start w-full">
                <div className="flex flex-col gap-[26px] items-start justify-start w-full">
                  <Text
                    className="text-black-900 text-xl tracking-[-0.50px] w-full"
                    size="txtRubikRomanRegular20"
                  >
                    Health Needs
                  </Text>
                  <Text
                    className="leading-[60.00px] max-w-[615px] md:max-w-full sm:text-4xl md:text-[38px] text-[40px] text-black-900 tracking-[-0.50px]"
                    size="txtPollerOneRegular40"
                  >
                    <span className="text-black-900 font-raleway text-left font-bold">
                      Various{" "}
                    </span>
                    <span className="text-bluegray-900 font-raleway text-left font-bold">
                      new collections
                    </span>
                    <span className="text-black-900 font-raleway text-left font-bold">
                      {" "}
                      of medicine to keep you healthy
                    </span>
                  </Text>
                </div>
                <Button
                  className="common-pointer bg-bluegray-900 border-[3px] border-colors border-solid cursor-pointer font-medium leading-[normal] min-w-[218px] py-[18px] rounded-[50px] text-center text-xl text-yellow-100 tracking-[-0.50px]"
                  onClick={() => navigate("/shop")}
                >
                  Shop Now
                </Button>
              </div>
              <img
                className="flex-1 md:flex-none h-[566px] sm:h-auto max-h-[566px] object-cover sm:w-[] md:w-[]"
                src={HomepageTopPhoto}
                alt="nathanoakleyo"
              />
            </div>
          </div>
        </div>
        <div className="bg-black-900 flex flex-col items-center justify-center md:px-10 sm:px-5 px-[143px] py-[25px] w-full relative">
          <Img
            className="h-[125px] w-[125px] absolute top-0 left-0 hidden sm-flex1000"
            src={leaf2}
            alt="Leaf 2"
          />
          <Img
            className="h-[125px] w-[125px] absolute top-0 right-0 hidden sm-flex1000"
            src={leaf1}
            alt="Leaf 1"
          />
          <div className="flex flex-col gap-[46px] items-center justify-start mx-auto w-full">
            {/* <Text
              className="text-center text-gray-53 text-4xl tracking-[-0.50px] w-full"
              size="txtRubikRegular20"
            >
              Our Certifications
            </Text> */}
            {/* <div className="flex flex-wrap justify-center items-center w-full gap-8">
              <Img
                className="h-[125px] w-[125px] object-contain"
                src={moaLogo}
                alt="MOA Logo"
              />
              <Img
                className="h-[125px] w-[125px] object-contain"
                src={fssai}
                alt="FSSAI Logo"
              />
              <Img
                className="h-[125px] w-[125px] object-contain"
                src={isoLogo}
                alt="ISO Logo"
              />
              <Img
                className="h-[125px] w-[125px] object-contain"
                src={gmpLogo}
                alt="GMP Logo"
              />
              <Img
                className="h-[125px] w-[125px] object-contain "
                src={tradeMarkLogo}
                alt="Trademark Logo"
              />
            </div> */}
            <CertificationsSection />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[75px] w-full">
          {/* <List
            className="sm:flex-col flex-row gap-5 grid md:grid-cols-1 grid-cols-2 justify-center max-w-[1290px] mx-auto w-full"
            orientation="horizontal"
          >
            <div className="bg-gradient  flex flex-1 flex-col items-start justify-start sm:px-5 px-[30px] py-6 w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 gap-[76px] items-center justify-start w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                    <Text
                      className="text-gray-53 text-lg tracking-[-0.50px] w-full"
                      size="txtRubikRegular18Gray53"
                    >
                      Living Room
                    </Text>
                    <Text
                      className="md:max-w-full max-w-xs text-4xl sm:text-[32px] md:text-[34px] text-gray-53 tracking-[-0.50px]"
                      size="txtRalewayBold36"
                    >
                      The best foam padded chair
                    </Text>
                  </div>
                  <Button
                    className="common-pointer border-2 border-gray-50 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[15px] text-base text-center text-gray-50 tracking-[-0.50px]"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </Button>
                </div>
                <Img
                  className="h-[301px] md:h-auto max-h-[301px] object-cover sm:w-[]"
                  src="images/img_sammoghadamkh.png"
                  alt="sammoghadamkh"
                />
              </div>
            </div>
            <div className="bg-gradient  flex flex-1 flex-col items-center justify-center sm:px-5 px-[30px] py-6 w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 gap-[79px] h-[301px] md:h-auto items-center justify-start w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                    <Text
                      className="text-gray-53 text-lg tracking-[-0.50px] w-full"
                      size="txtRubikRegular18Gray53"
                    >
                      Living Room
                    </Text>
                    <Text
                      className="max-w-[306px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-gray-53 tracking-[-0.50px]"
                      size="txtRalewayBold36"
                    >
                      Latest model chandelier
                    </Text>
                  </div>
                  <Button
                    className="common-pointer border-2 border-gray-50 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[15px] text-base text-center text-gray-50 tracking-[-0.50px]"
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </Button>
                </div>
                <Img
                  className="h-[244px] md:h-auto max-h-[244px] object-cover sm:w-[]"
                  src="images/img_phildesforges.png"
                  alt="phildesforges"
                />
              </div>
            </div>
          </List> */}
          <CategoryGrid />
        </div>
        <div className="flex flex-col items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[46px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewayBold40"
              >
                <span className="text-black-900 font-raleway font-bold">
                  Our{" "}
                </span>
                <span className="text-black-900 font-raleway font-bold">
                  Newest
                </span>
                <span className="text-black-900 font-raleway font-bold">
                  {" "}
                  Product
                </span>
              </Text>
              <Text
                className="text-center text-gray-500 text-lg tracking-[-0.50px] w-full"
                size="txtRubikRegular18Gray500"
              >
                Made of the best materials and with a design that follows the
                times
              </Text>
            </div>
            <div className="w-full">
              <Slider {...sliderSettings}>
                {allProduct.slice(0, 8).map((product, index) => (
                  <div key={index} className="px-2">
                    <HomepageCardproduct
                      className="flex flex-col gap-4 items-start justify-start w-full"
                      {...product}
                      renderActions={() => (
                        <div className="flex flex-row justify-center w-full">
                          <Button
                            className="common-pointer bg-bluegray-900 cursor-pointer font-bold leading-[normal] min-w-[107px] py-[11px] rounded-[21px] text-center text-sm text-yellow-100 tracking-[-0.50px] mx-auto"
                            onClick={(e) => handleAddToCart(e, product._id, 1)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="h-[535px] md:h-[892px] md:px-5 relative w-full">
          <div className="absolute bg-yellow-100 bottom-[0] h-[440px] inset-x-[0] mx-auto w-full"></div>
          <div className="absolute flex md:flex-col flex-row md:gap-10 h-full inset-y-[0] items-center justify-between max-w-[1365px] my-auto right-[0] w-full">
            <div className="flex sm:flex-1 flex-col gap-[30px] items-start justify-start w-[525px] sm:w-full ">
              <div className="flex flex-col gap-[18px] items-start justify-start w-full mx-[60px]">
                <Text
                  className="text-2xl md:text-[22px] text-bluegray-900 sm:text-xl tracking-[-0.50px] w-full"
                  size="txtRubikRegular24"
                >
                  Free Checkup
                </Text>
                <Text
                  className="leading-[60.00px] max-w-[525px] md:max-w-full sm:text-4xl md:text-[38px] text-[40px] text-black-900 tracking-[-0.50px]"
                  size="txtRalewayRomanBold40"
                >
                  Need consultaion from our expert doctors?
                </Text>
              </div>
              <Button
                className="common-pointer border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[218px] py-[18px] text-bluegray-900 text-center text-xl tracking-[-0.50px] mx-[60px]"
                onClick={() => navigate("/contactus")}
              >
                Contact Us
              </Button>
            </div>
            <Img
              className="sm:flex-1 h-[535px] md:h-auto object-cover w-[535px] sm:w-full "
              src="assets\images\images\need consultation.png"
              alt="insideweather"
            />
          </div>
        </div>

        {/* <div className="flex flex-col font-raleway items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col md:gap-10 gap-[67px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-bluegray-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayRomanBold32"
            >
              New Arrival
            </Text>
            <div className="flex flex-col font-rubik items-start justify-start w-full">
              <div className="md:gap-5 gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
                {homepageCardproductPropList.map((props, index) => (
                  <React.Fragment key={`HomepageCardproduct${index}`}>
                    <HomepageCardproduct
                      className="flex flex-1 flex-col gap-4 items-start justify-start w-full"
                      status="New"
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col font-raleway items-center justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex md:flex-col flex-row md:gap-10 gap-[85px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-1 flex-col gap-[50px] h-full items-start justify-start w-full">
              <Text
                className="leading-[60.00px] max-w-[602px] md:max-w-full sm:text-4xl md:text-[38px] text-[40px] text-black-900 tracking-[-0.50px]"
                size="txtRalewayRomanBold40"
              >
                We guarantee the safety of your shopping
              </Text>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="sm:gap-5 gap-[50px] grid sm:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                  <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
                    <Img
                      className="h-[60px] w-[63px]"
                      src="images/img_volume.svg"
                      alt="volume"
                    />
                    <div className="flex flex-col gap-3 items-start justify-start w-[276px]">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewaySemiBold20"
                      >
                        Fast Shipping
                      </Text>
                      <Text
                        className="leading-[25.00px] max-w-[276px] md:max-w-full text-gray-500 text-sm tracking-[-0.50px]"
                        size="txtRubikRegular14"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has{" "}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
                    <Img
                      className="h-[60px] w-[63px]"
                      src="images/img_lock.svg"
                      alt="lock"
                    />
                    <div className="flex flex-col gap-3 items-start justify-start w-[276px]">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewaySemiBold20"
                      >
                        Safe Delivery
                      </Text>
                      <Text
                        className="leading-[25.00px] max-w-[276px] md:max-w-full text-gray-500 text-sm tracking-[-0.50px]"
                        size="txtRubikRegular14"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has{" "}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
                    <Img
                      className="h-[60px] w-[63px]"
                      src="images/img_clock.svg"
                      alt="clock"
                    />
                    <div className="flex flex-col gap-3 items-start justify-start w-[276px]">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewaySemiBold20"
                      >
                        365 Days Return
                      </Text>
                      <Text
                        className="leading-[25.00px] max-w-[276px] md:max-w-full text-gray-500 text-sm tracking-[-0.50px]"
                        size="txtRubikRegular14"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has{" "}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
                    <Img
                      className="h-[60px] w-[63px]"
                      src="images/img_call.svg"
                      alt="call"
                    />
                    <div className="flex flex-col gap-3 items-start justify-start w-[276px]">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewaySemiBold20"
                      >
                        24 hours CS
                      </Text>
                      <Text
                        className="leading-[25.00px] max-w-[276px] md:max-w-full text-gray-500 text-sm tracking-[-0.50px]"
                        size="txtRubikRegular14"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry Lorem Ipsum has{" "}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Img
              className="flex-1 md:flex-none md:h-[640px] sm:h-auto h-full max-h-[640px] object-cover sm:w-[] md:w-[]"
              src={Safety}
              alt="rectangleSixteen"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewaySemiBold40"
              >
                Read Our Latest Blog
              </Text>
              <Text
                className="text-center text-gray-500 text-lg tracking-[-0.50px] w-full"
                size="txtRubikRegular18Gray500"
              >
                We write various things related to furniture, from tips and what
                things I need to pay attention to when choosing furniture
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
              orientation="horizontal"
            >
              {allBlog.map((props, index) => (
                <React.Fragment key={`HomepageCardblog${index}`}>
                  <HomepageCardblog
                    className="flex flex-1 flex-col gap-2 items-start justify-start w-full"
                    {...props}
                  />
                </React.Fragment>
              ))}
            </List>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1290px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default HomepagePage;
