import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";

const CreateRFQ = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    quantity: "",
    deliveryLocation: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/rfqs", {
        ...formData,
        quantity: Number(formData.quantity),
      });

      toast.success("RFQ created successfully");

      navigate("/buyer");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors?.length) {
        toast.error(errors[0].message);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create RFQ"
        );
      }
    } finally {
      setLoading(false);
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

            <Link
              to="/buyer"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white rounded-2xl border shadow-sm p-5 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create RFQ
          </h1>

          <p className="text-gray-500 mt-2">
            Submit your requirement and receive quotations from suppliers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                placeholder="Example: Office Chairs"
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
                placeholder="Describe your requirement..."
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
                  placeholder="100"
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
                  placeholder="Hyderabad"
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
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create RFQ"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRFQ;