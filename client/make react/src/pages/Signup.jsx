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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setResponseMessage("Signup successful!");
      } else {
        setResponseMessage(data.message || "Signup failed!");
      }
      navigate('/signin')
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="border rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
  
        <input
          type="password"
          placeholder="Password"
          id="password"
          min={5}
          value={formData.password || ""}
          onChange={handleChange}
          required
          className="border rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
  
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm_password"
          value={formData.confirm_password || ""}
          onChange={handleChange}
          min={5}
          required
          className="border rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
  
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
            Select Role
          </label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">--select--</option>
            <option value="Admin">Admin</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
        </div>
  
        {/* Centering the button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-60 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>
  
      <Link to="/signin">
        <span className="text-blue-700">Sign in</span>
      </Link>
    </div>
  );
  
}
