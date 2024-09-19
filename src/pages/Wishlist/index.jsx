import React, { useEffect, useState } from "react";
import { Button, Img, Input, List, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SummaryApi from '../../common/index';
import EditProfileDetails from '../../components/BuyerEditDetails';
import { getUserDetails } from '../../services/operations/profileAPI';
import { setProduct } from "slices/productSlice";
import AddToCart from "helpers/addToCart";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const {product} = useSelector(state => state.product);
  const [openModal, setOpenModal] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [products , setProducts] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response?.json();
    setProducts(dataResponse?.data || []);
    dispatch(setProduct(dataResponse?.data || []));
  };
  const handleAddToCart = async (e, id, quantity) => {
    const res = await AddToCart(e, id, quantity, token, dispatch);
  };

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
      console.error('Failed to fetch additional details:', responseData.message);
    }
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token, navigate));
    }
    if(!product){
      fetchAllProduct();
    }
    else{
      setProducts(product);
    }
    // console.log("user",user);
  }, [dispatch, navigate, token, user]);

  useEffect(() => {
    fetchAdditionalDetails();
    if (user) {
      setAdditionalDetails(user.additionalDetails ?? {});
    }
    console.log("additionalDetails" , additionalDetails);
    console.log("product data" , product);
  }, [user, openModal]);
  const wishlistProducts = products?.filter(product => 
    additionalDetails.wishlist?.some(item => item.productId === product._id)
  );

  return (
    <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
      <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
      <div className="flex flex-col font-raleway items-center justify-start max-w-[1440px] md:px-10 sm:px-5 px-[75px] w-full">
        <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
          <Text
            className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
            size="txtRalewayBold40"
          >
            Your Wishlist
          </Text>
          <div className="flex flex-col font-rubik gap-[30px] items-start w-full">
            {wishlistProducts.map((product, index) => (
              <div key={index} className="flex flex-1 md:flex-col flex-row md:gap-10 gap-[131px] items-center justify-between my-0 w-full">
                <Button className="bg-gray-53 flex h-[50px] items-center justify-center p-[13px] w-[50px]">
                  <Img
                    className="h-6"
                    src="images/img_signal_deep_orange_a400.svg"
                    alt="signal"
                  />
                </Button>
                <div className="flex flex-1 sm:flex-col flex-row gap-5 items-center justify-start w-full">
                  <Img
                    className="h-[120px] md:h-auto object-cover w-[120px]"
                    src={product.productImage[0]}
                    alt={product.productName}
                  />
                  <div className="flex flex-col gap-[15px] items-start justify-start w-auto">
                    <Text
                      className="leading-[35.00px] max-w-[294px] md:max-w-full text-black-900 text-xl tracking-[-0.50px]"
                      size="txtRalewayRomanBold20"
                    >
                      {product.productName}
                    </Text>
                    <Text
                      className="text-bluegray-900 text-xl tracking-[-0.50px] w-auto"
                      size="txtPoppinsBold20"
                    >
                      $ {product.sellingPrice.toFixed(2)}
                    </Text>
                  </div>
                </div>
                <Text
                  className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                  size="txtRubikSemiBold18"
                >
                  $ {product.sellingPrice.toFixed(2)}
                </Text>
                <Text
                  className="text-bluegray-900 text-lg tracking-[-0.50px] w-auto"
                  size="txtRubikSemiBold18Bluegray900"
                >
                  In Stock
                </Text>
                <Button className="bg-black-900 cursor-pointer font-semibold leading-[normal] min-w-[146px] py-[13px] text-center text-lg text-white-A700 tracking-[-0.50px]"
                onClick={(e) =>
                  handleAddToCart(e, product._id, 1)
                }>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
        <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1290px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
      </div>
      <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
    </div>
  );
};

export default WishlistPage;
