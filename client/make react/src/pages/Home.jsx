import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [showData, setShowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCookieData, setUserCookieData] = useState("");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const itemsPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("cookieData");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUserCookieData(userData);
    }
  }, []);

  const fetchtotalListing = async () => {
    try {
      const res = await axios.get(`http://localhost:8008/`);
      if (res.data.data) {
        setShowData(res.data.data);
      } else {
        console.error("Data is not an array:", res.data.data);
        setShowData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productid) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/addproduct?id=${productid}`,
        {
          withCredentials: true,
        }
      );
      const cartData = response.data.data;
      navigate(`/addtocart/${cartData.id}`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.get(
        `http://localhost:8008/admin/admindetelproduct?id=${id}`,
        {
          withCredentials: true,
        }
      );
      alert("Product deleted");
      fetchtotalListing();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchtotalListing();
  }, []);

  const filteredProducts = showData.data
    ? showData.data.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const toggleDescription = (productId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Product List</h1>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-black bg-slate-300 rounded-lg p-2 w-7/12"
        />
      </div>

      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentProducts
            .filter((show) => show.stock !== 0)
            .map((show) => (
              <div key={show.id}>
                <div className="relative border rounded-lg p-4 bg-slate-200 shadow hover:scale-105 hover:bg-slate-300 hover:border-sky-400 transition-transform duration-300 border-black">
                  <h2 className="text-xl font-semibold mb-2">
                    Product Name: {show.product_name}
                  </h2>
                  <span className="text-lg text-green-500 font-bold">
                    Price: ${show.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    Old Price: ${show.old_price}
                  </span>
                  <p className="mt-2">Stock: {show.stock}</p>

                  <p className="mt-1 text-gray-700">
                    {expandedDescriptions[show.id]
                      ? show.description
                      : `${show.description.slice(0, 35)}...`} {"  "}
                  <button
                    onClick={() => toggleDescription(show.id)}
                    className="text-blue-500 underline"
                  >
                    {expandedDescriptions[show.id] ? " Read Less" : "Read More"}

                  </button>
                  </p>

                  <button
                    onClick={() => handleAddToCart(show.id)}
                    className="bg-blue-500 text-white font-bold py-2 px-4 mt-3 rounded hover:bg-blue-600 transition duration-200"
                  >
                    <IoMdAdd className="inline-block mr-2 text-2xl" /> Add to
                    Cart
                  </button>
                  {userCookieData.role === "Admin" && (
                    <div className="absolute top-0 right-0 group">
                      <button
                        onClick={() => handleDeleteProduct(show.id)}
                        className="text-red-600 font-bold py-2 px-0 hover:text-red-700"
                      >
                        <MdDelete className="text-4xl" />
                      </button>
                      <span className="absolute -top -left-14 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Delete
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-2xl text-slate-800">
          No products available {searchQuery}
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between mt-4 items-center">
          <p>
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredProducts.length
            )}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredProducts.length)}{" "}
            of {filteredProducts.length} products
          </p>
          <div className="flex">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
