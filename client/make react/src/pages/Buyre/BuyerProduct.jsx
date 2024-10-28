import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

export default function BuyerProduct() {
  const [buyerProducts, setBuyerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchbuyeproduct = async () => {
    try {
      const response = await axios.get("http://localhost:8008/buyer_product", {
        withCredentials: true,
      });
      setBuyerProducts(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchbuyeproduct();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleremov = async (id) => {
    try {
      await axios.get(`http://localhost:8008/removecart?id=${id}`, {
        withCredentials: true,
      });
      alert("Product removed");
      fetchbuyeproduct();
    } catch (err) {
      console.error("Error removing product:", err.message);
      setError("Failed to remove product");
    }
  };

  const filteredProducts = buyerProducts.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-20">
       <h1 className="text-3xl font-bold mb-4 text-center">Buy Product List</h1>
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
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((v, i) => (
              <div
                key={i}
                className="relative shadow-lg bg-slate-200 rounded-lg p-6 border border-black hover:scale-105 transition-transform hover:border-t-sky-400 hover:bg-slate-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Product Name: {v.product_name}
                </h2>
                <p className="text-gray-700 text-lg">
                  <b>Product Price:</b> ${v.price}
                </p>
                <p className="text-gray-700 text-lg">
                  <b>Quantity:</b> {v.quantity}
                </p>
                <p className="text-gray-700 text-lg">
                  <b>Total Price:</b> ${v.price * v.quantity}
                </p>

                <div className="absolute top-0 right-0 group">
                  <button
                    onClick={() => handleremov(v.id)}
                    className="text-red-600 py-0 px-0"
                  >
                    <TiDelete className="text-4xl" />
                  </button>
                  <span className="absolute -bottom-0 -left-14 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Remove
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between mt-4 items-center">
          <p className="mx-72">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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
    </div>
  );
}
