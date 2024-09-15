import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { Img, SelectBox, Text, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "services/operations/authAPI";

import "./index.css";

const homeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CartNavbar = (props) => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useSelector((state) => state.cart);

  const handleLogout = async () => {
    dispatch(logout(navigate));
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <header
      className={`${props.className} bg-white-A700 shadow-md flex flex-col`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Img
              className="h-[30px] w-[90px]"
              src="images/img_car.svg"
              alt="car"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="lg-flex2 space-x-6 md-hidden2">
            <SelectBox
              className="font-rubik text-black-900 text-lg tracking-[-0.50px]"
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
              className="text-gray-700 hover:text-black-900 text-lg tracking-[-0.50px]"
              to="/shop"
            >
              Shop
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 text-lg tracking-[-0.50px]"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 text-lg tracking-[-0.50px]"
              to="/aboutus"
            >
              About
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 text-lg tracking-[-0.50px]"
              to="/contactus"
            >
              Contact
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 text-lg tracking-[-0.50px]"
              to="/team"
            >
              Team
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user.user?._id && (
              <div className="relative profile-dropdown">
                <button onClick={toggleProfileDropdown}>
                  <FaRegUserCircle className="h-8 w-8 text-gray-900 md-hidden2" />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 bg-white-A700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/myorder" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 bg-white-A700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Order
                    </Link>
                  </div>
                )}
              </div>
            )}
            {user.user?._id && (
              <div className="relative">
                <Link to="/cart">
                  <Img
                    className="h-8 w-8"
                    src="images/cart_test_icon.png"
                    alt="icon"
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black-900 text-white-A700 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <Link to={user.user?._id ? "/" : "/login"}>
              <button
                onClick={user.user?._id ? handleLogout : null}
                className="bg-gray-800 text-white-A700 hover:bg-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {user.user?._id ? "Logout" : "Login"}
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm-flex md-hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {menuOpen && (
        <div className="sm-block lg-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/shop"
            >
              Shop
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/aboutus"
            >
              About
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/contactus"
            >
              Contact
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/team"
            >
              Team
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/myorder"
            >
              My Order
            </Link>
            <Link
              className="text-gray-700 hover:text-black-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/profile"
            >
              My Profile
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};

CartNavbar.defaultProps = {};

export default CartNavbar;