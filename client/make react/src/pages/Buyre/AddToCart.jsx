import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export default function AddToCart() {
  const { cartData } = useParams();
  const [userCookieData, setUserCookieData] = useState("");
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false); 
  const navigate = useNavigate();

  function getCookieData() {
    const userCookie = Cookies.get("cookieData");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUserCookieData(userData);
    }
  }

  useEffect(() => {
    fetchProduct();
    getCookieData();
  }, [cartData]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/addproduct?id=${cartData}`
      );
      setProductData(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userCookieData) {
        const response = await axios.post(
          "http://localhost:8008/quantitydata",
          {
            id: productData.id,
            quantity: quantity,
          },
          {
            withCredentials: true,
          }
        );
        alert(
          `Order confirm \n Producr name ${
            productData.product_name
          } \n product price ${
            productData.price
          } \n quantity ${quantity}  \n  total price ${
            productData.price * quantity
          } `
        );
        navigate("/buyerproduct");
      } else {
        alert("Please sign in 👍");
        navigate("/signin");
        return;
      }
    } catch (error) {
      console.error("Error processing purchase:", error);
    }
  };

  if (!productData) {
    return <p className="text-center mt-4">Loading product data...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-11 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Product Description
      </h2>
      <p className="text-lg font-medium mb-2">
        Product Name:{" "}
        <span className="font-semibold">{productData.product_name}</span>
      </p>
      <p className="text-lg font-medium mb-2">
        Price:{" "}
        <span className="text-green-600 font-bold">${productData.price}</span>
      </p>
      <p className="text-lg font-medium mb-2">
        Old Price:{" "}
        <span className="line-through text-red-600">
          ${productData.old_price}
        </span>
      </p>
      <p className="text-lg font-medium mb-2">
        Stock: <span className="font-semibold">{productData.stock}</span>
      </p>
      <p className="text-lg font-medium mb-2">
        ID: <span className="font-semibold">{productData.id}</span>
      </p>

      {/* Collapsible Product Description */}
      <p className="text-lg font-medium mb-2">
        Description:{" "}
        <span className="text-gray-700">
          {showFullDescription
            ? productData.description
            : `${productData.description.substring(0, 115)}...`} 
        </span>
        <button
          className="text-blue-500 underline ml-2"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
      </p>

      <p className="text-xl font-medium mb-2 text-center">
        Total:{" "}
        <span className="font-semibold text-green-600">
          <b>${productData.price * quantity}</b>
        </span>
      </p>

     

      <form onSubmit={handleSubmit} className="mt-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter quantity:
        </label>
        <div className="flex items-center mb-4">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="p-2 bg-red-700 text-white rounded hover:bg-red-600 text-lg"
          >
            <IoIosRemove className="text-2xl" />
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            className="border border-gray-300 rounded-lg p-2 text-center w-16 mx-2"
            min="1"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="p-2 bg-green-700 text-white rounded hover:bg-green-600"
          >
            <IoIosAdd className="text-2xl" />
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            <MdOutlineShoppingCart className="inline-block mr-2 text-2xl font-black" />
            Buy Now
          </button>
        </div>
      </form>
    </div>
  );
}
