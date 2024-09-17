import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Img, Input, Line, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";

const unitedStatesUsOptionsList = [
  { label: "India", value: "india" },
  { label: "United States (US)", value: "us" },
  { label: "United Kingdom (UK)", value: "uk" },
];

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + item.productId.sellingPrice * item.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart]);

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
        <div className="flex flex-col font-raleway items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayBold40"
            >
              Checkout
            </Text>
            <div className="flex md:flex-col flex-row gap-[19px] items-start justify-center w-full">
              <div className="flex flex-1 flex-col gap-[53px] items-start justify-start w-full">
                <div className="flex flex-col gap-9 items-start justify-start w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    Contact Information
                  </Text>
                  <div className="flex flex-col gap-[35px] items-start justify-start w-full">
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          First Name
                        </Text>
                        <Input
                          name="firstName"
                          placeholder="Your first name here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                          value={user.name.split(" ")[0]}
                        ></Input>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Last Name
                        </Text>
                        <Input
                          name="lastName"
                          placeholder="Your last name here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                          value={user.name.split(" ")[1] || ""}
                        ></Input>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Phone
                        </Text>
                        <Input
                          name="phone"
                          placeholder="Your phone here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="number"
                          value={user.additionalDetails.contactNumber}
                        ></Input>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Email
                        </Text>
                        <Input
                          name="email"
                          placeholder="Your email here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="email"
                          value={user.email}
                        ></Input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[30px] items-start justify-start w-full">
                  <div className="flex flex-col gap-9 items-start justify-start w-full">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                      size="txtRalewayBold24"
                    >
                      Shipping Method
                    </Text>
                    <div className="flex flex-row font-rubik gap-[21px] items-start justify-start w-full">
                      <Button
                        className="border border-bluegray-100 border-solid cursor-pointer flex items-center justify-center min-w-[154px] px-[29px] py-[15px]"
                        leftIcon={
                          <div className="h-10 mr-2.5 w-10 bg-gray-201 p-2 rounded-[50%] flex justify-center items-center">
                            <Img
                              className="h-6"
                              src="images/img_computer.svg"
                              alt="computer"
                            />
                          </div>
                        }
                      >
                        <div className="leading-[normal] sm:px-5 text-gray-500 text-left text-lg tracking-[-0.50px]">
                          Store
                        </div>
                      </Button>
                      <Button
                        className="bg-gray-100 border border-bluegray-900 border-solid cursor-pointer flex items-center justify-center min-w-[175px] px-[29px] py-[15px]"
                        leftIcon={
                          <div className="h-10 mr-2.5 w-10 bg-bluegray-900 p-2 rounded-[50%] flex justify-center items-center">
                            <Img
                              className="h-6"
                              src="images/img_airplane.svg"
                              alt="airplane"
                            />
                          </div>
                        }
                      >
                        <div className="leading-[normal] sm:px-5 text-black-900 text-left text-lg tracking-[-0.50px]">
                          Delivery
                        </div>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-start justify-start w-full">
                    <Text
                      className="text-black-900 text-xl tracking-[-0.50px] w-full"
                      size="txtRalewayRomanRegular20Black900"
                    >
                      Country / Region{" "}
                    </Text>
                    <SelectBox
                      className="border border-bluegray-100 border-solid font-rubik leading-[normal] sm:px-5 px-[25px] py-[18px] text-gray-500 text-left text-sm tracking-[-0.50px] w-full"
                      placeholderClassName="text-gray-500"
                      indicator={
                        <Img
                          className="h-6 w-6"
                          src="images/img_arrowdown_black_900.svg"
                          alt="arrow_down"
                        />
                      }
                      isMulti={false}
                      name="country"
                      options={unitedStatesUsOptionsList}
                      isSearchable={false}
                      placeholder={user.additionalDetails.country}
                    />
                  </div>
                  <div className="flex flex-col gap-3 items-start justify-start w-full">
                    <Text
                      className="text-black-900 text-xl tracking-[-0.50px] w-full"
                      size="txtRalewayRomanRegular20Black900"
                    >
                      Street address{" "}
                    </Text>
                    <textarea
                      className="border border-bluegray-100 border-solid flex flex-col font-rubik h-[150px] md:h-auto items-start justify-start sm:px-5 px-[22px] py-[19px] w-full resize-none"
                      placeholder="Write your full address"
                      value={`${user.additionalDetails.address1}, ${user.additionalDetails.address2}, ${user.additionalDetails.city}, ${user.additionalDetails.state}, ${user.additionalDetails.pincode}`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-9 items-start justify-start w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    Payment Method
                  </Text>
                  <div className="flex sm:flex-col flex-row gap-5 items-start justify-start w-auto sm:w-full">
                    <div className="border border-bluegray-100 border-solid flex flex-col h-[73px] md:h-auto items-center justify-center p-[25px] sm:px-5 w-[155px]">
                      <Img
                        className="h-[19px] md:h-auto object-cover w-[60px] sm:w-full"
                        src="images/img_visa.png"
                        alt="visa"
                      />
                    </div>
                    <div className="border border-bluegray-100 border-solid flex flex-col h-[73px] md:h-auto items-center justify-center p-[25px] sm:px-5 w-[155px]">
                      <Img
                        className="h-[23px] w-[60px]"
                        src="images/img_signal.svg"
                        alt="signal"
                      />
                    </div>
                    <div className="border border-bluegray-100 border-solid flex flex-col h-[73px] md:h-auto items-center justify-center p-[25px] sm:px-5 w-[155px]">
                      <Img
                        className="h-[19px] w-20"
                        src="images/img_refresh.svg"
                        alt="refresh"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-53 flex sm:flex-1 flex-col items-start justify-start sm:px-5 px-[27px] py-[34px] w-[416px] sm:w-full">
                <div className="flex flex-col gap-[30px] items-start justify-start w-full">
                  <Text
                    className="text-black-900 text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayRomanBold20"
                  >
                    Your Order
                  </Text>
                  <div className="flex flex-col font-rubik gap-[25px] items-start justify-start w-full">
                    <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-row items-center justify-between w-full"
                        >
                          <Text
                            className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                            size="txtRalewayRomanRegular20"
                          >
                            {item.productId.productName} {item.quantity}x
                          </Text>
                          <Text
                            className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                            size="txtPoppinsSemiBold20"
                          >
                            $ {item.productId.sellingPrice * item.quantity}
                          </Text>
                        </div>
                      ))}
                      <Line className="bg-black-900 h-px w-full" />
                    </div>
                    <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                      <div className="flex flex-row items-center justify-between w-full">
                        <Text
                          className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                          size="txtRalewayRomanRegular20"
                        >
                          Subtotal
                        </Text>
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                          size="txtPoppinsSemiBold20"
                        >
                          $ {totalPrice.toFixed(2)}
                        </Text>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full">
                        {/* <Text
                          className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                          size="txtRalewayRomanRegular20"
                        >
                          Discount (30%)
                        </Text> */}
                        {/* <Text
                          className="text-deep_orange-A400 text-xl tracking-[-0.50px] w-auto"
                          size="txtPoppinsSemiBold20DeeporangeA400"
                        >
                          - $ {(totalPrice*0.3).toFixed(2)}
                        </Text> */}
                      </div>
                    </div>
                    <Line className="bg-black-900 h-px w-full" />
                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanRegular20"
                      >
                        Total
                      </Text>
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                        $ {(totalPrice ).toFixed(2)}
                      </Text>
                    </div>
                    <Button className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full">
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1290px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default CheckoutPage;
