import React from "react";
import Logo from "../Navbar/logo";
import masterCard from "../../assets/images/MasterCard-Logo.png";
import payPal from "../../assets/images/PayPal.png";
import amazonPay from "../../assets/images/Amazon_Pay_logo.png";
import visa from "../../assets/images/visaLogo.png";
import American from "../../assets/images/American-Express-Color.png";
import appstore from "../../assets/images/get-apple-store.png";
import googleplay from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="w-full bg-primary text-main lg:px-10 px-2">
        <div className="w-full  mx-auto pt-6 md:pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  px-2 md:px-5 lg:px-10   ">
          {/* Column 1: Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold  relative w-fit text-center  ">
              Let Us Help You
            </h3>

            <ul className="text-lg ms-2 py-4">
              <li className="hover:underline cursor-pointer">Help</li>
              <li className="hover:underline cursor-pointer">
                Shipping & Delivery
              </li>
              <li className="hover:underline cursor-pointer">
                Returns & Replacements
              </li>
              <li className="hover:underline cursor-pointer">
                Recalls and Product Safety Alerts
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="">
            <h3 className="text-2xl font-bold mb-2 relative w-fit text-center">
              Support
            </h3>
            <ul className="text-lg ms-2 py-4">
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <span className="hover:underline cursor-pointer">
                  +2 01067277597
                </span>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <span className="hover:underline cursor-pointer">
                  eng.hendelshanshoury@gmail.com
                </span>
              </li>
              <li>
                <span className="font-semibold">Address:</span>
                <span className="hover:underline cursor-pointer">
                  Kafr El-Sheikh, Egypt{" "}
                </span>
              </li>
            </ul>
          </div>
          {/* Column 3: Support */}
          <div className="">
            <h3 className="text-2xl font-bold mb-2 relative w-fit text-center">
              About Us
            </h3>
            <ul className="text-lg ms-2 py-4">
              <li className="hover:underline cursor-pointer">
                {" "}
                Privacy Policy
              </li>
              <li className="hover:underline cursor-pointer"> Events</li>
              <li className="hover:underline cursor-pointer"> Our Stop </li>
              <li>
                <h4 className="text-xl font-semibold pt-3"> Follow Us Now:</h4>{" "}
                <ul className="flex  py-4 list-none ">
                  <li className="r mx-2 hover:cursor-pointer hover:shadow-input">
                    <a
                      href="#"
                      className=" anchr w-10 h-10 bg-white flex justify-center items-center   rounded-full hover:bg-main hover:text-white"
                    >
                      <i className="fa-brands fa-facebook-f text-lg "></i>
                    </a>
                  </li>
                  <li className="r mx-2">
                    <a
                      href="#"
                      className=" anchr w-10 h-10 bg-white flex justify-center items-center   rounded-full hover:bg-main hover:text-white"
                    >
                      <i className="fa-brands fa-twitter text-lg"></i>
                    </a>
                  </li>
                  <li className="r mx-2">
                    <a
                      href="#"
                      className=" anchr w-10 h-10 bg-white flex justify-center items-center   rounded-full hover:bg-main hover:text-white"
                    >
                      <i className="fa-brands fa-google-plus-g text-lg"></i>
                    </a>
                  </li>
                  <li className=" mx-2">
                    <a
                      href="#"
                      className=" anchr w-10 h-10 bg-white flex justify-center items-center   rounded-full hover:bg-main hover:text-white"
                    >
                      <i className="fa-brands fa-pinterest text-lg"></i>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-2 md:px-5 lg:px-10 py-4 md:py-0">
          <h4 className="font-bold  text-2xl py-2  ">Get the FreshCart app</h4>
          <p className="text-lg pb-4">
            We will send you a link, open it on your phone to download the app
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2  ">
            <div className="relative w-full md:w-[80%] lg:w-[85%] flex items-center justify-center">
              <span className="absolute inset-y-0 left-0 pl-5 flex items-center">
                <i className="fa-solid fa-envelope text-main text-base mt-1 pb-.5" />
              </span>

              <input
                type="email"
                className="input-custom w-full pl-12 py-2 rounded-3xl placeholder:translate-y-[1px]"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="button"
              className="button-custom   md:w-[20%] lg:w-[15%] sm:w-fit block mx-auto text-center px-6 py-2.5 font-medium text-primary rounded-3xl transition cursor-pointer"
            >
              Share App Link
            </button>
          </div>
        </div>

        <div className="flex flex-col  lg:flex-row  lg:justify-between lg:items-center w-full px-2 md:px-5 lg:px-10 py-5 ">
          <div className="py-4 flex-col lg:flex   lg:flex-row items-center gap-4 ">
            <p className="font-bold text-2xl py-2 ">Payment Partners:</p>
            <div className="flex items-center lg:pt-4 gap-4  ">
              <img src={amazonPay} alt="Amazon Pay" className="h-5 w-auto  " />
              <img src={American} alt="Amazon Pay" className="h-12 w-auto  " />
              <img src={payPal} alt="PayPal" className="h-12 w-auto   " />
              <img src={visa} alt="MasterCard" className="h-12 w-auto   " />
              <img
                src={masterCard}
                alt="MasterCard"
                className="h-12 w-auto   "
              />
            </div>
          </div>
          <div className="py-4 flex-col lg:flex lg:flex-row items-center gap-4">
            <p className="font-bold text-2xl py-2">Get App Now:</p>
            <div className="flex items-center gap-4 lg:pt-2">
              <img src={appstore} alt="App Store" className="h-13 w-auto  " />
              <img
                src={googleplay}
                alt="Google Play"
                className="h-14 w-auto  "
              />
            </div>
          </div>
        </div>
        {/* Footer bottom */}
      </footer>
      <div className="border-t text-center border-gray-200 py-5 text-white bg-main text-base">
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </div>
    </>
  );
}
