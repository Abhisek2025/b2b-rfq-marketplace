
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api.js";
import toast from "react-hot-toast";

const BuyerRFQDetails = () => {
  const { id } = useParams();

  const [rfq, setRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     Fetch RFQ + Quotations
  ===================================================== */

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [rfqResponse, quotationResponse] =
          await Promise.all([
            api.get(`/rfqs/${id}`),
            api.get(`/quotations/rfq/${id}`),
          ]);

        setRfq(rfqResponse.data.rfq);
        setQuotations(
          quotationResponse.data.quotations || []
        );
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

  /* =====================================================
     Animation Variants
  ===================================================== */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* =====================================================
     Loading
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        {/* Header */}

        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">

              <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />

              <div className="h-9 w-32 bg-slate-200 rounded-xl animate-pulse" />

            </div>
          </div>
        </header>

        {/* Skeleton */}

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 animate-pulse">

            <div className="flex justify-between gap-5">

              <div className="space-y-3 flex-1">
                <div className="h-4 bg-slate-200 rounded w-20" />
                <div className="h-8 bg-slate-200 rounded w-64" />
              </div>

              <div className="h-7 w-20 bg-slate-200 rounded-full" />

            </div>

            <div className="mt-8 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-28" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-4/5" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 bg-slate-100 rounded-xl"
                />
              ))}

            </div>

          </div>

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 animate-pulse">

            <div className="h-7 bg-slate-200 rounded w-56" />
            <div className="h-4 bg-slate-100 rounded w-72 mt-3" />

            <div className="h-32 bg-slate-100 rounded-xl mt-7" />

          </div>

        </main>
      </div>
    );
  }

  /* =====================================================
     RFQ Not Found
  ===================================================== */

  if (!rfq) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center bg-white rounded-3xl p-8 sm:p-10 max-w-md shadow-2xl"
        >

          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">

            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>

          </div>

          <h1 className="text-xl font-bold text-slate-900 mt-5">
            RFQ not found
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            The RFQ you're looking for doesn't exist or is no longer
            available.
          </p>

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link
              to="/buyer"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              ← Back to Dashboard
            </Link>
          </motion.div>

        </motion.div>

      </div>
    );
  }

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

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
              RFQ Details
            </span>
          </motion.div>

          {/* =================================================
              RFQ DETAILS CARD
          ================================================= */}

          <motion.section
            variants={cardVariants}
            className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
          >

            {/* Top Gradient */}

            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="p-5 sm:p-8">

              {/* Header */}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                <div className="min-w-0">

                  <div className="flex items-center gap-3">

                    <motion.div
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 9h8M8 13h6M8 17h4" />
                      </svg>
                    </motion.div>

                    <div>

                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        RFQ #{rfq.id}
                      </p>

                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                        {rfq.productName}
                      </h1>

                    </div>

                  </div>

                </div>

                {/* Status */}

                <span
                  className={`w-fit px-4 py-2 rounded-full text-xs font-bold ${
                    rfq.status === "OPEN"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-current mr-2" />
                  {rfq.status}
                </span>

              </div>

              {/* Requirement */}

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">

                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 5h16M4 12h16M4 19h10" />
                    </svg>

                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    Requirement
                  </p>

                </div>

                <p className="text-slate-600 mt-3 leading-7">
                  {rfq.description}
                </p>

              </div>

              {/* Details */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                {/* Quantity */}

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                >

                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Quantity
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {rfq.quantity}
                  </p>

                </motion.div>

                {/* Location */}

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                >

                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Delivery Location
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-2 truncate">
                    {rfq.deliveryLocation}
                  </p>

                </motion.div>

                {/* Deadline */}

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                >

                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Deadline
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {new Date(
                      rfq.deadline
                    ).toLocaleString()}
                  </p>

                </motion.div>

              </div>

            </div>

          </motion.section>

          {/* =================================================
              QUOTATIONS
          ================================================= */}

          <motion.section
            variants={cardVariants}
            className="bg-white border border-slate-200 rounded-3xl shadow-sm mt-6 overflow-hidden"
          >

            {/* Section Header */}

            <div className="p-5 sm:p-8 border-b border-slate-100">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">

                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 7h18v13H3z" />
                        <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                        <path d="M8 12h8M8 16h5" />
                      </svg>

                    </div>

                    <div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Quotations Received
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Compare offers submitted by suppliers
                      </p>

                    </div>

                  </div>

                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">

                  {quotations.length}{" "}
                  {quotations.length === 1
                    ? "Quotation"
                    : "Quotations"}

                </div>

              </div>

            </div>

            {/* =================================================
                EMPTY QUOTATIONS
            ================================================= */}

            {quotations.length === 0 ? (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-center py-16 px-5"
              >

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center"
                >

                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 7h18v13H3z" />
                    <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                    <path d="M8 12h8M8 16h5" />
                  </svg>

                </motion.div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  No quotations yet
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                  Suppliers haven't submitted any offers for this RFQ yet.
                  Check back later for new quotations.
                </p>

              </motion.div>

            ) : (

              /* =================================================
                  QUOTATION LIST
              ================================================= */

              <div className="p-5 sm:p-8">

                <div className="space-y-4">

                  <AnimatePresence>

                    {quotations.map(
                      (quotation, index) => (

                        <motion.div
                          key={quotation.id}
                          layout
                          initial={{
                            opacity: 0,
                            y: 25,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.97,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.06,
                          }}
                          whileHover={{
                            y: -3,
                          }}
                          className="border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow"
                        >

                          {/* Supplier + Price */}

                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                            {/* Supplier */}

                            <div className="flex items-start gap-4">

                              <motion.div
                                whileHover={{
                                  scale: 1.05,
                                }}
                                className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold"
                              >
                                {quotation.supplier?.name
                                  ?.charAt(0)
                                  ?.toUpperCase() || "S"}
                              </motion.div>

                              <div className="min-w-0">

                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                  Supplier
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-1">
                                  {quotation.supplier?.name ||
                                    "Supplier"}
                                </h3>

                                {quotation.supplier?.email && (
                                  <p className="text-sm text-slate-500 mt-1 break-all">
                                    {quotation.supplier.email}
                                  </p>
                                )}

                              </div>

                            </div>

                            {/* Price */}

                            <div className="lg:text-right bg-blue-50 lg:bg-transparent rounded-xl p-4 lg:p-0">

                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                Quoted Price
                              </p>

                              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">
                                ₹
                                {Number(
                                  quotation.price
                                ).toLocaleString()}
                              </p>

                            </div>

                          </div>

                          {/* Delivery / Date */}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                            <div className="bg-slate-50 rounded-xl p-4">

                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                Estimated Delivery
                              </p>

                              <p className="font-semibold text-slate-800 mt-2">
                                {quotation.estimatedDeliveryTime}
                              </p>

                            </div>

                            <div className="bg-slate-50 rounded-xl p-4">

                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                Submitted On
                              </p>

                              <p className="font-semibold text-slate-800 mt-2">
                                {new Date(
                                  quotation.createdAt
                                ).toLocaleDateString()}
                              </p>

                            </div>

                          </div>

                          {/* Supplier Message */}

                          {quotation.message && (
                            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">

                              <div className="flex items-center gap-2">

                                <svg
                                  className="w-4 h-4 text-slate-400"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M4 5h16v11H7l-3 3V5z" />
                                </svg>

                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                  Supplier Message
                                </p>

                              </div>

                              <p className="text-sm text-slate-600 mt-3 leading-6">
                                {quotation.message}
                              </p>

                            </div>
                          )}

                          {/* Action */}

                          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <p className="text-xs text-slate-400">
                              Quotation ID: #{quotation.id}
                            </p>

                            <motion.button
                              whileHover={{
                                scale: 1.02,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              Review Offer
                            </motion.button>

                          </div>

                        </motion.div>

                      )
                    )}

                  </AnimatePresence>

                </div>

              </div>

            )}

          </motion.section>

        </motion.div>

      </main>

    </div>
  );
};

export default BuyerRFQDetails;

