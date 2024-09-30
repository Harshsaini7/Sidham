import React, { useEffect } from "react";

import { Button, Img, Line, Text } from "components";
import { useNavigate } from "react-router-dom";

const HomepageCardblog = (props) => {
  useEffect(() => {
    console.log("props", props);
  },[])
  const navigate = useNavigate();
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-6 items-start justify-start w-full">
          <img
            className="h-[400px] sm:h-auto object-cover w-full"
            alt="rectangleEighteen"
            src={props?.blogImage[0]}
          />
          <div className="flex flex-col gap-[19px] items-start justify-start w-full">
            <Text
              className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
              size="txtRalewayBold24"
            >
              {props?.title}
            </Text>
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex flex-row gap-[17px] items-center justify-start w-[416px] md:w-full">
                <div className="flex flex-row gap-[5px] items-center justify-start w-auto">
                  <Img
                    className="h-[18px] w-[18px]"
                    src="images/img_edit.svg"
                    alt="edit"
                  />
                  <Text
                    className="text-black-900 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Black900"
                  >
                    {props?.byadmin}
                  </Text>
                </div>
                <Line className="bg-gray-500 h-[15px] w-px" />
                <div className="flex flex-row gap-[5px] items-center justify-start w-auto">
                  <Img
                    className="h-[18px] w-[18px]"
                    src="images/img_calendar.svg"
                    alt="calendar"
                  />
                  <Text
                    className="text-black-900 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Black900"
                  >
                    {props?.december102022}
                  </Text>
                </div>
              </div>
            </div>
            <Text
              className="leading-[35.00px] max-w-[416px] md:max-w-full text-gray-500 text-sm tracking-[-0.50px]"
              size="txtRubikRegular14"
            >
              {props?.description}
            </Text>
            <Button className="border border-black-900 border-solid cursor-pointer font-rubik font-semibold leading-[normal] min-w-[139px] py-[11px] text-black-900 text-center text-lg tracking-[-0.50px]"
              onClick={() => {
                sessionStorage.setItem("blogId", props?._id);
                navigate(`/blogdetail`);
              }}
            >
              {props?.readMore}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

HomepageCardblog.defaultProps = {
  rectangleeighteen: "images/img_rectangle18.png",
  whyshouldyouchoOne: "Why should you choose good wood",
  byadmin: "By Admin",
  december102022: "December 10, 2022",
  description: (
    <>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&#39;s standard dummy text ever.
    </>
  ),
  readMore: "Read More",
};

export default HomepageCardblog;


