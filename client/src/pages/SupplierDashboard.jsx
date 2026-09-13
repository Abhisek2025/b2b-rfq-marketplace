import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const SupplierDashboard = () => {
  const { user, logout } = useAuth();

  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const { data } = await api.get("/rfqs");
        setRfqs(data.rfqs || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load RFQs");
      } finally {
        setLoading(false);
      }
    };

    fetchRFQs();
  }, []);

  const openRFQs = rfqs.filter((rfq) => rfq.status === "OPEN");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-16 py-3 flex items-center justify-between gap-4">
            <Link
              to="/supplier"
              className="text-xl sm:text-2xl font-bold text-blue-600"
            >
              RFQ Marketplace
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <span className="hidden sm:block text-sm text-gray-600">
                {user?.name}
              </span>

              <button
                onClick={logout}
                className="px-3 py-2 sm:px-4 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Supplier Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Find RFQs and submit competitive quotations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Available RFQs</p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {openRFQs.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total RFQs</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {rfqs.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">My Quotations</p>

            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border mt-6 sm:mt-8 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Available RFQs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Browse open requirements from buyers
              </p>
            </div>

            <Link
              to="/supplier/quotations"
              className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-3 rounded-lg"
            >
              My Quotations
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading RFQs...</p>
            </div>
          ) : openRFQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No open RFQs available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              {openRFQs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="border rounded-xl p-4 sm:p-5 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rfq.productName}
                    </h3>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      OPEN
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {rfq.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>

                      <p className="font-medium text-gray-900">
                        {rfq.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Location</p>

                      <p className="font-medium text-gray-900">
                        {rfq.deliveryLocation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={`/supplier/rfqs/${rfq.id}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                    >
                      View RFQ
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SupplierDashboard;
