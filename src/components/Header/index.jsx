import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Img, SelectBox, Text , Button } from "components";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const Header = (props) => {
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row ">
            <Link to={"/"}>
            <Img
              className="h-[30px] w-[90px]"
              src="images/img_car.svg"
              alt="car"
            />
            </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 flex-row gap-9 sm:hidden items-center justify-between w-[498px] sm:w-full">
            <SelectBox
              className="font-rubik leading-[normal] text-black-900 text-left text-lg tracking-[-0.50px] w-[17%] sm:w-full"
              placeholderClassName="text-black-900"
              indicator={
                <Img
                  className="h-6 w-6"
                  src="images/img_arrowdown_black_900.svg"
                  alt="arrow_down"
                />
              }
              isMulti={false}
              name="frameFour"
              options={homeOptionsList}
              isSearchable={false}
              placeholder="Home"
            />
            <Link
        to={{
          pathname: "/shop",
          state: { fromDashboard: true },
        }}
      >
        Shop
      </Link>

      <Link
        to={{
          pathname: "/blog",
          state: { fromDashboard: true },
        }}
      >
        Blog
      </Link>

      <Link
        to={{
          pathname: "/aboutus",
          state: { fromDashboard: true },
        }}
      >
        About
      </Link>

            
            
      <Link
        to={{
          pathname: "/contactus",
          state: { fromDashboard: true },
        }}
      >
        Contact
      </Link>

      <Link
        to={{
          pathname: "/team",
          state: { fromDashboard: true },
        }}
      >
        Team
      </Link >
            
          </div>

          <div className="flex flex-row gap-2.5 items-center justify-center">
          <Link
          to={
            {
              pathname: "/login",
              state: { fromDashboard: true },}
          }
            >
              <button type="button" class="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
              </Link>
            {/* <Button>Logout</Button> */}
            <Link to={{ pathname: "/cart"  ,state : { fromDashboard: true }}}>
            <Img
              className="h-8 w-[3rem] mb-1"
              src="images/cart_test_icon.png"
              alt="icon"
            />
            </Link>

    

          </div>
        </div>
      </header>
    </>
  );
};

Header.defaultProps = {};

// export default Header;