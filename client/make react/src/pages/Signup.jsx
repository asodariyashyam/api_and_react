import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrorMessage(null);
    setResponseMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Password and confirm password not match !!");
      return;
    } 
    if (formData.password.length <=5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/singUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage({ message: "Signup successful!", type: "success" });
        navigate("/signin");
      } else {
        setResponseMessage({
          message: data.message || "Signup failed!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up</h2>

     

      <form onSubmit={handleSubmit} className="space-y-4">
      <input
          type="username"
          placeholder="username"
          id="username"
          value={formData.username || ""}
          onChange={handleChange}
          required
          className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          min={5}
          value={formData.password || ""}
          onChange={handleChange}
          required
          className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm_password"
          value={formData.confirm_password || ""}
          onChange={handleChange}
          min={5}
          required
          className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          >
            <option value="">--select--</option>
            <option value="Admin">Admin</option> 
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-60 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>

      <Link to="/signin">
        <span className="text-blue-700">Sign in</span>
      </Link>


      {errorMessage && (
        <div className=" text-red-800 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {responseMessage && (
        <div
          className={`p-2 rounded mb-4 ${
            responseMessage.type === "success"
              ? " text-green-800"
              : " text-red-800"
          }`}
        >
          {responseMessage.message}
        </div>
      )}
    </div>
  );
}
