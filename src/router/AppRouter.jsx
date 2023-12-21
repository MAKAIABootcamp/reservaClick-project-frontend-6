import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';

const AppRouter = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
