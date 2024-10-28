import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function FetchData() {
  const [data, setData] = useState([]);
  const [deletingProductId, setDeletingProductId] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const itemsPerPage = 9;

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/product/fetchedata", {
        withCredentials: true,
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProductDelete = async (id) => {
    setDeletingProductId(id);
    try {
      await axios.get(`/api/product/deleteproduct?id=${id}`, {
        withCredentials: true,
      });
      fetchData();
      alert("Product Deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingProductId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentProducts = filteredData.slice(
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
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Sell Products</h1>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-black bg-slate-300 rounded-lg p-2 w-6/12"
        />
      </div>

      {currentProducts.length === 0 ? (
        <p className="text-2xl text-slate-800 mx-80">No products available {searchQuery}</p>
      ) : (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((item, index) => (
              <div
                key={index}
                className="shadow-lg rounded-lg p-6 border border-black bg-slate-200 hover:scale-105 transition-transform hover:border-sky-400 hover:bg-slate-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <b>Product Name:</b> {item.product_name}
                </h2>
                <p className="text-lg text-gray-600">
                  <span className="text-lg text-green-500 font-bold">Price: ${item.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">Old Price: ${item.old_price}</span>
                </p>

                <p className="text-lg text-gray-600">
                  <b>Stock:</b> <span className="font-semibold">{item.stock}</span>
                </p>

                <p className="text-gray-700 mt-2">
                  <b>Message:</b> {expandedDescriptions[item.id] ? item.description : `${item.description.slice(0, 40)}...`} {" "}
                  <button
                    onClick={() => toggleDescription(item.id)}
                    className="text-blue-500 underline"
                  >
                    {expandedDescriptions[item.id] ? "Read Less" : "Read More"}
                  </button>
                </p>

                <button
                  onClick={() => handleProductDelete(item.id)}
                  className={`w-32 h-10 text-white rounded-md mt-4 transition-colors duration-200 ${
                    deletingProductId === item.id ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                  }`}
                  disabled={deletingProductId === item.id}
                >
                  <MdDelete className="inline-block mr-2 text-2xl" />
                  {deletingProductId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between mt-4 items-center">
              <p className="mx-80">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} products
              </p>
              <div className="flex mr-72">
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
                      currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
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
        </>
      )}
    </div>
  );
}
