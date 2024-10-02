import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Img, Input, Line, SelectBox, Text } from "components";
import { Button2, Form } from "antd";
import { InputOTP } from "antd-input-otp";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import { useNavigate } from "react-router-dom";
import { setUserCart } from "slices/cartSlice";
import { BuyProduct } from "components/BuyProduct";
import { toast } from "react-toastify";
import { getUserDetails } from "../../services/operations/profileAPI";
import SummaryApi from "../../common/index";
import { FaAmazonPay } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { calculateDeliveryCharge } from "components/BuyProduct";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.css";

import PaymentModalComp from "./PaymentModal";
import { format } from "date-fns";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "components/firebase";
import Footer from "components/Footer";

const unitedStatesUsOptionsList = [
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
];

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [cod, setCod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [paymentModal, setPaymentModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState(false);
  const [value, setValue] = useState(
    user?.additionalDetails?.contactNumber
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [phone, setPhone] = useState(0);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "domestic",
  });

  const sendOtp = async () => {
    try {
      console.log("Sending OTP to:", value);

      // Initialize reCAPTCHA
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const confirmation = await signInWithPhoneNumber(auth, value, recaptcha);
      console.log(confirmation);
    } catch (err) {
      console.error("Error during OTP request:", err);
    }
  };

  const fetchAdditionalDetails = async () => {
    if (!token) return;

    try {
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
    } catch (error) {
      console.error("Error fetching additional details:", error);
    }
  };

  const [deliveryCharges, setDeliveryCharges] = useState({
    // freight_charge: 0,
    // cod_charges: 0,
    // coverage_charges: 0,
    // other_charges: 0,
  });
  const [totalDeliveryCharge, setTotalDeliveryCharge] = useState(0);
  // const deliveryCharge = async (cod) => {
  //   try {
  //     const response = await calculateDeliveryCharge(user, cod);
  //     console.log("response", response);
  //     setDeliveryData(response?.available_courier_companies[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  }, [user]);

  useEffect(() => {
    if (user) {
      const [firstName, ...lastNameParts] = user.name?.split(" ") || [""];
      const lastName = lastNameParts.join(" ");
      setUserData((prevData) => ({
        ...prevData,
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        contactNumber: user.additionalDetails?.contactNumber || null,
        address1: user.additionalDetails?.address1 || "",
        address2: user.additionalDetails?.address2 || "",
        city: user.additionalDetails?.city || "",
        state: user.additionalDetails?.state || "",
        pincode: user.additionalDetails?.pincode || "",
        country: user.additionalDetails?.country || "domestic",
      }));
      setValue(
         user.additionalDetails?.contactNumber
      );
    }
  }, [user]);
  const handleInputChange = (e) => {
    setDeliveryData(false);
    const { name, value } = e.target ? e.target : e;

    // if (name === "contactNumber") {
    //   // setValue(value ?( "+" + country?.toString() + value?.toString()) : "");
    //   // setPhone("+" + country?.toString());

    //   setUserData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    // }
  };
  const handleCountryChange = (selectedOption) => {
    setUserData((prevData) => ({
      ...prevData,
      country: selectedOption.value,
    }));
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    // const dataToSubmit = {
    //   ...userData,
    //   contactNumber: userData.contactNumber ? parseInt(userData.contactNumber, 10) : null
    // };
    // setUserData((prevData) => ({
    //   ...prevData,
    //   contactNumber: phone + userData.contactNumber,
    // }))
    console.log("user data", userData);

    const response = await fetch(SummaryApi.editAdditionalDetails.url, {
      method: SummaryApi.editAdditionalDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      dispatch(getUserDetails(token, navigate));
      // onClose();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
    // setOpenFullScreenImage(false);
  };

  const handleEditUserData = () => {
    const hasChanges = Object.keys(userData).some((key) => {
      const originalValue = user[key] || user.additionalDetails?.[key] || "";
      const currentValue = userData[key] || "";

      // Normalize undefined, null, and empty strings to avoid false positives
      return (currentValue ?? "") !== (originalValue ?? "");
    });

    if (hasChanges) {
      handleSubmit();
      // toast.success("User data updated successfully");
    } else {
      toast.info("No changes detected in the user data");
    }
  };

  const handleBuyProduct = async (finalPrice) => {

    // await handleSubmit();
    let products = data.map((product) => ({
      _id: product.productId._id,
      quantity: product.quantity,
    }));

    if(!deliveryData){
      toast.error("Please click on check delivery date");
      return;
    }

    if (products.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Validation checks
    if (
      !additionalDetails.address1 ||
      additionalDetails.address1.trim() === ""
    ) {
      toast.error("Please provide a valid address");
      return;
    }

    if (!additionalDetails.pincode || additionalDetails.pincode.length !== 6) {
      toast.error("Please provide a valid 6-digit pincode");
      return;
    }

    if (!additionalDetails.state || additionalDetails.state.trim() === "") {
      toast.error("Please provide a valid state");
      return;
    }

    if (!additionalDetails.country || additionalDetails.country.trim() === "") {
      toast.error("Please provide a valid country");
      return;
    }

    if (!additionalDetails.contactNumber || additionalDetails?.contactNumber.length !== 10) {
      toast.error("Please provide a valid 10 digit contact number");
      return;
    }

    if (!additionalDetails.city || additionalDetails.city.trim() === "") {
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
    try {
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
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data");
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const handlePlaceOrder = async () => {
    setDeliveryData(false);
    try {
      await handleSubmit();
      const response = await calculateDeliveryCharge(user, cod);
      const charges = response?.available_courier_companies[0] || {};
      setDeliveryCharges(charges);
      setDeliveryData(true);
      setTotalDeliveryCharge(charges?.freight_charge + charges?.cod_charges);
      console.log("charges", charges, " Days");

      // Calculate estimated delivery date
      const estimatedDeliveryDays = charges.estimated_delivery_days || 0;

      // Get the current date
      const currentDate = new Date();

      // Calculate the estimated delivery date
      const estimatedDeliveryDate = new Date(currentDate.getTime());
      estimatedDeliveryDate.setDate(
        currentDate.getDate() + estimatedDeliveryDays
      );

      // Format the estimated delivery date
      const formattedDeliveryDate = format(estimatedDeliveryDate, "dd/MM/yyyy");

      // Set the formatted delivery date
      setDeliveryDate(formattedDeliveryDate);
    } catch (error) {
      console.error("Error fetching delivery charges:", error);
      toast.error("Failed to calculate delivery charges");
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      setData(cart);
    } else {
      handleLoading();
    }
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + item.productId.sellingPrice * item.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart]);
  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      setDeliveryData(false);
      try {
        const response = await calculateDeliveryCharge(user, cod);
        const charges = response?.available_courier_companies[0] || {};
        setDeliveryCharges(charges);
        setDeliveryData(true);
        setTotalDeliveryCharge(charges?.freight_charge + charges?.cod_charges);

        console.log("charges", charges, " Days");

        // Calculate estimated delivery date
        const estimatedDeliveryDays = charges.estimated_delivery_days || 0;

        // Get the current date
        const currentDate = new Date();

        // Calculate the estimated delivery date
        const estimatedDeliveryDate = new Date(currentDate.getTime());
        estimatedDeliveryDate.setDate(
          currentDate.getDate() + estimatedDeliveryDays
        );

        // Format the estimated delivery date
        const formattedDeliveryDate = format(
          estimatedDeliveryDate,
          "dd/MM/yyyy"
        );

        // Set the formatted delivery date
        setDeliveryDate(formattedDeliveryDate);
      } catch (error) {
        console.error("Error fetching delivery charges:", error);
        toast.error("Failed to calculate delivery charges");
      }
    };

    if (user && cart.length > 0) {
      fetchDeliveryCharges();
    }
  }, [user, cart, cod]);

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
                    {/* Input fields for user data */}
                    {/* First Name and Last Name */}
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          First Name
                        </Text>
                        <input
                          name="firstName"
                          placeholder="Your first name here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          type="text"
                          value={userData.firstName || ""} // Ensure controlled input
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Last Name
                        </Text>
                        <input
                          name="lastName"
                          placeholder="Your last name here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                          value={userData.lastName}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>

                    {/* Phone and Email */}
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Phone
                        </Text>

                        
                          <input
                            name="contactNumber"
                            placeholder="Enter phone number"
                            value={userData.contactNumber}
                            onChange={(e) => handleInputChange(e)}
                            className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          />
                  
                      </div>

                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          Email
                        </Text>
                        <input
                          name="email"
                          placeholder="Your email here.."
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>

                    {/* Country / Region */}
                    <div className="flex flex-col gap-3 items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewayRomanRegular20Black900"
                      >
                        Country / Region
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
                        placeholder="Select Country"
                        value={unitedStatesUsOptionsList.find(
                          (option) => option.value === userData.country
                        )}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div className="flex flex-col gap-3 items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewayRomanRegular20Black900"
                      >
                        Address Line 1
                      </Text>
                      <input
                        name="address1"
                        placeholder="Address Line 1"
                        className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                        wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                        type="text"
                        value={userData.address1}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    {/* Address Line 2 */}
                    <div className="flex flex-col gap-3 items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewayRomanRegular20Black900"
                      >
                        Address Line 2
                      </Text>
                      <input
                        name="address2"
                        placeholder="Address Line 2"
                        className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                        wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                        type="text"
                        value={userData.address2}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    {/* City and State */}
                    <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          City
                        </Text>
                        <input
                          name="city"
                          placeholder="City"
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                          value={userData.city}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-full"
                          size="txtRalewayRomanRegular20Black900"
                        >
                          State
                        </Text>
                        <input
                          name="state"
                          placeholder="State"
                          className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                          wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                          type="text"
                          value={userData.state}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col gap-3 items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-full"
                        size="txtRalewayRomanRegular20Black900"
                      >
                        Pincode
                      </Text>
                      <input
                        name="pincode"
                        placeholder="Pincode"
                        className="font-rubik leading-[normal] p-0 placeholder:text-gray-500 sm:px-5 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px]"
                        wrapClassName="border border-bluegray-100 border-solid pl-[22px] pr-[35px] py-[18px] w-full"
                        type="text"
                        value={userData.pincode}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    {/* Update User Data Button */}
                    <Button
                      className="common-pointer bg-bluegray-900 cursor-pointer font-rubik font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-[40%] mx-auto"
                      onClick={handleEditUserData}
                    >
                      Update User Data
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-53 flex sm:flex-1 flex-col items-start justify-start sm:px-5 px-[27px] py-[34px] w-[416px] sm:w-full">
                <div className="flex flex-col gap-[30px] items-start justify-start w-full">
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

                    {/* Delivery Charges */}
                    <div className="flex flex-col gap-[15px] justify-between w-full">
                      <Text
                        className="text-gray-500 text-xl tracking-[-0.50px] w-auto flex justify-between"
                        size="txtRalewayRomanRegular20"
                      >
                        Delivery Charges:
                        <Text
                          className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                          size="txtPoppinsSemiBold20"
                        >
                          {" "}
                          Rs {totalDeliveryCharge || 0}
                        </Text>
                      </Text>
                      {/* <div className="flex flex-col gap-[10px] items-start justify-start w-full">
                        <Text className="text-gray-500 text-sm">
                          Delivery Charges: Rs{" "}
                          {totalDeliveryCharge|| 0}
                        </Text>
                        {/* <Text className="text-gray-500 text-sm">
                          COD Charges: Rs {deliveryCharges.cod_charges || 0}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          Coverage Charges: Rs{" "}
                          {deliveryCharges.coverage_charges || 0}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          Other Charges: Rs {deliveryCharges.other_charges || 0}
                        </Text> */}

                      {/* <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                        Total Delivery Charge: Rs{" "}
                        {totalDeliveryCharge}
                      </Text> */}
                    </div>

                    <Line className="bg-black-900 h-px w-full" />

                    <div className="flex flex-row items-center justify-between w-full">
                      <Text
                        className="text-gray-500 text-xl tracking-[-0.50px] w-auto"
                        size="txtRalewayRomanRegular20"
                      >
                        Subtotal (including delivery)
                      </Text>
                      <Text
                        className="text-black-900 text-xl tracking-[-0.50px] w-auto"
                        size="txtPoppinsSemiBold20"
                      >
                        Rs {totalPrice + totalDeliveryCharge}
                      </Text>
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
                        Rs {totalPrice + totalDeliveryCharge}
                      </Text>
                    </div>

                    <Line className="bg-black-900 h-px w-full" />
                    <Text className="text-lg">
                      {/* <strong>Estimated Delivery:</strong> {deliveryDate} */}
                      <strong>
                        {"Delivery Time:"}
                        {deliveryCharges.estimated_delivery_days}
                        {" Days"}
                      </strong>
                    </Text>
                    <div className="flex flex-col items-center justify-center w-full gap-3">
                      {/* {!user?.additionalDetails?.contactNumberVerified && (
                        <div className="w-full">
                          <Button
                            className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                            onClick={sendOtp}
                          >
                            Verify Mobile Number
                          </Button>
                          <div
                            id="recaptcha"
                            className="mt-[10px] mx-auto"
                          ></div>
                        </div>
                      )} */}
                      {/* {!deliveryData && ( */}
                        <Button
                          className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                          onClick={handlePlaceOrder}
                        >
                          Check Delivery Time
                        </Button>
                      {/* )} */}

                      <Button className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                        onClick={() => handleBuyProduct(totalPrice + totalDeliveryCharge)}>
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1290px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />

      </div>
      {/* {paymentModal && (
        <PaymentModalComp
          isOpen={paymentModal}
          onClose={() => setPaymentModal(false)}
          data={deliveryData}
          productPrice={totalPrice}
          user={user}
          onPayHandler={handleBuyProduct}
        />
      )} */}
    </>
  );
};

export default CheckoutPage;
