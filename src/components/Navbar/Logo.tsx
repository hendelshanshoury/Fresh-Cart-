import React from "react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <NavLink to={""} className="-m-1.5 p-1.5 flex lg:flex-1 items-center">
        <i className="fa-solid fa-cart-shopping text-main text-2xl mx-3" />
        <h1 className="text-main text-xl font-bold pb-1">Fresh Cart</h1>
        <span className="sr-only">Your Company</span>
      </NavLink>
    </>
  );
}
