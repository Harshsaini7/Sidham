import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate import
import { useDispatch } from 'react-redux'; // Added useDispatch import
import CustomTextField from 'components/forms/theme-elements/CustomTextField';
import toast from "react-hot-toast"
import { login } from 'services/operations/authAPI';
import GoogleLoginButton from 'components/GoogleLoginButton';


const AuthLogin = ({ title, subtitle, subtext }) => {
  const clientId = '571441638341-45rnsf56sp2qa2tr5tbdd31m9b3jin7n.apps.googleusercontent.com';
  const [showPassword, setShowPassword] = useState(false); // Correctly setting up state
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
// };

const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    // toast.success("Clicked");
    dispatch(login(data.email, data.password, navigate));
};

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggling password visibility
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
      <GoogleLoginButton loginType='login' />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            variant="outlined"
            fullWidth
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button onClick={handlePasswordToggle}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Button>
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        
          <button type="submit" className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full "

          onClick={handleSubmit}
          >Log In</button>
        
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
