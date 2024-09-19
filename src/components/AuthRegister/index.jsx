import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from 'components/forms/theme-elements/CustomTextField';
import GoogleLoginButton from 'components/GoogleLoginButton';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const ACCOUNT_TYPE = {
    BUYER: "Buyer",
    SELLER: "Seller",
    ADMIN: "Admin",
  };
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.BUYER);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Here you would typically handle the registration logic
  };

  return (
    <>
      {/* Box with center alignment using Material-UI */}
      <Box display="flex" justifyContent="center" mb={4} mt={2}>
        <GoogleLoginButton loginType={'signup'} accountType={accountType} />
      </Box>

      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword" mb="5px" mt="25px">
            Confirm Password
          </Typography>
          <CustomTextField
            id="confirmPassword"
            variant="outlined"
            fullWidth
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Stack>

        <button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="text-white-A700 bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full "
        >
          Sign Up
        </button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
