//

import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";
import Logo from "./logo";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let { updateCart } = useContext(CartContext);

  const { wishlistData } = useContext(WishListContext);
  console.log(updateCart?.data?.data?.numOfCartItems);

  const [openUser, setOpenUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <header className="relative z-50 bg-primary">
      <nav className="flex items-center justify-between p-3 lg:px-15 shadow-md">
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center">
          <div>
            {userToken && (
              <div className="flex justify-center  gap-6">
                <NavLink to="/cart" className="navicon relative">
                  <i className="fa-solid fa-cart-shopping text-main hover:text-white" />
                  {updateCart?.data?.data?.numOfCartItems > 0 && (
                    <span className="absolute right-[30px] top-[-8px]  bg-main p-px px-1 w-8 h-8 rounded-full text-center text-lg text-white">
                      {updateCart?.data?.data?.numOfCartItems}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/wishlist" className="navicon relative">
                  <i className="fa-solid fa-heart text-red-600" />
                  {wishlistData?.data?.count > 0 && (
                    <span className="absolute right-[30px] top-[-8px]  bg-main p-px px-1 w-8 h-8 rounded-full text-center text-lg text-white">
                      {wishlistData?.data?.count}
                    </span>
                  )}
                </NavLink>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2.5 text-main cursor-pointer"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? (
              <svg
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav Links */}
        {userToken && (
          <div className="hidden lg:flex lg:gap-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "navmd activemd" : "navmd"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Products"
              className={({ isActive }) =>
                isActive ? "navmd activemd" : "navmd"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/Categories"
              className={({ isActive }) =>
                isActive ? "navmd activemd" : "navmd"
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive ? "navmd activemd" : "navmd"
              }
            >
              Brands
            </NavLink>
            <NavLink
              to="/allorder"
              className={({ isActive }) =>
                isActive ? "navmd activemd" : "navmd"
              }
            >
              AllOrder
            </NavLink>
          </div>
        )}

        {/* Desktop Icons & User Menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userToken && (
            <>
              <NavLink to="/cart" className="navicon relative">
                <i className="fa-solid fa-cart-shopping text-main" />
                {updateCart?.data?.data?.numOfCartItems > 0 && (
                  <span className="absolute right-[30px] top-[-8px]  bg-main p-px px-1 w-8 h-8 rounded-full text-center text-lg text-white">
                    {updateCart?.data?.data?.numOfCartItems}
                  </span>
                )}
              </NavLink>
              <NavLink to="/wishlist" className="navicon relative">
                <i className="fa-solid fa-heart text-red-600" />
                {wishlistData?.data?.count > 0 && (
                  <span className="absolute right-[30px] top-[-8px]  bg-main p-px px-1 w-8 h-8 rounded-full text-center text-lg text-white">
                    {wishlistData?.data?.count}
                  </span>
                )}
              </NavLink>
            </>
          )}

          {/* User Icon */}
          <div className="relative">
            <button
              onClick={() => setOpenUser(!openUser)}
              className="navicon text-main hover:text-primary-light"
            >
              <i className="fa-solid fa-user" />
            </button>
            {openUser && (
              <div className="absolute right-4 mt-4 w-45 bg-primary py-2 px-1 text-base border border-gray-200 shadow-lg rounded-md z-50">
                {userToken ? (
                  <NavLink
                    to="/register"
                    className=" px-4 py-2 text-main font-semibold hover:bg-primary-light flex  items-center"
                    onClick={() => {
                      setOpenUser(false);
                      logout();
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket text-xl me-2" />
                    Log Out
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-main font-semibold hover:bg-primary-light"
                      onClick={() => setOpenUser(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/"
                      className="block px-4 py-2 text-main font-semibold hover:bg-primary-light"
                      onClick={() => setOpenUser(false)}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-primary ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } lg:hidden`}
      >
        <div className="py-6 px-4 text-center flex flex-col gap-4">
          {userToken && (
            <>
              <NavLink
                to="/home"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "navsm activesm" : "navsm"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Products"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "navsm activesm" : "navsm"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/Categories"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "navsm activesm" : "navsm"
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/brands"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "navsm activesm" : "navsm"
                }
              >
                Brands
              </NavLink>
              <NavLink
                to="/allorder"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "navsm activesm" : "navsm"
                }
              >
                Allorder
              </NavLink>
            </>
          )}
          <div className="flex items-center justify-center flex-col gap-4 mt-4 relative">
            <div>
              <div className="flex items-center gap-3 mx-2">
                {userToken ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className=" button-custom  "
                  >
                    <i className="fa-solid fa-right-from-bracket text-lg me-2 mb-2 mt-1" />
                    Log Out
                  </button>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className=" button-custom "
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className=" button-custom "
                      >
                        Register
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
