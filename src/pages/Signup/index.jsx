import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'components/container/PageContainer';
import Logo from '../../assets/ecommercelogo.jpg';
import AuthRegister from 'components/AuthRegister';
import CartNavbar from 'components/CartNavbar';

const Signup = () => (
  <Box className="flex flex-col min-h-screen">
    <CartNavbar className="bg-white-A700 flex items-center justify-center md:px-5 px-[75px] py-[35px] w-full" />
    <PageContainer title="Register" description="this is Register page" className="flex-grow">
      <Box
        className="relative flex-grow"
        sx={{
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" className="min-h-full">
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            className="flex justify-center items-center p-4"
          >
            <Card elevation={9} className="p-4 w-full max-w-[500px] z-10">
              <Box className="flex items-center justify-center mb-4">
                <img src={Logo} alt="Logo" className="w-1/3" />
              </Box>
              <AuthRegister
                subtext={
                  <Typography variant="subtitle1" className="text-center text-gray-600 mb-1">
                    Your Social Campaigns
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" justifyContent="center" spacing={1} className="mt-3">
                    <Typography className="text-gray-600 text-sm font-normal">
                      Already have an Account?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/login"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 no-underline"
                    >
                      Sign In
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  </Box>
);

export default Signup;