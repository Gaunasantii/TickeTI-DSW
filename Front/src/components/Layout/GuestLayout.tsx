import React, { type ReactNode } from "react";

import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { Footer } from "./Footer";

export const GuestLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default GuestLayout;