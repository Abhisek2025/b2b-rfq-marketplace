import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const SupplierRFQDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    price: "",
    estimatedDeliveryTime: "",
    message: "",
  });

  useEffect(() => {
    const fetchRFQ = async () => {
      try {
        const { data } = await api.get(`/rfqs/${id}`);
        setRfq(data.rfq);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load RFQ"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRFQ();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await api.post(`/quotations/rfq/${id}`, {
        price: Number(formData.price),
        estimatedDeliveryTime: formData.estimatedDeliveryTime,
        message: formData.message,
      });

      toast.success("Quotation submitted successfully");

      navigate("/supplier");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors?.length) {
        toast.error(errors[0].message);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to submit quotation"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading RFQ...</p>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            RFQ not found
          </h1>

          <Link
            to="/supplier"
            className="text-blue-600 mt-3 inline-block"
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border rounded-2xl p-5 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {rfq.productName}
              </h1>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                {rfq.status}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Requirement
              </p>

              <p className="text-gray-800 mt-2 leading-7">
                {rfq.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div>
                <p className="text-sm text-gray-500">
                  Quantity
                </p>

                <p className="font-semibold mt-1">
                  {rfq.quantity}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Delivery Location
                </p>

                <p className="font-semibold mt-1">
                  {rfq.deliveryLocation}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Deadline
                </p>

                <p className="font-semibold mt-1">
                  {new Date(rfq.deadline).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">
              Submit Quotation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Send your best offer to the buyer.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="Enter quotation price"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Delivery Time
                </label>

                <input
                  type="text"
                  name="estimatedDeliveryTime"
                  value={formData.estimatedDeliveryTime}
                  onChange={handleChange}
                  required
                  placeholder="Example: 7 days"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message / Notes
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Add additional information..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Quotation"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierRFQDetails;