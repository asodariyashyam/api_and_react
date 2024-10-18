import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LuUserX2 } from "react-icons/lu";

export default function Header() {
  const [userCookieData, setUserCookieData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("cookieData");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUserCookieData(userData);
    }
  }, []);

  const handalSignopu = () => {
    Cookies.remove("cookieData");
    Cookies.remove("token");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md mb-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
        <Link to="/" className="text-white font-bold text-center sm:text-left">
          email:{" "}
          {userCookieData.email || (
            <LuUserX2 className="inline-block mr-2 text-2xl" />
          )}{" "}
          <br /> & <br /> role: {userCookieData.role || " "}
        </Link>

        <nav className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4 text-xl">
          <Link
            to="/"
            className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
          >
            Home
          </Link>

          {userCookieData.role === "Admin" ||
          userCookieData.role === "Seller" ||
          userCookieData.role === "Buyer" ? (
            <Link
              to="/buyerproduct"
              className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
            >
              Buyer Product
            </Link>
          ) : null}

          {userCookieData.role === "Admin" ||
          userCookieData.role === "Seller" ? (
            <>
              <Link
                to="/addproduct"
                className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
              >
                Add Product
              </Link>
              <Link
                to="/fetchedata"
                className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
              >
                Insert Total Data
              </Link>
            </>
          ) : null}

          {userCookieData.role === "Admin" ? (
            <>
              <Link
                to="/details"
                className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
              >
                Details
              </Link>
              <Link
                to="/totalBey"
                className="text-white hover:text-gray-200 hover:underline transition-colors duration-200"
              >
                Total sell
              </Link>
            </>
          ) : null}
        </nav>

        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
          <Link
            to="/signin"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
          >
            Sign Up
          </Link>

          {userCookieData ? (
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
              onClick={handalSignopu}
            >
              Sign Out
            </button>
          ) : (
            " "
          )}
        </div>
      </div>
    </header>
  );
}
