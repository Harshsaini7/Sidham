import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Img, Text } from "components";
import moaLogo from "../../assets/moa_logo.svg";
import fssai from "../../assets/fssai_logo.svg";
import isoLogo from "../../assets/iso_logo.svg";
import gmpLogo from "../../assets/gmp_logo.svg";
import tradeMarkLogo from "../../assets/tradeMarkLogo.svg";
import leaf1 from "../../assets/leaf1.svg";
import leaf2 from "../../assets/leaf2.svg";
import "./index.css";

const CertificationsSection = () => {
  const certifications = [
    { src: moaLogo, alt: "MOA Logo" },
    { src: fssai, alt: "FSSAI Logo" },
    { src: isoLogo, alt: "ISO Logo" },
    { src: gmpLogo, alt: "GMP Logo" },
    { src: tradeMarkLogo, alt: "Trademark Logo" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    arrows: false,
  };

  return (
    <div className="bg-black-900 flex flex-col items-center justify-center md:px-10 sm:px-5 px-[143px] py-[25px] w-full relative">
      <Img
        className="h-[125px] w-[125px] absolute top-0 left-0 sm-flex1001"
        src={leaf2}
        alt="Leaf 2"
      />
      <Img
        className="h-[125px] w-[125px] absolute top-0 right-0 sm-flex1001"
        src={leaf1}
        alt="Leaf 1"
      />
      <div className="flex flex-col gap-[30px] items-center justify-start mx-auto w-full">
        <Text
          className="text-center text-gray-53 text-3xl tracking-[-0.50px] w-full"
          size="txtRubikRegular20"
        >
          Our Certifications
        </Text>
        <div className="certifications-container">
          {/* Desktop view */}
          <div className="certifications-desktop">
            {certifications.map((cert, index) => (
              <Img
                key={index}
                className="h-[80px] w-[80px] object-contain"
                src={cert.src}
                alt={cert.alt}
              />
            ))}
          </div>
          {/* Mobile slider */}
          <div className="certifications-mobile">
            <Slider {...sliderSettings}>
              {certifications.map((cert, index) => (
                <div key={index} className="cert-slide">
                  <Img
                    className="h-[80px] w-[80px] object-contain mx-auto"
                    src={cert.src}
                    alt={cert.alt}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;

// CSS styles (you can add these to your global CSS or use a CSS-in-JS solution)
// const styles = `

// `;
