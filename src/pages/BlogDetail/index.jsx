import React, { useEffect, useState } from "react";

import {
  Button,
  CheckBox,
  Img,
  Input,
  Line,
  List,
  SelectBox,
  Text,
} from "components";
import BlogDetailCardrecent from "components/BlogDetailCardrecent";
import CartColumnframe48095972 from "components/CartColumnframe48095972";
import Footer from "components/Footer";
import Header from "components/Header";
import HomepageCardblog from "components/HomepageCardblog";
import CartNavbar from "components/CartNavbar";
import SummaryApi from "common";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "services/operations/profileAPI";
import { toast } from "react-toastify";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const BlogDetailPage = () => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const id = sessionStorage.getItem("blogId");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlog = async () => {
    setLoading(true);
    setError(null);
    try {
      const id = sessionStorage.getItem("blogId");
      const response = await fetch(`${SummaryApi.blogDetails.url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlog(data?.data);
      console.log("hue hue", data?.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(SummaryApi.allBlog.url);
      const dataResponse = await response.json();
      setAllBlogs(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchAllBlogs();
  }, []);

  const filteredBlogs = allBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    comment: "",
    saveInfo: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setCommentForm((prevState) => ({
      ...prevState,
      saveInfo: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please Login");
      return;
    }
    console.log("Comment form data:", commentForm);

    try {
      const response = await fetch(SummaryApi.addComment.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogId: id, // Ensure 'id' is defined
          commentText: commentForm.comment,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Comment Added Successfully");
      fetchBlog();
      setCommentForm({
        comment: "",
      });
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(token, navigate));
    } else {
      console.log("user", user);
      setCommentForm((prevState) => ({
        ...prevState,
        name: user?.name,
        email: user?.email,
      }));
    }
  }, [user, navigate]);

  const recentBlogs = filteredBlogs.slice(0, 4);

  const blogDetailCardrecentPropList = [
    {},
    { image: "images/img_image_70x70.png" },
    { image: "images/img_image_14.png" },
    { image: "images/img_image_15.png" },
  ];

  const homepageCardblogPropList = [
    {},
    { rectangleeighteen: "images/img_rectangle18_400x416.png" },
    { rectangleeighteen: "images/img_rectangle18_1.png" },
  ];

  function handleNavigate() {
    window.location.href = "https://www.facebook.com/login/";
  }
  function handleNavigate5() {
    window.location.href = "https://twitter.com/login/";
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return null;

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
        <div className="flex flex-col items-start justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col md:gap-10 gap-[85px] items-center justify-start max-w-[1291px] mx-auto w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start w-full">
              <div className="flex flex-col gap-[30px] items-center justify-start w-full">
                <div className="flex flex-col font-raleway gap-4 items-center justify-start w-full">
                  <Text
                    className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                    size="txtRalewayBold40"
                  >
                    {blog?.title}
                  </Text>
                  <div className="flex flex-row font-rubik gap-[18px] items-center justify-center max-w-[1290px] w-full">
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Img
                        className="h-6 w-6"
                        src="images/img_edit.svg"
                        alt="edit"
                      />
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                        size="txtRubikRegular18"
                      >
                        By Admin
                      </Text>
                    </div>
                    <Line className="bg-gray-500 h-[15px] w-px" />
                    <div className="flex flex-row gap-2.5 items-center justify-start w-auto">
                      <Img
                        className="h-6 w-6"
                        src="images/img_calendar.svg"
                        alt="calendar"
                      />
                      <Text
                        className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                        size="txtRubikRegular18"
                      >
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <Img
                className="h-[450px] md:h-auto object-cover w-full"
                src={blog?.blogImage[0]}
                alt="rectangle1488"
              />
              <Text
                className="text-base text-center text-gray-500 tracking-[-0.50px] w-full"
                size="txtRubikRegular16"
              >
                <>{blog?.description}</>
              </Text>
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 gap-[110px] items-start justify-between w-full">
              <div className="flex flex-1 flex-col gap-[50px] items-start justify-start w-full">
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <Text
                    className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                    size="txtRalewayBold24"
                  >
                    Comments ({blog.comments.length})
                  </Text>
                  <div className="max-h-[400px] overflow-y-auto w-full">
                    {blog.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 bg-white rounded-lg shadow"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Text className="font-semibold">
                            {comment.user.name}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {new Date(comment.date).toLocaleDateString()}
                          </Text>
                        </div>
                        <Text>{comment.commentText}</Text>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[30px] items-start justify-start w-full">
                  {/* <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <Text
                      className="md:text-3xl sm:text-[28px] text-[32px] text-black-900 tracking-[-0.50px] w-full"
                      size="txtRalewayRomanBold32Black900"
                    >
                      How to choose the best chair
                    </Text>
                    <Text
                      className="leading-[35.00px] max-w-[853px] md:max-w-full text-base text-gray-500 tracking-[-0.50px]"
                      size="txtRubikRegular16"
                    >
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      dictumst posuere, lectus dis vehicula augue elementum quam
                      risus. Placerat dictum lobortis lacinia volutpat morbi cum
                      justo commodo est aliquam, facilisi consequat ligula
                      vivamus faucibus ac sociis cubilia neque, felis fringilla
                      aenean hac eleifend tellus pellentesque quis suspendisse.
                      Sociosqu suscipit sodales taciti rutrum condimentum
                      conubia volutpat cubilia mi, velit curabitur consequat
                      proin neque commodo interdum eleifend dui, ac magna leo
                      ridiculus facilisi duis sapien etiam.
                    </Text>
                    <Text
                      className="leading-[35.00px] max-w-[853px] md:max-w-full text-base text-gray-500 tracking-[-0.50px]"
                      size="txtRubikRegular16"
                    >
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      dictumst posuere, lectus dis vehicula augue elementum quam
                      risus. Placerat dictum lobortis lacinia volutpat morbi cum
                      justo commodo est aliquam, facilisi consequat ligula
                      vivamus faucibus ac sociis cubilia neque.
                    </Text>
                  </div>
                  <Img
                    className="h-[500px] sm:h-auto object-cover w-full"
                    src="images/img_rectangle1489.png"
                    alt="rectangle1489"
                  />
                  <Text
                    className="leading-[35.00px] max-w-[853px] md:max-w-full text-base text-gray-500 tracking-[-0.50px]"
                    size="txtRubikRegular16"
                  >
                    Massa mus mattis natoque ante sapien venenatis nisl, mauris
                    malesuada parturient fringilla dignissim tortor morbi,
                    imperdiet quam faucibus id nunc cum. Suscipit lectus curae
                    cum in taciti ullamcorper accumsan luctus, euismod ornare
                    fames aenean ultrices odio ultricies et mus, gravida
                    condimentum senectus hendrerit lobortis sociis quam. Blandit
                    placerat cras suscipit egestas arcu nam ligula rhoncus,
                    tortor purus proin nulla faucibus odio molestie semper,
                    venenatis urna mollis libero praesent cum nec.
                  </Text>
                  <div className="flex sm:flex-col flex-row gap-[19px] items-start justify-start w-full">
                    <Img
                      className="flex-1 h-[500px] md:h-auto max-h-[500px] object-cover sm:w-[]"
                      src="images/img_rectangle1490.png"
                      alt="rectangle1490"
                    />
                    <Img
                      className="flex-1 h-[500px] md:h-auto max-h-[500px] object-cover sm:w-[]"
                      src="images/img_rectangle1491.png"
                      alt="rectangle1491"
                    />
                  </div>
                </div>
                <div className="flex flex-col font-raleway gap-[50px] items-start justify-start w-full">
                  <div className="flex flex-row gap-[15px] items-center justify-start w-full">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-auto"
                      size="txtRalewayRomanSemiBold24"
                    >
                      Tag :
                    </Text>
                    <div className="flex flex-row font-rubik gap-2.5 items-start justify-start w-auto">
                      <Button className="bg-bluegray-900 border border-bluegray-900 border-solid cursor-pointer leading-[normal] min-w-[62px] py-1.5 rounded-[5px] text-base text-center text-yellow-100 tracking-[-0.50px]">
                        Chair
                      </Button>
                      <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[65px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                        Lamp
                      </Button>
                      <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[96px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                        Minimalist
                      </Button>
                    </div>
                  </div> */}
                  <div className="flex flex-col gap-6 items-center justify-start w-full">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px] w-full"
                      size="txtRalewayBold24"
                    >
                      Leave a Comment
                    </Text>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-8 items-start justify-start w-full"
                    >
                      <div className="flex flex-col gap-[31px] items-start justify-start w-full">
                        <div className="flex md:flex-col flex-row gap-4 items-start justify-start w-full">
                          <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
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
                              value={commentForm.name}
                              onChange={handleInputChange}
                            ></input>
                          </div>
                          <div className="flex flex-1 flex-col gap-[17px] items-start justify-start w-full">
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
                              value={commentForm.email}
                              onChange={handleInputChange}
                            ></input>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[17px] items-start justify-start w-full">
                          <Text
                            className="text-black-900 text-lg tracking-[-0.50px] w-full"
                            size="txtRalewayRomanSemiBold18"
                          >
                            Your Comment
                          </Text>
                          <textarea
                            name="comment"
                            placeholder="Write your comment here...."
                            className="border border-bluegray-100 border-solid flex font-rubik h-[218px] md:h-auto items-start justify-start p-4 w-full text-gray-500 text-sm tracking-[-0.50px]"
                            value={commentForm.comment}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-col font-poppins gap-[30px] items-start justify-start w-full">
                        {/* <CheckBox
                          className="italic leading-[normal] text-gray-500 text-left text-sm tracking-[-0.50px]"
                          inputClassName="border border-bluegray-100 border-solid h-[18px] mr-[5px] w-[18px]"
                          name="saveInfo"
                          id="saveInfo"
                          onChange={handleCheckboxChange}
                          label="Save my name, email, and website in this browser for the next time I comment."
                        ></CheckBox> */}
                        <Button
                          type="submit"
                          className="bg-bluegray-900 border-2 border-bluegray-900 border-solid cursor-pointer font-medium leading-[normal] min-w-[155px] py-[13px] text-base text-center text-white-A700 tracking-[-0.50px]"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[50px] items-start justify-start w-[328px]">
                <div className="flex flex-row items-start justify-start w-full">
                  <input
                    name="search"
                    placeholder="Find Something..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="font-rubik p-3 placeholder:text-gray-500 text-gray-500 text-left text-sm tracking-[-0.50px] w-full border border-bluegray-100 rounded-md h-12"
                    // wrapClassName="bg-gray-53 pb-3.5 pl-3 pr-[35px] pt-[17px] w-[68%]"
                  ></input>
                  <Button className="bg-bluegray-900 cursor-pointer font-semibold leading-[normal] min-w-[107px] py-4 text-center text-sm text-yellow-100 tracking-[-0.50px]">
                    Search
                  </Button>
                </div>
                <div className="flex flex-col font-raleway gap-5 items-start justify-start w-full">
                  <Text
                    className="text-gray-900 text-xl w-full"
                    size="txtRalewayRomanSemiBold20Gray900"
                  >
                    Recent Post
                  </Text>
                  <List
                    className="flex flex-col gap-5 items-start w-full"
                    orientation="vertical"
                  >
                    {recentBlogs.map((blog, index) => (
                      <BlogDetailCardrecent
                        key={blog._id}
                        className="flex flex-1 flex-col gap-2 items-start justify-center my-0 w-full"
                        title={blog.title}
                        date={new Date(blog.createdAt).toLocaleDateString()}
                        image={blog.blogImage[0]}
                      />
                    ))}
                  </List>
                </div>

                <div className="flex flex-col font-josefinsans gap-5 items-start justify-start w-full">
                  <Text
                    className="text-gray-900 text-xl w-full"
                    size="txtJosefinSansRomanSemiBold20"
                  >
                    Follow Us
                  </Text>
                  <div className="flex flex-row gap-5 items-start justify-start w-full">
                    <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                      <Img
                        className="h-6"
                        src="images/img_camera.svg"
                        alt="camera"
                      />
                    </Button>
                    <Button
                      className="common-pointer bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10"
                      onClick={handleNavigate}
                    >
                      <Img
                        className="h-6"
                        src="images/img_facebook.svg"
                        alt="facebook"
                      />
                    </Button>
                    <Button
                      className="common-pointer bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10"
                      onClick={handleNavigate5}
                    >
                      <Img
                        className="h-6"
                        src="images/img_twitter.svg"
                        alt="twitter"
                      />
                    </Button>
                    <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                      <Img
                        className="h-6"
                        src="images/img_music.svg"
                        alt="music"
                      />
                    </Button>
                  </div>
                </div>
                {/* <div className="flex flex-col font-josefinsans gap-5 items-start justify-start w-full">
                  <Text
                    className="text-gray-900 text-xl w-full"
                    size="txtJosefinSansRomanSemiBold20"
                  >
                    Our Gallery
                  </Text>
                  <List
                    className="flex flex-col gap-[18px] items-start w-full"
                    orientation="vertical"
                  >
                    <div className="flex flex-1 flex-row gap-3.5 items-start justify-start my-0 w-full">
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_rectangle21.png"
                        alt="rectangleTwentyOne"
                      />
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_image_14.png"
                        alt="image_One"
                      />
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_image_100x100.png"
                        alt="image_Two"
                      />
                    </div>
                    <div className="flex flex-1 flex-row gap-3.5 items-start justify-start my-0 w-full">
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_image_16.png"
                        alt="image"
                      />
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_image_17.png"
                        alt="image_One"
                      />
                      <Img
                        className="h-[100px] md:h-auto object-cover w-[100px]"
                        src="images/img_image_15.png"
                        alt="image_Two"
                      />
                    </div>
                  </List>
                </div>
                <div className="flex flex-col font-josefinsans gap-5 items-start justify-start w-full">
                  <Text
                    className="text-gray-900 text-xl w-full"
                    size="txtJosefinSansRomanSemiBold20"
                  >
                    Tags
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
                    <div className="flex flex-col items-start justify-start px-2 w-full">
                      <Button className="border border-gray-500 border-solid cursor-pointer leading-[normal] min-w-[66px] py-1.5 rounded-[5px] text-base text-center text-gray-500 tracking-[-0.50px]">
                        Pillow
                      </Button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col gap-[50px] items-center justify-start max-w-[1291px] mx-auto w-full">
            <div className="flex flex-col gap-[13px] items-center justify-start w-full">
              <Text
                className="sm:text-4xl md:text-[38px] text-[40px] text-black-900 text-center tracking-[-0.50px] w-full"
                size="txtRalewaySemiBold40"
              >
                Other blogs
              </Text>
              <Text
                className="text-center text-gray-500 text-lg tracking-[-0.50px] w-full"
                size="txtRubikRegular18Gray500"
              >
                We write various things related to furniture, from tips and what
                things I need to pay attention to when choosing furniture
              </Text>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-5 w-full">
              {filteredBlogs.map((blog) => (
                <HomepageCardblog
                  key={blog._id}
                  className="flex flex-1 flex-col gap-2 items-start justify-start w-full"
                  rectangleeighteen={blog.blogImage[0]}
                  title={blog.title}
                  date={new Date(blog.createdAt).toLocaleDateString()}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnframe48095972 className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1291px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default BlogDetailPage;
