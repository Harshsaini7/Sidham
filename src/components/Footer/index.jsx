import React from "react";
import { Button, Img, Text } from "components";
import Logo from "../../assets/ecommercelogo.jpg"
import { useNavigate } from "react-router-dom";

const Footer = (props) => {
  const navigate = useNavigate();
  function handleNavigate3() {
    window.location.href = "https://twitter.com/login/";
  }
  function handleNavigate4() {
    window.location.href = "https://www.facebook.com/login/";
  }

  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col md:gap-10 gap-[50px] items-center justify-center w-full">
          <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <div className="flex flex-col gap-5 items-start justify-start w-[209px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20Gray53"
              >
                Quick Links
              </Text>
              <div className="flex flex-col gap-6 items-start justify-start w-auto">
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto cursor-pointer"
                  size="txtRubikRegular14Gray50a3"
                  onClick={() => navigate("/aboutus")}
                >
                  About Us
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto cursor-pointer" 
                  size="txtRubikRegular14Gray50a3"
                  onClick={() => navigate("/returnandrefund")}
                >
                  Return & Refund Policy
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto cursor-pointer"
                  size="txtRubikRegular14Gray50a3"
                  onClick={() => navigate("/tnc")}
                >
                  Terms & Conditions
                </Text>
                {/* <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  Latest News
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  Setting & Privacy
                </Text> */}
              </div>
            </div>
            
            <div className="flex flex-col gap-5 items-center justify-start w-auto">
              <div className="w-[250px] h-[175px] bg-white-A700 p-4 rounded flex items-center justify-center mb-4">
              <img
                src={Logo}
                alt="Logo"
                className="w-[250px] h-[100px] rounded "
              />
              </div>
              <Text
                className="md:text-3xl sm:text-[28px] text-[32px] text-gray-53 tracking-[-0.50px] w-auto"
                size="txtRalewayRomanBold32Gray53"
              >
                Sidham Pharmacy
              </Text>
              <Text
                className="leading-[35.00px] max-w-[360px] md:max-w-full text-base text-gray-50_a3 tracking-[-0.50px] text-center"
                size="txtRubikRegular16Gray50a3"
              >
                Sidham Pharmacy, established in 2019, has aimed to provide exceptional services for mind, body and soul.
              </Text>
            </div>
            
            <div className="flex flex-col gap-5 items-start justify-start w-[209px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20Gray53"
              >
                Contact Us
              </Text>
              <div className="flex flex-col gap-6 items-start justify-start w-auto">
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  Manufacturing unit - village phalsanda jattan, pin 136156, Distt- Kurukshetra, Haryana
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  Head office- h.no 4072, sec 32, Shusant city, Kurukshetra, Haryana
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  8570031091
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  9050546746
                </Text>
                <Text
                  className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Gray50a3"
                >
                  Sidhampharmacy@gmail.com
                </Text>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-5 items-center justify-start w-full">
            <Text
              className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
              size="txtRalewayRomanSemiBold20Gray53"
            >
              Follow Us
            </Text>
            <div className="flex flex-row gap-5 items-start justify-center w-auto">
              <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                <Img
                  className="h-6"
                  src="images/img_camera.svg"
                  alt="camera_One"
                />
              </Button>
              <Button
                className="common-pointer bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10"
                onClick={handleNavigate4}
              >
                <Img
                  className="h-6"
                  src="images/img_facebook.svg"
                  alt="facebook_One"
                />
              </Button>
              <Button
                className="common-pointer bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10"
                onClick={handleNavigate3}
              >
                <Img
                  className="h-6"
                  src="images/img_twitter.svg"
                  alt="twitter_One"
                />
              </Button>
              <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                <Img
                  className="h-6"
                  src="images/img_music.svg"
                  alt="music_One"
                />
              </Button>
            </div>
          </div>
          
          <div className="flex sm:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <Text
              className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
              size="txtRubikRomanRegular16"
            >
              © Copyright 2022. All Rights Reserved.
            </Text>
            <div className="flex flex-row gap-[41px] items-start justify-start w-[272px]">
              <Text
                className="flex-1 text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular16"
              >
                Terms of condition
              </Text>
              <Text
                className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular16"
              >
                Privacy Policy
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;