import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../common/index';
import EditProfileDetails from '../../components/BuyerEditDetails';
import { getUserDetails } from '../../services/operations/profileAPI';
import CartNavbar from 'components/CartNavbar';
import CartSectionfooter from "components/CartSectionfooter";
import { Button, Img, Text } from "components";
import Footer from 'components/Footer';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({});

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
  }, [dispatch, navigate, token, user]);

  useEffect(() => {
    fetchAdditionalDetails();
    if (user) {
      setAdditionalDetails(user.additionalDetails ?? {});
    }
  }, [user, openModal]);

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 flex flex-col font-rubik sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
      <div className="flex flex-col md:gap-10 gap-[75px] items-start justify-start w-full">
        <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
        <div className="flex flex-col font-poppins items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <div className="flex flex-col items-start justify-start max-w-[1290px] mx-auto w-full">
            <div className="flex md:flex-col flex-row gap-8 items-start justify-between w-full">
              <div className="flex flex-col gap-6 items-start justify-start md:w-full w-1/3">
                <div className="bg-white-A700 flex flex-col gap-4 items-center justify-start p-6 rounded-[10px] shadow-bs w-full">
                  <Img
                    className="h-24 w-24 rounded-full"
                    src={user.profilePic || localStorage.getItem('userProfilePic')}
                    alt="Profile"
                  />
                  <div className="flex flex-col gap-2 items-center justify-start">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px]"
                      size="txtRalewayRomanSemiBold24"
                    >
                      {user.name}
                    </Text>
                    <Text
                      className="text-base text-gray-500 tracking-[-0.50px]"
                      size="txtRubikRegular16"
                    >
                      {user.email}
                    </Text>
                  </div>
                </div>
                <Button
                  className="bg-bluegray-900 cursor-pointer font-semibold min-w-[170px] py-[15px] rounded-[5px] text-center text-lg text-yellow-100 tracking-[-0.50px] w-full"
                  onClick={() => setOpenModal(true)}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                <Text
                  className="text-2xl md:text-[22px] text-black-900 sm:text-xl tracking-[-0.50px]"
                  size="txtRalewayRomanSemiBold24"
                >
                  Account Information
                </Text>
                <div className="bg-white-A700 flex flex-col gap-4 items-start justify-start p-6 rounded-[10px] shadow-bs w-full">
                  {[
                    { label: 'Address Line 1', value: additionalDetails.address1 ?? "Please Add Address 1" },
                    { label: 'Address Line 2', value: additionalDetails.address2 ?? "Please Add Address 2" },
                    { label: 'City', value: additionalDetails.city ?? "Please Add City" },
                    { label: 'Pincode', value: additionalDetails.pincode ?? "Please Add Pincode" },
                    { label: 'State', value: additionalDetails.state ?? "Please Add State" },
                    { label: 'Country', value: additionalDetails.country ?? "Please Add Country" },
                    { label: 'Gender', value: additionalDetails.gender ?? "Please Add Gender" },
                    { label: 'Date of Birth', value: additionalDetails.dateOfBirth ?? "Please Add Date of Birth" },
                    { label: 'Contact Number', value: additionalDetails.contactNumber ?? "Please Add Contact Number" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-2 items-start justify-start w-full">
                      <Text
                        className="text-base text-gray-500 tracking-[-0.50px]"
                        size="txtRubikRegular16"
                      >
                        {label}
                      </Text>
                      <Text
                        className="text-lg text-black-900 tracking-[-0.50px]"
                        size="txtRalewayRomanSemiBold18"
                      >
                        {value}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />

      {openModal && <EditProfileDetails onClose={() => setOpenModal(false)} additionalDetails={additionalDetails} />}
    </div>
  );
};

export default Profile;