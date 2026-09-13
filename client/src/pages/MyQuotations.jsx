import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const { data } = await api.get("/quotations/my");
        setQuotations(data.quotations || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load quotations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link
              to="/supplier"
              className="text-xl sm:text-2xl font-bold text-blue-600"
            >
              RFQ Marketplace
            </Link>

            <Link
              to="/supplier"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Quotations
        </h1>

        <p className="text-gray-500 mt-1">
          Track quotations you have submitted
        </p>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Loading quotations...
            </p>
          </div>
        ) : quotations.length === 0 ? (
          <div className="bg-white border rounded-xl mt-8 p-10 text-center">
            <p className="text-gray-500">
              You haven't submitted any quotations yet.
            </p>

            <Link
              to="/supplier"
              className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
            >
              Browse RFQs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
            {quotations.map((quotation) => (
              <div
                key={quotation.id}
                className="bg-white border rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      RFQ #{quotation.rfqId}
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mt-1">
                      {quotation.rfq?.productName ||
                        "RFQ"}
                    </h2>
                  </div>

                  <p className="text-xl font-bold text-blue-600">
                    ₹{Number(quotation.price).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <p className="text-sm text-gray-500">
                      Delivery
                    </p>

                    <p className="font-medium mt-1">
                      {quotation.estimatedDeliveryTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Submitted
                    </p>

                    <p className="font-medium mt-1">
                      {new Date(
                        quotation.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {quotation.message && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-5">
                    <p className="text-sm text-gray-700">
                      {quotation.message}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyQuotations;