import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import { Img, SelectBox, Text , Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "services/operations/authAPI";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CartNavbar = (props) => {
  const user = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const {totalItems} = useSelector(state => state.cart);
  const handleLogout = async () => {
    dispatch(logout(navigate))
  };

  useEffect(() => {
    console.log(user);
  })
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row ">
            <Img
              className="h-[30px] w-[90px] "
              src="images/img_car.svg"
              alt="car"
            />
                   
            <div className="mobile-menu">

            <Link to={{
          pathname: "/",
          state: { fromDashboard: true },
        }}
        
        ><Img
        className=" h-6 w-[2rem] "
        src="images/cart_test_icon.png"
        alt="icon"
      /></Link>

              <div>
              <div className="dash"></div>
              <div className="dash"></div>
              <div className="dash"></div>
              </div>
              

              
             



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
      </Link>

{/*       
      <Link
        to={{
          pathname: "/",
          state: { fromDashboard: true },
        }}
      >
      <img  className="h-8 w-[3rem]"     src="images/cart_test_icon.png" alt="" srcset="" />
      </Link> */}
        </div>

        <div className="flex flex-row gap-5 items-center justify-center">
            {
              user.user?._id && (
                <Link
                  to={
                    {
                      pathname: "/profile",
                      state: { fromDashboard: true },
                    }
                  }
                >

                <FaRegUserCircle className="h-8 w-[3rem]" />
                </Link>
              )
            }
        
            { user.user?._id && ( 
              <div className="relative">
            <Link to={{ pathname: "/cart"  ,state : { fromDashboard: true }}}>
            <Img
              className="h-8 w-[3rem] mb-1"
              src="images/cart_test_icon.png"
              alt="icon"
            />
            <div className="bg-black-900 text-white-A700 w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{totalItems}</p>
              </div>
            </Link></div>)
              }

            
                

            <Link
          to={
            {
              pathname: "/login",
              state: { fromDashboard: true },}
          }
            >
              <button type="button" class="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {
                  user.user?._id ? "Logout" : "Login"
                }
              </button>
              </Link>

    

          </div>
          
        </div>
      </header>
    </>
  )
};

CartNavbar.defaultProps = {};

export default CartNavbar;
