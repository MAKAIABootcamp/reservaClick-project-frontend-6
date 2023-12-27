import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import { Layout } from '../components/layout/Layout';
import Login from '../pages/login/Login';
import UserProfile from '../pages/userProfile/UserProfile';
import Calendar from '../pages/calendar/Calendar';
import Reservation from '../pages/my-reservation/Reservation';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={true} />}>
            <Route element={<Layout />}>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/reservation' element={<Reservation />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes isAuthenticated={true} />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
