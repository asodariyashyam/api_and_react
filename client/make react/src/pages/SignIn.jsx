import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrorMessage(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length <= 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8008/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok) {
        Cookies.set("cookieData", JSON.stringify(data.data.cookieData), { expires: 7 });
        Cookies.set("token", data.data.token, { expires: 7 }); 

        setResponseMessage("Sign-in successful!");
        setResponseType("success");
        navigate("/"); 
        window.location.reload(); 
      } else {
        setResponseMessage(data.message || "Sign-in failed!");
        setResponseType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong. Please try again.");
      setResponseType("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign In</h2>
      
     

      <form onSubmit={handleSubmit} className="space-y-4">
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
          value={formData.password || ""}
          onChange={handleChange}
          required
          className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
  
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-60 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>
        </div>
      </form>
      
      <Link to="/signup">
        <span className="text-blue-700">Sign up</span>
      </Link>

      {errorMessage && (
        <div className=" text-red-800 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
  
      {responseMessage && (
        <p
          className={`mt-4 ${responseType === "success" ? "text-green-700" : "text-red-700"}`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}
