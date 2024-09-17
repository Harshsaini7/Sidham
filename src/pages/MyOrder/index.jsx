import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Button, Img, Text } from "components";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import { getUserDetails } from "../../services/operations/profileAPI";
import SummaryApi from "../../common/index";
import displayINRCurrency from "../../helpers/displayCurrency";
import TrackOrderModal from "./TrackOrderModal";

const MyOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [currentOrderStatus, setCurrentOrderStatus] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchOrderDetails = async (id) => {
    try {
      const response = await fetch(SummaryApi.getOrderById.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: id,
        })
      });
      const responseData = await response.json();
      setOrderDetails([...orderDetails, responseData?.data]);
      console.log(responseData?.data);
      // console.log(responseData?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token, navigate));
    }else{
      // console.log(user);
      user?.additionalDetails?.myOrders?.forEach((item) => {
        fetchOrderDetails(item?.orderId);
      })
    }
   
  }, [dispatch, navigate, token, user]);

  const handleTrackOrder = (status) => {
    setCurrentOrderStatus(status);
    setTrackModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
      <div className="flex flex-col items-center justify-start w-full">
        <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
        <div className="flex flex-col font-raleway items-center justify-start pt-[75px] md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <Text
              className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayBold40"
            >
              Your Order
            </Text>
            <div className="flex flex-col gap-[30px] items-start w-full">
  {orderDetails.map((order, orderIndex) => (
    <div key={orderIndex} className="flex flex-col gap-[30px] items-start w-full">
      {order.productIds.map((product, productIndex) => (
        <div key={product._id} className="bg-white-A700 flex flex-col gap-5 items-start justify-start p-5 rounded-md shadow-sm w-full">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-1">
              <Img className="h-[120px] w-[120px] object-cover mr-5" src={product.productImage[0]} alt={product.productName} />
              <div className="flex flex-col justify-center">
                <Text className="text-xl font-semibold">{product.productName}</Text>
                <Text className="text-gray-500 capitalize">{product.category}</Text>
                <Text className="text-gray-500">Quantity: {order.quantities[productIndex]}</Text>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <Text className="text-lg font-semibold">
                {displayINRCurrency(product.sellingPrice * order.quantities[productIndex])}
              </Text>
              <div className="flex flex-row gap-2">
                <Button className="bg-gray-800 text-white-A700 hover:bg-gray-900 px-4 py-2 rounded-lg text-sm font-medium" onClick={() => handleTrackOrder(order.orderStatus)}>
                  Track Order
                </Button>
                <Button className="bg-gray-800 text-white-A700 hover:bg-gray-900 px-4 py-2 rounded-lg text-sm font-medium">
                  Cancel Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

            {/* <div className="w-full">
              <Text className="text-lg font-semibold">Order Status: {orderDetails.orderStatus}</Text>
              <Text className="text-lg font-semibold">Payment Status: {orderDetails.paymentStatus}</Text>
            </div> */}
          </div>
        </div>
      </div>
      <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      <TrackOrderModal
        isOpen={trackModalOpen} 
        onClose={() => setTrackModalOpen(false)} 
        orderStatus={currentOrderStatus}
      />
    </div>
  );
};

export default MyOrderPage;