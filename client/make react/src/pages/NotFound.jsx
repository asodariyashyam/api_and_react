import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/2704133.jpg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <Link
        to="/"
        className="w-1/2 md:w-1/3 mb-6 rounded-lg shadow-lg p-3 text-center"
      >
        <img src={notFoundImage} alt="404 Not Found" className="mx-auto" />
        <h1 className="text-6xl font-bold">404 ERROR</h1>
        <p className="mt-6 px-4 py-2 bg-blue-600 text-white w-48 rounded hover:bg-blue-700 transition transform hover:scale-105 duration-300 mx-auto">
          Go Back Home
        </p>
      </Link>
    </div>
  );
}
