import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Img, Input, Line, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import { FaAmazonPay } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setUserCart, emptyCart, removeFromCart } from "slices/cartSlice";
import { BuyProduct } from "components/BuyProduct";
import { toast } from "react-toastify";
import CODModal from "components/CODModal";
import { getUserDetails } from "../../services/operations/profileAPI";
import SummaryApi from "../../common/index";
import displayINRCurrency from "../../helpers/displayCurrency";
import EditProfileDetails from "components/BuyerEditDetails";
import "./index.css";
// import { setUserCart } from "../../slices/cartSlice";
const unitedStatesUsOptionsList = [
  // { label: "India", value: "india" },
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
];

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [currCart, setCurrCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cod, setCod] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(4).fill(null);
  const { token } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.profile);
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [editModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAdditionalDetails = async () => {
    if (!token) return;

    const response = await fetch(SummaryApi.showAdditionalDetails.url, {
      method: SummaryApi.showAdditionalDetails.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      setAdditionalDetails(responseData?.data ?? {});
    } else {
      console.error(
        "Failed to fetch additional details:",
        responseData.message
      );
    }
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, navigate, token, user]);

  useEffect(() => {
    fetchAdditionalDetails();
    if (user) {
      setAdditionalDetails(user.additionalDetails ?? {});
    }
    console.log(additionalDetails);
  }, [user]);

  const handleCashOnDelivery = () => {
    let products = data.map((product) => ({
      _id: product.productId._id,
      quantity: product.quantity,
    }));

    setShowModal(false);

    if (products.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    BuyProduct(
      products,
      totalPrice,
      token,
      user,
      navigate,
      dispatch,
      data,
      true
    );
  };

  const handleBuyProduct = async () => {
    let products = data.map((product) => ({
      _id: product.productId._id,
      quantity: product.quantity,
    }));

    if (products.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    // Check for address1
    if (
      !additionalDetails.address1 ||
      additionalDetails.address1.trim() === ""
    ) {
      toast.error("Please provide a valid address");
      return;
    }

    // Check for pincode length
    if (!additionalDetails.pincode || additionalDetails.pincode.length !== 6) {
      toast.error("Please provide a valid 6-digit pincode");
      return;
    }

    // Check for state
    if (!additionalDetails.state || additionalDetails.state.trim() === "") {
      toast.error("Please provide a valid state");
      return;
    }

    if(!additionalDetails.country || additionalDetails.country.trim() === "") {
      toast.error("Please provide a valid country");
      return;
    }

    if(!additionalDetails.contactNumber || additionalDetails.contactNumber.trim() === "") {
      toast.error("Please provide a valid contact number");
      return;
    } 

    if(!additionalDetails.city || additionalDetails.city.trim() === "") {
      toast.error("Please provide a valid city");
      return;
    }


    BuyProduct(
      products,
      totalPrice,
      token,
      user,
      navigate,
      dispatch,
      data,
      cod
    );
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.cartProductView.url, {
      method: SummaryApi.cartProductView.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      console.log(responseData.cart);
      setData(responseData.cart);
      dispatch(setUserCart(responseData.cart));
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      setData(cart);
    } else {
      handleLoading();
    }

    console.log(cart);

    console.log(data);
  }, []);

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
                          value={user?.name.split(" ")[0]}
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
                          value={user?.name.split(" ")[1] || ""}
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
                          value={additionalDetails?.contactNumber}
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
                          value={user?.email}
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
                      Payment Method
                    </Text>
                    <div className="flex flex-col sm-flex-row font-rubik gap-[21px] items-start justify-start w-full">
                      <Button
                        className={`border ${
                          paymentMethod === "Online Payment"
                            ? "border-black-900 bg-white-A700 text-black-900" // White background and black text for selected tab
                            : "border-bluegray-100 bg-gray-200 text-gray-500" // Gray background and gray text for unselected tab
                        } border-solid cursor-pointer flex items-center justify-center min-w-[175px] px-[29px] py-[15px]`}
                        leftIcon={
                          <div className="h-10 mr-2.5 w-10 bg-gray-201 p-2 rounded-[50%] flex justify-center items-center">
                            <FaAmazonPay className="h-6" />
                          </div>
                        }
                        onClick={() => {
                          setPaymentMethod("Online Payment");
                          setCod(false);
                        }}
                      >
                        <div className="leading-[normal] sm:px-5 text-left text-lg tracking-[-0.50px]">
                          Online Payment
                        </div>
                      </Button>

                      <Button
                        className={`border ${
                          paymentMethod === "Cash on Delivery"
                            ? "border-black-900 bg-white-A700 text-black-900" // White background and black text for selected tab
                            : "border-bluegray-100 bg-gray-200 text-gray-500" // Gray background and gray text for unselected tab
                        } border-solid cursor-pointer flex items-center justify-center min-w-[175px] px-[29px] py-[15px]`}
                        leftIcon={
                          <div className="h-10 mr-2.5 w-10 bg-gray-201 p-2 rounded-[50%] flex justify-center items-center">
                            <FaIndianRupeeSign className="h-8" />
                          </div>
                        }
                        onClick={() => {
                          setPaymentMethod("Cash on Delivery");
                          setCod(true);
                        }}
                      >
                        <div className="leading-[normal] sm:px-5 text-left text-lg tracking-[-0.50px]">
                          Cash on Delivery
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
                      placeholder="Domestic"
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
                      className="border border-bluegray-100 border-solid flex flex-col font-rubik h-[150px] md:h-auto items-start justify-start sm:px-5 px-[22px] py-[19px] w-full resize-none text-gray-500 text-sm tracking-[-0.50px]"
                      placeholder="Write your full address"
                      value={`${additionalDetails?.address1}, ${additionalDetails?.address2}, ${additionalDetails?.city}, ${additionalDetails?.state}, ${additionalDetails?.pincode}`}
                    />
                  </div>

                  <Button
                    className="common-pointer bg-bluegray-900 cursor-pointer font-rubik font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-[40%] mx-auto"
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  >
                    Edit Address
                  </Button>
                </div>
                {/* <div className="flex flex-col gap-9 items-start justify-start w-full">
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
                </div> */}
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
                      {data.map((item) => (
                        <div
                          key={item?._id}
                          className="flex flex-row items-center justify-between w-full"
                        >
                          <Text
                            className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                            size="txtRalewayRomanRegular20"
                          >
                            {item?.productId?.productName} {item?.quantity}x
                          </Text>
                          <Text
                            className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                            size="txtPoppinsSemiBold20"
                          >
                            Rs {item?.productId?.sellingPrice * item?.quantity}
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
                          Rs {totalPrice.toFixed(2)}
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
                        Rs {totalPrice.toFixed(2)}
                      </Text>
                    </div>
                    <Button
                      className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                      onClick={() => handleBuyProduct()}
                    >
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
      {editModal && (
        <EditProfileDetails
          onClose={() => setShowEditModal(false)}
          additionalDetails={additionalDetails}
        />
      )}
    </>
  );
};

export default CheckoutPage;
