
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          error.response?.data?.message ||
            "Failed to create RFQ"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     Animation Variants
  ===================================================== */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* Logo */}

            <Link
              to="/buyer"
              className="flex items-center gap-3"
            >

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20"
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M8 11h8M9 15h6" />
                </svg>

              </motion.div>

              <div>

                <span className="text-lg sm:text-xl font-bold text-slate-900">
                  RFQ Marketplace
                </span>

                <p className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-wider">
                  Buyer Portal
                </p>

              </div>

            </Link>

            {/* Back */}

            <motion.div
              whileHover={{
                x: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >

              <Link
                to="/buyer"
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
              >

                <span>←</span>

                <span className="hidden sm:inline">
                  Back to Dashboard
                </span>

                <span className="sm:hidden">
                  Back
                </span>

              </Link>

            </motion.div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-slate-400 mb-5"
          >

            <Link
              to="/buyer"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-slate-600">
              Create RFQ
            </span>

          </motion.div>

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="mb-7"
          >

            <div className="flex items-center gap-3">

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"
              >

                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M12 8v8M8 12h8" />
                </svg>

              </motion.div>

              <div>

                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  NEW REQUEST
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                  Create RFQ
                </h1>

              </div>

            </div>

            <p className="text-slate-500 mt-4 max-w-2xl">
              Submit your purchasing requirement and receive competitive
              quotations from suppliers.
            </p>

          </motion.div>

          {/* =================================================
              FORM CARD
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
          >

            {/* Top Accent */}

            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="p-5 sm:p-8 lg:p-10">

              {/* Form Header */}

              <div className="pb-6 border-b border-slate-100">

                <h2 className="text-lg font-bold text-slate-900">
                  Requirement Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Provide accurate information so suppliers can submit
                  relevant quotations.
                </p>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >

                  {/* =================================================
                      PRODUCT NAME
                  ================================================= */}

                  <motion.div variants={itemVariants}>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Product / Service Name
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">

                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4 4h16v16H4z" />
                          <path d="M8 9h8M8 13h6M8 17h4" />
                        </svg>

                      </div>

                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        placeholder="Example: Office Chairs"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                    </div>

                  </motion.div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <motion.div variants={itemVariants}>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Requirement Description
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Describe your requirement, specifications, quality standards, preferred brand, or any other important details..."
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <div className="flex justify-end mt-1.5">

                      <span className="text-xs text-slate-400">
                        {formData.description.length} characters
                      </span>

                    </div>

                  </motion.div>

                  {/* =================================================
                      QUANTITY + LOCATION
                  ================================================= */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Quantity */}

                    <motion.div variants={itemVariants}>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Quantity
                        <span className="text-red-500 ml-1">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">

                          <svg
                            className="w-5 h-5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 5h14v14H5z" />
                            <path d="M9 9h6M9 12h6M9 15h4" />
                          </svg>

                        </div>

                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min="1"
                          required
                          placeholder="100"
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                      </div>

                    </motion.div>

                    {/* Location */}

                    <motion.div variants={itemVariants}>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Delivery Location
                        <span className="text-red-500 ml-1">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">

                          <svg
                            className="w-5 h-5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
                            <circle cx="12" cy="9" r="2.5" />
                          </svg>

                        </div>

                        <input
                          type="text"
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleChange}
                          required
                          placeholder="Hyderabad"
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                      </div>

                    </motion.div>

                  </div>

                  {/* =================================================
                      DEADLINE
                  ================================================= */}

                  <motion.div variants={itemVariants}>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quotation Deadline
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">

                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="17"
                            rx="2"
                          />

                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>

                      </div>

                      <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Suppliers must submit their quotations before this
                      deadline.
                    </p>

                  </motion.div>

                  {/* =================================================
                      INFO BOX
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 rounded-2xl bg-blue-50 border border-blue-100 p-4"
                  >

                    <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 11v5M12 8h.01" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-sm font-semibold text-blue-900">
                        Tip for better quotations
                      </p>

                      <p className="text-xs sm:text-sm text-blue-700 mt-1 leading-5">
                        Include product specifications, quality requirements,
                        delivery expectations, and any other important
                        details in your description.
                      </p>

                    </div>

                  </motion.div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end"
                  >

                    {/* Cancel */}

                    <motion.div
                      whileHover={{
                        y: -1,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >

                      <Link
                        to="/buyer"
                        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        Cancel
                      </Link>

                    </motion.div>

                    {/* Submit */}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={
                        !loading
                          ? {
                              scale: 1.01,
                              y: -1,
                            }
                          : {}
                      }
                      whileTap={
                        !loading
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                      className="w-full sm:w-auto min-w-[150px] flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                      {loading ? (
                        <>
                          <motion.svg
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />

                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </motion.svg>

                          Creating...
                        </>
                      ) : (
                        <>
                          Create RFQ
                          <span>→</span>
                        </>
                      )}

                    </motion.button>

                  </motion.div>

                </motion.div>

              </form>

            </div>

          </motion.div>

          {/* =================================================
              FOOTER NOTE
          ================================================= */}

          <motion.p
            variants={itemVariants}
            className="text-center text-xs text-slate-400 mt-6"
          >
            Your RFQ will be visible to relevant suppliers on the
            marketplace.
          </motion.p>

        </motion.div>

      </main>

    </div>
  );
};

export default CreateRFQ;

