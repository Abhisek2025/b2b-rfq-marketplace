import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const BuyerDashboard = () => {
  const { user, logout } = useAuth();

  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const openRFQs = rfqs.filter(
  (rfq) => rfq.status === "OPEN"
).length;

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const { data } = await api.get("/rfqs/my");
        setRfqs(data.rfqs || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load RFQs");
      } finally {
        setLoading(false);
      }
    };

    fetchRFQs();
  }, []);

const handleDelete = async (rfqId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this RFQ?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/rfqs/${rfqId}`);

    setRfqs((currentRfqs) =>
      currentRfqs.filter((rfq) => rfq.id !== rfqId)
    );

    toast.success("RFQ deleted successfully");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to delete RFQ"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link
              to="/buyer"
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Buyer Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your requests for quotations
            </p>
          </div>

          <Link
            to="/buyer/rfqs/create"
            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg"
          >
            Create RFQ
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total RFQs</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {rfqs.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Open RFQs</p>

            <p className="text-3xl font-bold text-green-600 mt-2">{openRFQs}</p>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Quotations Received</p>

            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border mt-6 sm:mt-8 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">Your RFQs</h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading RFQs...</p>
            </div>
          ) : rfqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">You haven't created any RFQs yet.</p>

              <Link
                to="/buyer/rfqs/create"
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                Create your first RFQ
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {rfqs.map((rfq) => (
                <div key={rfq.id} className="border rounded-xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rfq.productName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {rfq.description}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                        rfq.status === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {rfq.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Quantity</span>

                      <p className="font-medium text-gray-900">
                        {rfq.quantity}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">Location</span>

                      <p className="font-medium text-gray-900">
                        {rfq.deliveryLocation}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">Deadline</span>

                      <p className="font-medium text-gray-900">
                        {new Date(rfq.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
  <Link
    to={`/buyer/rfqs/${rfq.id}`}
    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg"
  >
    View Details
  </Link>

  <Link
    to={`/buyer/rfqs/${rfq.id}/edit`}
    className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-lg"
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(rfq.id)}
    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg"
  >
    Delete
  </button>
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

export default BuyerDashboard;
