import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    old_price: "",
    description: "",
    stock: "",
  });
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8008/api/product/insertproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setResponseMessage("Product added successfully!");
        setFormData({
          product_name: "",
          price: "",
          old_price: "",
          description: "",
          stock: "",
        });
      } else {
        setResponseMessage(data.message || "Failed to add product.");
      }
      navigate("/fetchedata");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-gray-200 rounded-3xl shadow-lg border border-black">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-11">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Product Name"
            id="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Enter Product Price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Enter Old Price"
            id="old_price"
            value={formData.old_price}
            onChange={handleChange}
            className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Enter Stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="border border-black rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Description"
            id="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-black rounded-3xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-80  bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-200"
            >
              <IoIosAdd className="inline-block mr-2 text-3xl" /> Add Product
            </button>
          </div>
        </form>

        {responseMessage && (
          <p
            className={`mt-4 ${
              responseMessage.includes("successfully")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <Link
          to="/fetchedata"
          className=" text-blue-700 text-xl items-center px-4 py-2 mt-6 rounded hover:underline"
        >
          Insert Product
        </Link>
      </div>
        
    </>
  );
}
