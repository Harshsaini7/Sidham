import React from "react";
import { Button, Img, Text } from "components";

const HomepageCardproduct = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="h-[400px] relative w-full">
          <Img
            className="absolute h-[400px] inset-0 justify-center m-auto object-cover w-full"
            alt="image"
            src={props?.productImage}
          />
          <Button className="absolute bg-bluegray-900 bottom-[4%] cursor-pointer font-rubik leading-normal left-[5%] py-2 text-center text-sm text-white-A700 tracking-[-0.50px] w-[106px]">
            {props?.category}
          </Button>
          <div className="absolute flex flex-col md:gap-10 gap-24 items-center justify-start right-[5%] top-[4%] w-auto">
            {!!props?.status ? (
              <Text
                className="bg-red-A200 justify-center px-2 text-sm text-white-A700 tracking-[-0.50px] w-auto"
                size="txtRubikRegular14WhiteA700"
              >
                {props?.status}
              </Text>
            ) : null}
            {!!props?.save ? (
              <Img className="h-[100px] w-10" alt="save" src={props?.save} />
            ) : null}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-full mt-4">
          <Text
            className="text-black-900 text-xl tracking-[-0.50px] w-auto"
            size="txtRalewaySemiBold20"
          >
            {props?.productName}
          </Text>
          <Text
            className="text-bluegray-900 text-lg tracking-[-0.50px] w-auto"
            size="txtRubikRegular18Bluegray900"
          >
            Rs {props?.price}
          </Text>
        </div>

        {/* Render Actions */}
        {props.renderActions && (
          <div className="mt-4">
            {props.renderActions()}
          </div>
        )}
      </div>
    </>
  );
};

HomepageCardproduct.defaultProps = {
  productImage: "images/img_image.png",
  category: "Living Room",
  productName: "Teak wood chair",
  price: "24",
};

export default HomepageCardproduct;
