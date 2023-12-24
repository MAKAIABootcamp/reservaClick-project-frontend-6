import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import { Layout } from '../components/layout/Layout';
import Login from '../pages/login/Login';
import UserProfile from '../pages/userProfile/UserProfile';
import Calendar from '../pages/calendar/Calendar';

const AppRouter = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/calendar' element={<Calendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
