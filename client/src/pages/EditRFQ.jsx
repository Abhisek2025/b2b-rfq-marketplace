import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const EditRFQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    deliveryLocation: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchRFQ = async () => {
      try {
        const { data } = await api.get(`/rfqs/${id}`);
        const rfq = data.rfq;

        setFormData({
          productName: rfq.productName,
          description: rfq.description,
          quantity: rfq.quantity,
          deliveryLocation: rfq.deliveryLocation,
          deadline: new Date(rfq.deadline)
            .toISOString()
            .slice(0, 16),
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load RFQ"
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

      await api.put(`/rfqs/${id}`, {
        ...formData,
        quantity: Number(formData.quantity),
      });

      toast.success("RFQ updated successfully");

      navigate("/buyer");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors?.length) {
        toast.error(errors[0].message);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to update RFQ"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading RFQ...</p>
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
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white border rounded-2xl shadow-sm p-5 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit RFQ
          </h1>

          <p className="text-gray-500 mt-2">
            Update your quotation request details.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product / Service Name
              </label>

              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirement Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Location
                </label>

                <input
                  type="text"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>

              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <Link
                to="/buyer"
                className="w-full sm:w-auto text-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update RFQ"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditRFQ;