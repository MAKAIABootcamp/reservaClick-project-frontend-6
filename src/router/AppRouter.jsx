import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
