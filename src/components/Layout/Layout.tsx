import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="md:px-10 lg:container mx-auto  py-10  ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
