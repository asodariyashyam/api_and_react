import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

export default function TotalBey() {
  const [buyerProducts, setBuyerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetchBuyerProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8008/admin/admin_product_total",
        {
          withCredentials: true,
        }
      );
      setBuyerProducts(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerProducts();
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
      fetchBuyerProducts();
    } catch (err) {
      console.error("Error removing product:", err.message);
      setError("Failed to remove product");
    }
  };

  const filteredProducts = buyerProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.product_name.toLowerCase().includes(query) ||
      product.price.toString().includes(query) ||
      product.quantity.toString().includes(query) ||
      product.userId.toString().includes(query) ||
      product.email.toLowerCase().includes(query) ||
      product.role.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  var no = 1;

  return (
    <div className="px-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Sell Product List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-black bg-slate-300 rounded-lg p-2 w-7/12"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-2xl text-slate-800 mx-80">
          No products available {searchQuery}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  No
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  Product Name
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  Product Price
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  Quantity
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  Total Price
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden md:table-cell">
                  Buyer ID
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden sm:table-cell">
                  Buyer Email
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden lg:table-cell">
                  Role
                </th>
                <th className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((v, i) => (
                <tr
                  key={i}
                  className="even:bg-slate-200 hover:bg-slate-300 transition-transform duration-300"
                >
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    {no++}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    {v.product_name}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    ${v.price}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    {v.quantity}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    ${v.price * v.quantity}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden md:table-cell">
                    {v.userId}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden sm:table-cell">
                    {v.email}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2 hidden lg:table-cell">
                    {v.role}
                  </td>
                  <td className="border border-neutral-950 px-2 py-1 text-xs md:text-sm lg:px-4 lg:py-2">
                    <button
                      onClick={() => handleremov(v.id)}
                      className="text-red-600"
                    >
                      <TiDelete className="text-2xl md:text-4xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-between mt-4 items-center">
              <p>
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredProducts.length
                )}{" "}
                to{" "}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}{" "}
                of {filteredProducts.length} products
              </p>
              <div className="flex ">
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
      )}
    </div>
  );
}
