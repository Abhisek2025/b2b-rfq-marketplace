import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const BuyerRFQDetails = () => {
  const { id } = useParams();

  const [rfq, setRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [rfqResponse, quotationResponse] = await Promise.all([
          api.get(`/rfqs/${id}`),
          api.get(`/quotations/rfq/${id}`),
        ]);

        setRfq(rfqResponse.data.rfq);
        setQuotations(quotationResponse.data.quotations || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load RFQ details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500">Loading RFQ details...</p>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            RFQ not found
          </h1>

          <Link
            to="/buyer"
            className="inline-block mt-4 text-blue-600 font-medium hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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

            <Link
              to="/buyer"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white border rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                RFQ #{rfq.id}
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {rfq.productName}
              </h1>
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

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Requirement
            </p>

            <p className="text-gray-800 mt-2 leading-7">
              {rfq.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Quantity
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {rfq.quantity}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Delivery Location
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {rfq.deliveryLocation}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Deadline
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {new Date(rfq.deadline).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <section className="bg-white border rounded-2xl p-5 sm:p-8 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Quotations Received
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Compare offers submitted by suppliers
              </p>
            </div>

            <span className="text-sm font-medium text-gray-600">
              {quotations.length} quotation
              {quotations.length !== 1 ? "s" : ""}
            </span>
          </div>

          {quotations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No quotations received yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {quotations.map((quotation) => (
                <div
                  key={quotation.id}
                  className="border rounded-xl p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Supplier
                      </p>

                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {quotation.supplier?.name ||
                          "Supplier"}
                      </h3>

                      {quotation.supplier?.email && (
                        <p className="text-sm text-gray-500 mt-1 break-all">
                          {quotation.supplier.email}
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Quoted Price
                      </p>

                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        ₹{Number(quotation.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                    <div>
                      <p className="text-sm text-gray-500">
                        Estimated Delivery
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {quotation.estimatedDeliveryTime}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Submitted On
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {new Date(
                          quotation.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {quotation.message && (
                    <div className="mt-6 bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">
                        Supplier Message
                      </p>

                      <p className="text-sm text-gray-800 mt-2 leading-6">
                        {quotation.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BuyerRFQDetails;