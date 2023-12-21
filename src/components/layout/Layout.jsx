import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

export const Layout = () => {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};
