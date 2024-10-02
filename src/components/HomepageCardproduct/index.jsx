import React, { useEffect } from "react";
import { Button, Img, Text } from "components";

const HomepageCardproduct = (props) => {
  useEffect(() => {
    console.log("props", props);
  });
  return (
    <div className={`${props.className} px-2 sm:px-1`}>
      {/* <div className="relative w-full"> */}
        {/* Enforcing uniform aspect ratio */}
        <div className="relative w-full aspect-w-1">
    <div className="aspect-h-1">
      {/* The image will now cover the container with uniform aspect ratio */}
      <Img
        src={props?.productImage[0] || "images/img_image.png"}
        alt={props?.productName}
        className="object-cover"
      />
    </div>
  {/* </div> */}
        <Button className="absolute bottom-2 left-2 bg-bluegray-900 cursor-pointer font-rubik text-xs sm:text-xxs leading-normal py-1 px-2 text-center text-white-A700 tracking-[-0.25px]">
          {props?.category}
        </Button>
        <div className="absolute flex flex-col gap-2 items-end justify-start right-2 top-2">
          {!!props?.status && (
            <Text
              className="bg-red-A200 justify-center px-2 py-1 text-xs sm:text-xxs text-white-A700 tracking-[-0.25px]"
              size="txtRubikRegular14WhiteA700"
            >
              {props?.status}
            </Text>
          )}
          {!!props?.save && (
            <Img
              className="h-8 w-8 sm:h-6 sm:w-6"
              alt="save"
              src={props?.save}
            />
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-2">
        <Text
          className="text-black-900 text-sm sm:text-xs tracking-[-0.25px] w-auto"
          size="txtRalewaySemiBold20"
        >
          {props?.productName}
        </Text>
        <Text
          className="text-bluegray-900 text-sm sm:text-xs tracking-[-0.25px] w-auto"
          size="txtRubikRegular18Bluegray900"
        >
          Rs {props?.price}
        </Text>
      </div>

      {props.renderActions && (
        <div className="mt-2">{props.renderActions()}</div>
      )}
    </div>
  );
};

HomepageCardproduct.defaultProps = {
  productImage: "images/img_image.png",
  category: "Living Room",
  productName: "Teak wood chair",
  price: "24",
};

export default HomepageCardproduct;
