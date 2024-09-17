import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/operations/profileAPI";
import DisplayImage from "./DisplayImage";
import { Button } from "components";

const EditProfileDetails = ({ onClose, additionalDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [data, setData] = useState({
    gender: additionalDetails.gender || "",
    dateOfBirth: additionalDetails.dateOfBirth || "",
    address1: additionalDetails?.address1 || "",
    address2: additionalDetails?.address2 || "",
    city: additionalDetails?.city || "",
    pincode: additionalDetails?.pincode || "",
    state: additionalDetails?.state || "",
    country: additionalDetails?.country || "",
    contactNumber: additionalDetails.contactNumber || "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll on modal close
    };
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails(token, navigate));
    }
    setData({
      gender: additionalDetails.gender || "",
      dateOfBirth: additionalDetails.dateOfBirth || "",
      address1: additionalDetails?.address1 || "",
      address2: additionalDetails?.address2 || "",
      city: additionalDetails?.city || "",
      pincode: additionalDetails?.pincode || "",
      state: additionalDetails?.state || "",
      country: additionalDetails?.country || "",
      contactNumber: additionalDetails.contactNumber || "",
    });
    localStorage.setItem("userProfilePic", user?.profilePic);
  }, [dispatch, user, navigate, additionalDetails, token]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.editAdditionalDetails.url, {
      method: SummaryApi.editAdditionalDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      dispatch(getUserDetails(token, navigate));
      onClose();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
    setOpenFullScreenImage(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black-900 bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white-A700 rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Profile Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <CgClose className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[70vh]"
        >
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleOnChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required={key !== "address2"}
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button
              className="common-pointer bg-bluegray-900 cursor-pointer font-rubik font-semibold leading-[normal] py-3.5 text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
              type="submit"
              // onClick={handleBuyProduct}
            >
              Edit Address
            </Button>
            {/* <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Address
            </button> */}
          </div>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default EditProfileDetails;
