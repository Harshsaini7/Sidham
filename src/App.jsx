// src/App.js
import React from "react";
import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { getUserDetails } from './services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import { setCartCount } from './slices/cartSlice';
import toast from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
      const fetchData = async () => {
        const response = await fetch(SummaryApi.cartProductView.url, {
          method: SummaryApi.cartProductView.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        console.log("response data", responseData);
        if (responseData.success) {
          console.log("cart count", responseData?.cart.length);
          dispatch(setCartCount(responseData?.cart.length));
        } else {
          toast.error("Something went wrong while fetching cart data");
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    /**user Details cart product */
    // fetchUserAddToCart();

  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails: getUserDetails, // user detail fetch 
        cartProductCount, // current user add to cart product count
        fetchUserAddToCart
      }}>
        <ToastContainer position='top-center' />
        <Routes />
      </Context.Provider>
    </>
  );
}

export default App;
