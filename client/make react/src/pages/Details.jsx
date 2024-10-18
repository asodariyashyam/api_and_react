import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Details() {
  const [adminDetails, setAdminDetails] = useState({ data: [] });
  const [sellerDetails, setSellerDetails] = useState({ data: [] });
  const [buyerDetails, setBuyerDetails] = useState({ data: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDetailAdmin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/admin/adminShowseller`,
        { withCredentials: true }
      );
      setAdminDetails(response.data);
    } catch (error) {
      console.error("Error fetching admin details:", error);
      setError("Failed to fetch admin details.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetailSeller = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/admin/sellerShowseller`,
        { withCredentials: true }
      );
      setSellerDetails(response.data);
    } catch (error) {
      console.error("Error fetching seller details:", error);
      setError("Failed to fetch seller details.");
    }
  };

  const fetchDetailBuyer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/admin/buyerShowseller`,
        { withCredentials: true }
      );
      setBuyerDetails(response.data);
    } catch (error) {
      console.error("Error fetching buyer details:", error);
      setError("Failed to fetch buyer details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(`http://localhost:8008/admin/admindeteldata?id=${id}`, {
        withCredentials: true,
      });
      alert("Delete record!");
      fetchDetailAdmin();
      fetchDetailSeller();
      fetchDetailBuyer();
    } catch (error) {
      console.error("Error deleting:", error);
      setError("Failed to delete record.");
    }
  };

  useEffect(() => {
    fetchDetailAdmin();
    fetchDetailSeller();
    fetchDetailBuyer();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const filteredAdminData = adminDetails.data.filter((admin) =>
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSellerData = sellerDetails.data.filter((seller) =>
    seller.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBuyerData = buyerDetails.data.filter((buyer) =>
    buyer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="px-4 md:px-20">
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-black bg-slate-300 rounded-lg p-2 w-7/12"
            />
        </div>

        <h1 className="text-center text-xl md:text-2xl font-semibold mb-4">
          Admin Details
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-500 text-center">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-neutral-950 p-2">Admin ID</th>
                <th className="border border-neutral-950 p-2">Admin Email</th>
                <th className="border border-neutral-950 p-2">Admin Role</th>
                <th className="border border-neutral-950 p-2">Admin Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdminData.map((admin, index) => (
                <tr key={index}>
                  <td className="border border-neutral-950 p-2">{admin.id}</td>
                  <td className="border border-neutral-950 p-2">{admin.email}</td>
                  <td className="border border-neutral-950 p-2">{admin.role}</td>
                  <td className="border border-neutral-950 p-2">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="ml-5 mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                    >
                      <MdDelete className="inline-block mr-2 text-2xl" /> Delete Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 md:px-20 mt-8">
        <h1 className="text-center text-xl md:text-2xl font-semibold mb-4">
          Seller Details
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-500 text-center">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-neutral-950 p-2">Seller ID</th>
                <th className="border border-neutral-950 p-2">Seller Email</th>
                <th className="border border-neutral-950 p-2">Seller Role</th>
                <th className="border border-neutral-950 p-2">Seller Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellerData.map((seller, index) => (
                <tr key={index}>
                  <td className="border border-neutral-950 p-2">{seller.id}</td>
                  <td className="border border-neutral-950 p-2">{seller.email}</td>
                  <td className="border border-neutral-950 p-2">{seller.role}</td>
                  <td className="border border-neutral-950 p-2">
                    <button
                      onClick={() => handleDelete(seller.id)}
                      className="ml-5 mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                    >
                      <MdDelete className="inline-block mr-2 text-2xl" /> Delete Seller
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 md:px-20 mt-8">
        <h1 className="text-center text-xl md:text-2xl font-semibold mb-4">
          Buyer Details
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-neutral-950 p-2">Buyer ID</th>
                <th className="border border-neutral-950 p-2">Buyer Email</th>
                <th className="border border-neutral-950 p-2">Buyer Role</th>
                <th className="border border-neutral-950 p-2">Buyer Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuyerData.map((buyer, index) => (
                <tr key={index}>
                  <td className="border border-neutral-950 p-2">{buyer.id}</td>
                  <td className="border border-neutral-950 p-2">{buyer.email}</td>
                  <td className="border border-neutral-950 p-2">{buyer.role}</td>
                  <td className="border border-neutral-950 p-2">
                    <button
                      onClick={() => handleDelete(buyer.id)}
                      className="ml-5 mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                    >
                      <MdDelete className="inline-block mr-2 text-2xl" /> Delete Buyer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
