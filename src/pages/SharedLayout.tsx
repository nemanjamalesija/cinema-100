import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const SharedLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default SharedLayout;
