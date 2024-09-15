import React, { useEffect, useState, useMemo } from "react";
import ProductCategories from "components/ProductCategories";
import { Button, Img, Input, SelectBox, Text } from "components";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import CartNavbar from "components/CartNavbar";
import CartSectionfooter from "components/CartSectionfooter";
import HomepageCardproduct from "components/HomepageCardproduct";
import SummaryApi from "common/index";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "helpers/addToCart";
import { setProduct, setCategory } from "slices/productSlice";
import { useNavigate } from "react-router-dom";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const sortOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const ShopPage = () => {
  const { token } = useSelector((state) => state.auth);
  const { product, category } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);

  const handleAddToCart = async (e, id, quantity) => {
    const res = await AddToCart(e, id, quantity, token, dispatch);
  };

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response?.json();
    setAllProduct(dataResponse?.data || []);
    dispatch(setProduct(dataResponse?.data || []));
  };

  const fetchAllCategory = async () => {
    const response = await fetch(SummaryApi.getCategory.url);
    const dataResponse = await response?.json();
    setAllCategory(dataResponse?.data || []);
  };

  const filteredProducts = useMemo(() => {
    return allProduct?.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Set default values for minPrice and maxPrice when empty
      const minPriceValue = minPrice === "" ? 0 : Number(minPrice);
      const maxPriceValue =
        maxPrice === "" ? Number.MAX_SAFE_INTEGER : Number(maxPrice);

      const matchesPrice =
        product.price >= minPriceValue && product.price <= maxPriceValue;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [allProduct, selectedCategory, searchQuery, minPrice, maxPrice]);

  useEffect(() => {
    console.log("product", product);
    if(!product || product?.length === 0) {
      fetchAllProduct();
    } else {
      setAllProduct(product);
    }

    if(!category || category?.length === 0) {
      fetchAllCategory();
    } else {
      setAllCategory(category);
    }

    // fetchAllCategory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already being applied through the filteredProducts useMemo
  };

  const handleSearchChange = (e) => {
    console.log(e.target);
    setSearchQuery(e.target?.value);
  };

  const handleMinPriceChange = (e) => {
    let value = e.target?.value;
    // Allow the input to be empty
    if (value === "") {
      setMinPrice(value); // Set it as an empty string to allow removal in UI
    } else {
      // Convert the value to a number
      setMinPrice(Number(value));
    }
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target?.value;
    // Allow the input to be empty
    if (value === "") {
      setMaxPrice(value); // Set it as an empty string to allow removal in UI
    } else {
      // Convert the value to a number
      setMaxPrice(Number(value));
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[75px] items-start justify-start w-full">
          <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
          <div className="flex flex-col font-poppins items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
            <div className="flex flex-col items-start justify-start max-w-[1290px] mx-auto w-full">
              <div className="h-[450px] relative w-full">
                <Img
                  className="h-[450px] m-auto object-cover w-full"
                  src="images/img_rectangle28.png"
                  alt="rectangleTwentyEight"
                />
                <div className="absolute flex flex-col gap-[30px] h-max inset-y-[0] items-start justify-start left-[5%] my-auto w-auto">
                  <div className="flex flex-col gap-4 items-start justify-start w-full">
                    <Text
                      className="text-lg text-yellow-100 tracking-[-0.50px] w-auto"
                      size="txtRubikSemiBold18Yellow100"
                    >
                      Best Room Decor Items
                    </Text>
                    <Text
                      className="leading-[60.00px] max-w-[465px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-white-A700 tracking-[-0.50px]"
                      size="txtRalewayRomanBold36"
                    >
                      Our goods have the best quality and materials in the world
                    </Text>
                  </div>
                  <Button className="bg-yellow-100 cursor-pointer font-bold leading-[normal] min-w-[170px] py-[15px] text-bluegray-900 text-center text-xl tracking-[-0.50px]">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-raleway items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex md:flex-col flex-row gap-5 items-start justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-[308px]">
              <div className="flex flex-col gap-[22px] items-start justify-start w-full">
                <Text
                  className="text-black-900 text-xl w-full"
                  size="txtRalewayRomanSemiBold20"
                >
                  Filter By Price
                </Text>
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="border border-gray-500_87 border-solid pl-2 sm:pr-5 pr-[35px] py-[7px] rounded text-gray-500 text-lg tracking-[-0.50px] w-[69%]"
                    placeholder="$0"
                  />
                  <Text
                    className="text-black-900 text-sm w-auto"
                    size="txtPlusJakartaSansRomanSemiBold14"
                  >
                    -
                  </Text>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="border border-gray-500_87 border-solid pl-2 sm:pr-5 pr-[35px] py-[7px] rounded text-gray-500 text-lg tracking-[-0.50px] w-[69%]"
                    placeholder="$2000"
                  />
                </div>
                <Img
                  className="h-4 w-[233px]"
                  src="images/img_slider.svg"
                  alt="slider"
                />
              </div>
              <div className="flex flex-col gap-[22px] items-start justify-start w-full">
                <Text
                  className="text-black-900 text-xl w-full"
                  size="txtRalewayRomanSemiBold20"
                >
                  Filter By Color
                </Text>
                <Img
                  className="h-10 w-full"
                  src="images/img_frame48095956.svg"
                  alt="frame48095956"
                />
                <Img
                  className="h-10 w-full"
                  src="images/img_frame48095957.svg"
                  alt="frame48095957"
                />
              </div>
              <div className="flex flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-black-900 text-xl w-full"
                  size="txtRalewayRomanSemiBold20"
                >
                  Product Categories
                </Text>
                <div className="flex flex-col font-poppins gap-5 items-start justify-start w-full">
                  <ProductCategories
                    allCategory={allCategory}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-black-900 text-xl w-full"
                  size="txtRalewayRomanSemiBold20"
                >
                  Product Tag
                </Text>
                <div className="flex flex-col font-poppins gap-[15px] items-start justify-start w-full">
                  <div className="flex flex-row gap-2.5 items-start justify-start w-full">
                    <Button className="bg-bluegray-900 border border-bluegray-900 border-solid cursor-pointer leading-[normal] min-w-[66px] py-1.5 rounded-[5px] text-base text-center text-yellow-100 tracking-[-0.50px]">
                      Chair
                    </Button>
                    <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[68px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                      Lamp
                    </Button>
                    <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[101px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                      Minimalist
                    </Button>
                  </div>
                  <div className="flex flex-row gap-2.5 items-start justify-start w-full">
                    <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[59px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                      Sofa
                    </Button>
                    <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[58px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                      New
                    </Button>
                    <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[67px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                      Clock
                    </Button>
                  </div>
                  <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[66px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                    Pillow
                  </Button>
                </div>
              </div>
              <div className="h-[400px] relative w-full">
                <Img
                  className="h-[400px] m-auto object-cover rounded-[10px] w-[308px] md:w-full"
                  src="images/img_rectangle29.png"
                  alt="rectangleTwentyNine"
                />
                <div className="absolute bottom-[10%] flex flex-col gap-[15px] inset-x-[0] items-center justify-start mx-auto w-auto">
                  <Text
                    className="leading-[35.00px] max-w-[265px] md:max-w-full text-center text-white-A700 text-xl"
                    size="txtRalewayRomanBold20WhiteA700"
                  >
                    Make a purchase now and get 50% discount
                  </Text>
                  <Button className="bg-yellow-100 border border-solid border-yellow-100 cursor-pointer font-poppins font-semibold leading-[normal] min-w-[107px] py-[7px] rounded-[5px] text-base text-black-900 text-center tracking-[-0.50px]">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col font-rubik gap-[50px] items-center justify-start w-full">
              <form
                onSubmit={handleSearch}
                className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full"
              >
                <div className="flex sm:flex-1 flex-col items-center justify-start w-[74%] sm:w-full">
                  <input
                    name="frame48095984"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="leading-[normal] p-0 placeholder:text-black-900_3f sm:pr-5 text-black-900_3f text-left text-sm tracking-[-0.50px] w-full h-[50px]"
                    wrapClassName="bg-white-A700 pl-4 pr-[35px] py-[15px] w-full"
                  />
                </div>
                <Button className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] min-w-[107px] py-4 text-center text-sm text-yellow-100 tracking-[-0.50px]">
                  Search
                </Button>
              </form>
              <div className="flex flex-col items-center justify-start w-full">
                <div className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                  {filteredProducts?.map((product, index) => (
                    <div
                      key={`HomepageCardproduct${index}`}
                      onClick={() => {
                        sessionStorage.setItem("productId", product._id);
                        navigate(`/detailreview`);
                      }}
                    >
                      <HomepageCardproduct
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
              </div>
              <div className="flex flex-row gap-2.5 items-center justify-center max-w-[962px] w-full">
                <Img
                  className="h-[15px] w-[15px]"
                  src="images/img_arrowleft.svg"
                  alt="arrowleft"
                />
                <Button className="bg-bluegray-900 cursor-pointer font-semibold h-[35px] leading-[normal] py-[9px] rounded-[17px] text-center text-sm text-white-A700 tracking-[-0.50px] w-[35px]">
                  1
                </Button>
                <Button className="bg-gray-100 cursor-pointer font-semibold h-[35px] leading-[normal] py-[9px] rounded-[17px] text-black-900 text-center text-sm tracking-[-0.50px] w-[35px]">
                  2
                </Button>
                <Button className="bg-gray-100 cursor-pointer font-semibold h-[35px] leading-[normal] py-[9px] rounded-[17px] text-black-900 text-center text-sm tracking-[-0.50px] w-[35px]">
                  3
                </Button>
                <Button className="bg-gray-100 flex h-[35px] items-center justify-center p-[7px] rounded-[17px] w-[35px]">
                  <Img className="h-5" src="images/img_user.svg" alt="user" />
                </Button>
                <Img
                  className="h-[15px] w-[15px]"
                  src="images/img_arrowright.svg"
                  alt="arrowright"
                />
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

export default ShopPage;
