import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Login2 from "pages/Login";
import DetailReviewPage from "pages/DetailReview";
import MyOrderPage from "pages/MyOrder";
import Signup from "pages/Signup";
// import Profile from "pages/Profile";
const Aboutus = React.lazy(() => import("pages/Aboutus"));
const Contactus = React.lazy(() => import("pages/Contactus"));
const BlogDetail = React.lazy(() => import("pages/BlogDetail"));
const Blog = React.lazy(() => import("pages/Blog"));
const Team = React.lazy(() => import("pages/Team"));
const Wishlist = React.lazy(() => import("pages/Wishlist"));
const Checkout = React.lazy(() => import("pages/Checkout"));
const Profile = React.lazy(() => import("pages/Profile"));
// const DetailReview = React.lazy(() => import("pages/DetailReview"));
const ShopDetailDescription = React.lazy(
  () => import("pages/ShopDetailDescription"),
);
const Shop = React.lazy(() => import("pages/Shop"));
const Homepage = React.lazy(() => import("pages/Homepage"));
const Cart = React.lazy(() => import("pages/Cart"));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/shopdeataildescription"
          element={<ShopDetailDescription />}
        />
        <Route path="/detailreview/:id" element={<DetailReviewPage/>} />
        <Route path="/detailreview" element={<DetailReviewPage/>} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetail" element={<BlogDetail />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/dhiwise-dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myorder" element = {<MyOrderPage/>}/>

      </Routes>
    </React.Suspense>
  );
};

export default ProjectRoutes;
