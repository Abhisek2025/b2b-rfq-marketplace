
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

      await api.post(`/quotations/rfq/${id}`, {
        price: Number(formData.price),
        estimatedDeliveryTime:
          formData.estimatedDeliveryTime,
        message: formData.message,
      });

      toast.success(
        "Quotation submitted successfully"
      );

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

  /* ---------------------------------------------
     Loading
  --------------------------------------------- */

  if (loading) {
    return <LoadingState />;
  }

  /* ---------------------------------------------
     Not Found
  --------------------------------------------- */

  if (!rfq) {
    return <NotFoundState />;
  }

  const formattedDeadline = rfq.deadline
    ? new Date(rfq.deadline).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not specified";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link
              to="/supplier"
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 7h18M5 7v12h14V7M8 7V4h8v3" />
                </svg>
              </div>

              <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                RFQ Marketplace
              </span>
            </Link>

            <Link
              to="/supplier"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 transition-all"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              <span className="hidden sm:inline">
                Back to Dashboard
              </span>

              <span className="sm:hidden">
                Back
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 text-sm text-slate-500 mb-6"
        >
          <Link
            to="/supplier"
            className="hover:text-blue-600 transition-colors"
          >
            Supplier Dashboard
          </Link>

          <svg
            className="w-4 h-4 text-slate-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>

          <span className="text-slate-700 font-medium">
            RFQ #{rfq.id}
          </span>
        </motion.div>

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
              RFQ #{rfq.id}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {rfq.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Submit Your Quotation
          </h1>

          <p className="text-slate-500 mt-2">
            Review the buyer's requirements and send your
            most competitive offer.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* RFQ Details */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.1,
            }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              {/* Card header */}
              <div className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">
                    Buyer Requirement
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                    {rfq.productName}
                  </h2>

                  <div className="flex items-center gap-2 mt-4 text-sm text-blue-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-300" />
                    Open for quotations
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Description */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M4 5h16v14H4z" />
                        <path d="M8 9h8M8 13h6M8 17h4" />
                      </svg>
                    </div>

                    <h3 className="font-bold text-slate-900">
                      Requirement Details
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-7 mt-4">
                    {rfq.description ||
                      "No additional description provided by the buyer."}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                  <InfoCard
                    label="Quantity"
                    value={rfq.quantity}
                    icon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                        <path d="M8 3v6M16 9v6M8 15v6" />
                      </svg>
                    }
                  />

                  <InfoCard
                    label="Delivery Location"
                    value={rfq.deliveryLocation}
                    icon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    }
                  />

                  <InfoCard
                    label="Submission Deadline"
                    value={formattedDeadline}
                    icon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    }
                  />

                  <InfoCard
                    label="RFQ Status"
                    value={rfq.status}
                    icon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 3v18M17 6.5C16 5.5 14.5 5 12 5c-2.8 0-5 1.2-5 3.5 0 5 10 2.5 10 7 0 2.5-2.2 4-5 4-2.5 0-4-.5-5-1.5" />
                      </svg>
                    }
                  />
                </div>

                {/* Tip */}
                <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3a7 7 0 0 0-4 12.7V18h8v-2.3A7 7 0 0 0 12 3Z" />
                      <path d="M9 21h6" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-amber-800">
                      Supplier Tip
                    </p>

                    <p className="text-xs sm:text-sm text-amber-700 mt-1 leading-5">
                      Provide a competitive price and a
                      realistic delivery timeline to improve
                      your chances of being selected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quotation Form */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden lg:sticky lg:top-24">
              {/* Form header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M8 8h8M8 12h5M8 16h6" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Your Quotation
                    </h2>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Send your offer to the buyer
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Quotation Price
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                      ₹
                    </div>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                      placeholder="Enter your best price"
                      className="w-full border border-slate-200 bg-slate-50/70 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
                    />
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Enter the total quotation amount.
                  </p>
                </div>

                {/* Delivery */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Delivery Time
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>

                    <input
                      type="text"
                      name="estimatedDeliveryTime"
                      value={
                        formData.estimatedDeliveryTime
                      }
                      onChange={handleChange}
                      required
                      placeholder="Example: 7 days"
                      className="w-full border border-slate-200 bg-slate-50/70 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Message / Notes
                    </label>

                    <span className="text-xs text-slate-400">
                      Optional
                    </span>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Add delivery terms, product details, warranty information, or other notes..."
                    className="w-full border border-slate-200 bg-slate-50/70 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition-all focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
                  />

                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-slate-400">
                      {formData.message.length} characters
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={
                    !submitting
                      ? {
                          y: -2,
                          scale: 1.01,
                        }
                      : {}
                  }
                  whileTap={
                    !submitting
                      ? {
                          scale: 0.98,
                        }
                      : {}
                  }
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-30"
                        />

                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quotation

                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </>
                  )}
                </motion.button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  Your quotation is securely submitted to
                  the buyer.
                </div>
              </form>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

/* ---------------------------------------------
   Info Card
--------------------------------------------- */

const InfoCard = ({ label, value, icon }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="text-sm font-bold text-slate-800 mt-2 break-words">
        {value || "—"}
      </p>
    </div>
  );
};

/* ---------------------------------------------
   Loading State
--------------------------------------------- */

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-16 bg-white border-b border-slate-200" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse">
          <div className="h-4 w-40 bg-slate-200 rounded mb-6" />

          <div className="h-9 w-72 bg-slate-200 rounded mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-8">
              <div className="h-28 bg-slate-200 rounded-2xl" />
              <div className="h-6 w-48 bg-slate-200 rounded mt-8" />
              <div className="h-4 w-full bg-slate-100 rounded mt-4" />
              <div className="h-4 w-4/5 bg-slate-100 rounded mt-2" />

              <div className="grid grid-cols-2 gap-4 mt-7">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 bg-slate-100 rounded-2xl"
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6">
              <div className="h-8 w-40 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-100 rounded-xl mt-6" />
              <div className="h-12 bg-slate-100 rounded-xl mt-5" />
              <div className="h-28 bg-slate-100 rounded-xl mt-5" />
              <div className="h-12 bg-slate-200 rounded-xl mt-5" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ---------------------------------------------
   Not Found
--------------------------------------------- */

const NotFoundState = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sm:p-12 text-center max-w-md"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mt-6">
          RFQ not found
        </h1>

        <p className="text-sm text-slate-500 mt-2 leading-6">
          This RFQ may have been removed or is no longer
          available.
        </p>

        <Link
          to="/supplier"
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>

          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default SupplierRFQDetails;

