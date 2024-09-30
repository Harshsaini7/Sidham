import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CheckBox,
  Img,
  Input,
  Line,
  List,
  PagerIndicator,
  SelectBox,
  Slider,
  Text,
} from "components";
import { FiMinusCircle } from "react-icons/fi";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import HomepageCardproduct from "components/HomepageCardproduct";
import SummaryApi from "common";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "helpers/addToCart";
import { setProduct } from "slices/productSlice";
import { FcLike } from "react-icons/fc";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { getUserDetails } from "services/operations/profileAPI";
import ReviewSection from "components/ReviewSection";
// import ReactStars from "react-rating-stars-component";
import ReactStars from "react-rating-stars-component";

const DetailReviewPage = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("productId");
  const { user } = useSelector((state) => state.profile);
  const { product } = useSelector((state) => state.product);
  const [currProduct, setCurrProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const [addedToWishlist, setAddedToWishlist] = useState(true);
  const [ratingSection, setRatingSection] = useState(true);
  const [descriptionSection, setDescriptionSection] = useState(false);
  const [benefitSection, setBenefitSection] = useState(false);

  const handleAddToCart = async (e, id, quantity) => {
    const res = await AddToCart(e, id, quantity, token, dispatch);
  };
  const renderProductCard = (product) => (
    <div className="w-1/3 px-2" key={product._id}>
      <HomepageCardproduct
        className="flex flex-col gap-4 items-start justify-start w-full"
        image={product.productImage[0]}
        title={product.productName}
        price={`$${product.sellingPrice.toFixed(2)}`}
        renderActions={() => (
          <div className="flex flex-row justify-center w-full">
            <Button
              className="common-pointer bg-bluegray-900 cursor-pointer font-bold leading-[normal] min-w-[107px] py-[11px] rounded-[21px] text-center text-sm text-yellow-100 tracking-[-0.50px] mx-auto"
              onClick={(e) => handleAddToCart(e, product._id, 1)}
            >
              Add to Cart
            </Button>
          </div>
        )}
      />
    </div>
  );

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response?.json();
      setAllProduct(dataResponse?.data || []);
      dispatch(setProduct(dataResponse?.data || [])); // Use the proper action creator
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };
  const [sliderState, setSliderState] = useState(0);
  const sliderRef = useRef(null);

  const handleUpdateWishlist = async (id, addedToWishlist) => {
    setAddedToWishlist(addedToWishlist);
    try {
      const action = addedToWishlist ? "remove" : "add";
      console.log("action", action);

      const response = await fetch(SummaryApi.updateWishlist.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication tokens if required
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          action: action,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        toast.success("Wishlist Updated Successfully");
      }

      const result = await response.json();

      // Handle the result as needed
      console.log("Wishlist updated:", result);

      // Optionally update the UI or state based on the response
      // Example: updateState(result);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      // Optionally handle errors (e.g., show a notification to the user)
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();

      if (dataResponse.success && dataResponse.data) {
        setCurrProduct(dataResponse.data);
        console.log("hui", dataResponse.data);
      } else {
        throw new Error(dataResponse.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || product?.length === 0) {
      fetchAllProduct();
    } else {
      setAllProduct(product);
    }
  }, [product]);

  const incrementCount = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  useEffect(() => {
    // Initialize addedToWishlist based on whether the product is in the user's wishlist
    if (
      user &&
      user.additionalDetails &&
      user.additionalDetails.wishlist &&
      currProduct
    ) {
      const isInWishlist = user.additionalDetails.wishlist.some(
        (item) => item.productId === currProduct._id
      );
      setAddedToWishlist(!isInWishlist);
      console.log("isInWishlist", isInWishlist);
    } else {
      console.log("hello from else part");
    }
  }, [user, currProduct]);

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token, navigate));
    } else {
      setReviewForm((prevForm) => ({
        ...prevForm,
        name: user?.name,
        email: user?.email,
      }));
    }
  }, [user]);

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    name: user?.name,
    email: user?.email,
    review: "",
    saveInfo: false,
  });

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for rating change
  const handleRatingChange = (newRating) => {
    setReviewForm((prevForm) => ({
      ...prevForm,
      rating: newRating,
    }));
  };

  // Handler for form submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // Here you would typically send the reviewForm data to your backend
    // console.log("Review form data:", reviewForm);
    if (!token) {
      toast.error("Please Login");
      return;
    }
    // TODO: Add your API call to submit the review

    try {
      const response = await fetch(SummaryApi.addReview.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token to the request
        },
        body: JSON.stringify({
          productId: id, // Ensure 'id' is defined
          review: reviewForm.review, // Ensure 'reviewForm.review' is set
          rating: reviewForm.rating, // Ensure 'reviewForm.rating' is set
        }),
      });

      const result = await response.json(); // Parse the response as JSON

      if (!response.ok) {
        throw new Error(result.message || "Failed to add review");
      }

      if (response.success) {
        toast.success("Review added successfully");
      } else {
        toast.error(result.message);
        return;
      }

      setReviewForm((prevForm) => ({
        ...prevForm,
        review: "",
      }));

      fetchProduct();
    } catch (err) {
      console.log("Error while adding review:", err.message);
      toast.error("Failed to add review");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
          <div className="flex flex-col items-start justify-start pt-[75px] md:px-10 sm:px-5 px-[75px] w-full">
            {currProduct && (
              <div className="flex md:flex-col flex-row gap-[47px] items-center justify-start max-w-[1290px] mx-auto w-full">
                <Img
                  className="flex-1 md:flex-none md:h-[595px] sm:h-auto h-full max-h-[595px] object-cover sm:w-[] md:w-[]"
                  src={currProduct.productImage[0]}
                  alt={currProduct.productName}
                />
                <div className="flex flex-1 flex-col gap-[30px] items-start justify-start w-full">
                  <div className="flex flex-col gap-[33px] items-start justify-start w-full">
                    <Text
                      className="max-w-[621px] md:max-w-full md:text-3xl sm:text-[28px] text-[32px] text-black-900 tracking-[-0.50px]"
                      size="txtRalewayRomanBold32Black900"
                    >
                      {currProduct.productName}
                    </Text>
                    <div className="flex flex-row font-rubik gap-[15px] items-center justify-start w-full">
                      {/* <Img
                        className="h-5 w-[140px]"
                        src="images/img_frame135.svg"
                        alt="frame135"
                      /> */}

                      <ReactStars
                        count={5}
                        size={24}
                        value={currProduct.averageRating}
                        edit={false}
                        activeColor="#ffd700"
                      />

                      <Text
                        className="text-gray-500 text-sm tracking-[-0.50px] w-auto mt-2"
                        size="txtRubikRegular14"
                      >
                        ( {currProduct.reviews.length} Reviews )
                      </Text>
                    </div>
                    <Text
                      className="text-4xl sm:text-[32px] md:text-[34px] text-bluegray-900 tracking-[-0.50px] w-full"
                      size="txtRubikBold36"
                    >
                      Rs {currProduct.price.toFixed(2)}
                    </Text>
                    <div className="flex flex-col font-rubik gap-5 items-start justify-start w-full">
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-full"
                        size="txtRubikSemiBold18"
                      >
                        <span className="text-gray-500 font-rubik text-left font-normal">
                          Brand:
                        </span>
                        <span className="text-black-900 font-rubik text-left font-normal">
                          {" "}
                          {currProduct.brandName}
                        </span>
                      </Text>
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-full"
                        size="txtRubikSemiBold18"
                      >
                        <span className="text-gray-500 font-rubik text-left font-normal">
                          Category:
                        </span>
                        <span className="text-black-900 font-rubik text-left font-normal">
                          {" "}
                          {currProduct.category}
                        </span>
                      </Text>
                    </div>
                    <Text
                      className="leading-[35.00px] max-w-[621px] md:max-w-full text-gray-500 text-lg tracking-[-0.50px]"
                      size="txtRubikRegular18Gray500"
                    >
                      {currProduct?.description}
                    </Text>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-row gap-[19px] items-start justify-start w-[337px]">
                      <div className="border border-black-900 border-solid flex flex-row gap-[15px] items-center justify-start p-2.5 w-[38%]">
                        {productCount === 1 && (
                          <Img
                            className={`common-pointer h-6 ml-1 w-6`}
                            src="images/img_google.svg"
                            alt="google"
                            onClick={decrementCount}
                          />
                        )}
                        {productCount > 1 && (
                          <FiMinusCircle
                            className={`common-pointer h-6 ml-1 w-6`}
                            onClick={decrementCount}
                          />
                        )}
                        <Text
                          className="text-black-900 text-lg tracking-[-0.50px]"
                          size="txtRubikRegular18"
                        >
                          {productCount}
                        </Text>
                        <Img
                          className="h-6 w-6"
                          src="images/img_plus.svg"
                          alt="plus"
                          onClick={incrementCount}
                        />
                      </div>
                      <Button
                        className="common-pointer bg-black-900 flex-1 justify-center sm:pl-5 pl-[25px] pr-[13px] py-[11px] text-lg text-white-A700 tracking-[-0.50px] w-auto"
                        onClick={() =>
                          handleAddToCart(null, currProduct._id, productCount)
                        }
                      >
                        Add to Cart
                      </Button>
                      <Button
                        className="border border-bluegray-100 border-solid flex h-[43px] items-center justify-center p-3 w-[43px] mt-1"
                        onClick={() => {
                          if (!token) {
                            toast.error("Please Login");
                            return;
                          }
                          // setAddedToWishlist(!addedToWishlist);
                          handleUpdateWishlist(
                            currProduct._id,
                            !addedToWishlist
                          );
                        }}
                      >
                        {addedToWishlist && (
                          <Img src="images/img_favorite.svg" alt="favorite" />
                        )}
                        {!addedToWishlist && <FcLike />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col font-josefinsans items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex flex-row gap-[50px] items-start justify-center w-full md:w-full">
                <div
                  className={`flex flex-col gap-2 items-center justify-start w-auto cursor-pointer ${
                    descriptionSection ? "active-section" : ""
                  }`}
                  onClick={() => {
                    setDescriptionSection(true);
                    setRatingSection(false);
                    setBenefitSection(false);
                  }}
                >
                  <Text
                    className={`text-2xl md:text-[22px] sm:text-xl tracking-[-0.50px] w-auto ${
                      descriptionSection ? "text-bluegray-900" : "text-gray-500"
                    }`}
                    size={
                      descriptionSection
                        ? "txtJosefinSansRomanBold24"
                        : "txtJosefinSansRomanBold24Gray500"
                    }
                  >
                    Description
                  </Text>
                  {descriptionSection && (
                    <Line className="bg-bluegray-900 h-1.5 w-full" />
                  )}
                </div>

                <div
                  className={`flex flex-col gap-2 items-center justify-start w-auto cursor-pointer ${
                    benefitSection ? "active-section" : ""
                  }`}
                  onClick={() => {
                    setDescriptionSection(false);
                    setRatingSection(false);
                    setBenefitSection(true);
                  }}
                >
                  <Text
                    className={`text-2xl md:text-[22px] sm:text-xl tracking-[-0.50px] w-auto ${
                      benefitSection ? "text-bluegray-900" : "text-gray-500"
                    }`}
                    size={
                      benefitSection
                        ? "txtJosefinSansRomanBold24"
                        : "txtJosefinSansRomanBold24Gray500"
                    }
                  >
                    Benefit
                  </Text>
                  {benefitSection && (
                    <Line className="bg-bluegray-900 h-1.5 w-full" />
                  )}
                </div>

                <div
                  className={`flex flex-col gap-2 items-center justify-start w-auto cursor-pointer ${
                    ratingSection ? "active-section" : ""
                  }`}
                  onClick={() => {
                    setDescriptionSection(false);
                    setRatingSection(true);
                    setBenefitSection(false);
                  }}
                >
                  <Text
                    className={`text-2xl md:text-[22px] sm:text-xl tracking-[-0.50px] w-auto ${
                      ratingSection ? "text-bluegray-900" : "text-gray-500"
                    }`}
                    size={
                      ratingSection
                        ? "txtJosefinSansRomanBold24"
                        : "txtJosefinSansRomanBold24Gray500"
                    }
                  >
                    Review
                  </Text>
                  {ratingSection && (
                    <Line className="bg-bluegray-900 h-1.5 w-full" />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              {descriptionSection && (
                <div className="w-full text-center">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    {currProduct?.description || "No Description Available"}
                  </Text>
                </div>
              )}
              {benefitSection && (
                <div className="w-full text-center">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    {currProduct?.benefits || "No Benefit Data Available"}
                  </Text>
                </div>
              )}
              {ratingSection && (
                <div className="w-full flex flex-col items-center justify-center">
                  {currProduct &&
                    currProduct.reviews &&
                    currProduct.reviews.length > 0 && (
                      <ReviewSection reviews={currProduct?.reviews} />
                    )}
                  {currProduct &&
                    currProduct.reviews &&
                    currProduct.reviews.length === 0 && (
                      <Text
                        className="text-2xl md:text-[22px] text-black-900 text-center sm:text-xl tracking-[-0.50px] w-full"
                        size="txtRalewayBold24"
                      >
                        No Reviews Available For This Product
                      </Text>
                    )}

                  <div className="flex flex-col font-raleway gap-6 items-center justify-center w-full max-w-[800px] mt-10">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900 text-center sm:text-xl tracking-[-0.50px] w-full"
                      size="txtRalewayBold24"
                    >
                      Write your review
                    </Text>
                    <form
                      onSubmit={handleSubmitReview}
                      className="flex flex-col gap-8 items-center justify-center w-full md:w-full"
                    >
                      <div className="flex flex-col gap-[50px] items-center justify-center w-full">
                        <div className="flex flex-col gap-[17px] items-center justify-center w-full">
                          <Text
                            className="text-black-900 text-lg tracking-[-0.50px] w-full text-center"
                            size="txtRalewayRomanSemiBold18"
                          >
                            Your Rating
                          </Text>
                          <ReactStars
                            count={5}
                            onChange={handleRatingChange}
                            size={24}
                            activeColor="#ffd700"
                          />
                        </div>
                        <div className="flex flex-col gap-[31px] items-center justify-center w-full">
                          <div className="flex md:flex-col flex-row gap-4 items-center justify-center w-full">
                            <div className="flex flex-1 flex-col gap-[17px] items-center justify-center w-full">
                              <Text
                                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                                size="txtRalewayRomanSemiBold18"
                              >
                                Your Name
                              </Text>
                              <input
                                name="name"
                                placeholder="Write your name here...."
                                className="font-rubik p-3 placeholder:text-gray-500 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 rounded-md h-12"
                                type="text"
                                value={reviewForm.name}
                              />
                            </div>
                            <div className="flex flex-1 flex-col gap-[17px] items-center justify-center w-full">
                              <Text
                                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                                size="txtRalewayRomanSemiBold18"
                              >
                                Your Email
                              </Text>
                              <input
                                name="email"
                                placeholder="Write your email here...."
                                className="font-rubik p-3 placeholder:text-gray-500 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 rounded-md h-12"
                                type="email"
                                value={reviewForm.email}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-[17px] items-center justify-center w-full">
                            <Text
                              className="text-black-900 text-lg tracking-[-0.50px] w-full text-center"
                              size="txtRalewayRomanSemiBold18"
                            >
                              Your Review
                            </Text>
                            <textarea
                              name="review"
                              placeholder="Write your review here...."
                              className="border border-bluegray-100 border-solid font-rubik h-[218px] md:h-auto items-start justify-start p-4 text-gray-500 text-sm tracking-[-0.50px] w-full rounded-md"
                              value={reviewForm.review}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col font-poppins gap-[30px] items-center justify-center w-full">
                        <CheckBox
                          className="italic leading-[normal] sm:pr-5 text-gray-500 text-left text-sm tracking-[-0.50px]"
                          inputClassName="border border-bluegray-100 border-solid h-[18px] mr-[5px] w-[18px]"
                          name="saveInfo"
                          id="saveInfo"
                          label="Save my name, email, and website in this browser for the next time I comment."
                          checked={reviewForm.saveInfo}
                          onChange={handleInputChange}
                        ></CheckBox>
                        <Button
                          type="submit"
                          className="bg-bluegray-900 border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[13px] text-base text-center text-white-A700 tracking-[-0.50px] rounded-md"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[46px] items-center justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewayBold40"
              >
                {/* <span className="text-black-900 font-raleway font-bold">
                  Our{" "}
                </span> */}
                <span className="text-black-900 font-raleway font-bold">
                  Related
                </span>
                <span className="text-black-900 font-raleway font-bold">
                  {" "}
                  Product
                </span>
              </Text>
              {/* <Text
                className="text-center text-gray-500 text-lg tracking-[-0.50px] w-full"
                size="txtRubikRegular18Gray500"
              >
                Made of the best materials and with a design that follows the
                times
              </Text> */}
            </div>
            <Slider
              autoPlay
              autoPlayInterval={2000}
              activeIndex={sliderState}
              responsive={{
                0: { items: 1 },
                550: { items: 1 },
                1050: { items: 1 },
              }}
              onSlideChanged={(e) => {
                setSliderState(e?.item);
              }}
              ref={sliderRef}
              className="w-full"
              items={[...Array(3)].map(() => (
                <React.Fragment key={Math.random()}>
                  <List
                    className="flex flex-col gap-[47px] items-center mx-2.5"
                    orientation="vertical"
                  >
                    <div className="gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-start justify-start w-full">
                      {allProduct.slice(0, 8).map((product, index) => (
                        <div
                          onClick={() => {
                            sessionStorage.setItem("productId", product._id);
                            navigate(`/detailreview`);
                          }}
                        >
                          <HomepageCardproduct
                            key={`HomepageCardproduct${index}`}
                            className="flex flex-1 flex-col gap-4 items-start justify-start w-full"
                            {...product}
                            renderActions={() => (
                              <div className="flex flex-row justify-center w-full">
                                <Button
                                  className="common-pointer bg-bluegray-900 cursor-pointer font-bold leading-[normal] min-w-[107px] py-[11px] rounded-[21px] text-center text-sm text-yellow-100 tracking-[-0.50px] mx-auto"
                                  onClick={(e) =>
                                    handleAddToCart(e, product._id, 1)
                                  }
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </List>
                </React.Fragment>
              ))}
            />

            <PagerIndicator
              className="flex gap-[15px] h-[15px] items-center justify-center max-w-[1289px] w-full"
              count={3}
              activeCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-bluegray-900 w-[15px]"
              activeIndex={sliderState}
              inactiveCss="inline-block cursor-pointer rounded-[50%] h-[15px] bg-gray-200 w-[15px]"
              sliderRef={sliderRef}
              selectedWrapperCss="inline-block"
              unselectedWrapperCss="inline-block"
            />
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start max-w-[1428px] mx-auto md:px-5 w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1278px] md:pl-10 sm:pl-5 pl-[59px] py-[46px] w-full" />
        </div>
        <CartSectionfooter className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default DetailReviewPage;
