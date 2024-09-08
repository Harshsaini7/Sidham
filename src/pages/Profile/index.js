import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../common/index';
import EditProfileDetails from '../../components/BuyerEditDetails';
import { getUserDetails } from '../../services/operations/profileAPI';

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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white font-raleway">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-200 mb-8 text-center border-b border-gray-700 pb-4">User Dashboard</h1>

        <div className="flex items-center bg-gray-800 shadow-lg rounded-lg p-6 mb-8 sm:flex-row flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <img 
            src={user.profilePic || localStorage.getItem('userProfilePic')} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mr-6 border-4 border-gray-600 hover:border-gray-400 transition-colors duration-300" 
          />
          <div>
            <h2 className="text-2xl font-semibold text-white">Name: {user.name}</h2>
            <p className="text-gray-400">Email: {user.email}</p>
          </div>
        </div>

        <div className="bg-gray-700 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-200 mb-4 text-center">Account Information</h3>

          <div className='flex justify-center gap-3 mb-6'>
            <button className='px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg'>
              My Orders
            </button>
            <button className='px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-500 transition duration-300 shadow-md hover:shadow-lg' onClick={() => setOpenModal(true)}>
              Edit Details
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'
          
          onClick={() => setOpenModal(true)}>
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
              <div key={label} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                <strong className="block text-gray-200">{label}:</strong> 
                <p className="text-gray-400">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {openModal && <EditProfileDetails onClose={() => setOpenModal(false)} additionalDetails={additionalDetails} />}
    </div>
  );
};

export default Profile;
