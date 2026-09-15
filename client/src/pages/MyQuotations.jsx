
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const stats = useMemo(() => {
    const total = quotations.length;

    const totalValue = quotations.reduce(
      (sum, quotation) => sum + Number(quotation.price || 0),
      0
    );

    const averageValue = total
      ? totalValue / total
      : 0;

    const withMessage = quotations.filter(
      (quotation) => quotation.message
    ).length;

    return {
      total,
      totalValue,
      averageValue,
      withMessage,
    };
  }, [quotations]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link
              to="/supplier"
              className="group flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
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
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
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
                Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Supplier Workspace
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              My Quotations
            </h1>

            <p className="text-slate-500 mt-2 max-w-2xl">
              Track and review all quotations you have submitted
              to buyer RFQs.
            </p>
          </div>

          <Link
            to="/supplier"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            Browse RFQs
          </Link>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : quotations.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
            >
              <StatCard
                label="Total Quotations"
                value={stats.total}
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M8 8h8M8 12h6M8 16h4" />
                  </svg>
                }
              />

              <StatCard
                label="Total Quoted Value"
                value={`₹${stats.totalValue.toLocaleString(
                  "en-IN"
                )}`}
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v20M17 5.5C16 4.5 14.5 4 12 4c-2.8 0-5 1.2-5 3.5 0 5 10 2.5 10 7 0 2.5-2.2 4-5 4-2.5 0-4-.5-5-1.5" />
                  </svg>
                }
              />

              <StatCard
                label="Average Quote"
                value={`₹${Math.round(
                  stats.averageValue
                ).toLocaleString("en-IN")}`}
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 19V5M4 19h16" />
                    <path d="m7 15 4-5 3 3 5-7" />
                  </svg>
                }
              />

              <StatCard
                label="With Messages"
                value={stats.withMessage}
                icon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 5h16v11H8l-4 4z" />
                    <path d="M8 9h8M8 12h5" />
                  </svg>
                }
              />
            </motion.div>

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mt-10 mb-5"
            >
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Submitted Quotations
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your latest quotation submissions
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                {quotations.length}{" "}
                {quotations.length === 1
                  ? "quotation"
                  : "quotations"}
              </span>
            </motion.div>

            {/* Quotations */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <AnimatePresence>
                {quotations.map((quotation) => (
                  <QuotationCard
                    key={quotation.id}
                    quotation={quotation}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

/* ---------------------------------------------
   Stat Card
--------------------------------------------- */

const StatCard = ({ label, value, icon }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 16,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -3,
      }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>

        <svg
          className="w-5 h-5 text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>

      <p className="text-sm text-slate-500 mt-4">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1 truncate">
        {value}
      </p>
    </motion.div>
  );
};

/* ---------------------------------------------
   Quotation Card
--------------------------------------------- */

const QuotationCard = ({ quotation }) => {
  const formattedDate = quotation.createdAt
    ? new Date(
        quotation.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow"
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8M8 12h6" />
                </svg>

                RFQ #{quotation.rfqId}
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Submitted
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              {quotation.rfq?.productName || "RFQ"}
            </h2>
          </div>

          <div className="sm:text-right shrink-0">
            <p className="text-xs text-slate-500 mb-1">
              Your Quote
            </p>

            <p className="text-2xl font-bold text-blue-600">
              ₹
              {Number(
                quotation.price || 0
              ).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <InfoItem
            label="Estimated Delivery"
            value={
              quotation.estimatedDeliveryTime || "Not specified"
            }
            icon={
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            }
          />

          <InfoItem
            label="Submitted On"
            value={formattedDate}
            icon={
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
            }
          />
        </div>

        {/* Message */}
        {quotation.message && (
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 5h16v11H8l-4 4z" />
                  <path d="M8 9h8M8 12h5" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Message
                </p>

                <p className="text-sm text-slate-700 mt-1 leading-6 break-words">
                  {quotation.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Quotation ID: #{quotation.id}
          </p>

          <Link
            to={`/supplier`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View RFQs

            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------------------------
   Info Item
--------------------------------------------- */

const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
};

/* ---------------------------------------------
   Loading Skeleton
--------------------------------------------- */

const LoadingSkeleton = () => {
  return (
    <div className="mt-8">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-slate-200 rounded-2xl p-5 animate-pulse"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div className="h-3 w-24 bg-slate-200 rounded mt-5" />
            <div className="h-7 w-20 bg-slate-200 rounded mt-2" />
          </div>
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse"
          >
            <div className="flex justify-between gap-5">
              <div className="flex-1">
                <div className="h-6 w-24 bg-slate-200 rounded" />
                <div className="h-6 w-44 bg-slate-200 rounded mt-3" />
              </div>

              <div className="h-8 w-24 bg-slate-200 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="h-20 bg-slate-100 rounded-xl" />
              <div className="h-20 bg-slate-100 rounded-xl" />
            </div>

            <div className="h-20 bg-slate-100 rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------
   Empty State
--------------------------------------------- */

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-10"
    >
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 text-center shadow-sm">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-blue-50 rounded-full blur-3xl opacity-70" />

        <div className="relative">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8M8 12h6M8 16h4" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6">
            No quotations yet
          </h2>

          <p className="text-slate-500 mt-2 max-w-md mx-auto leading-6">
            You haven't submitted any quotations yet.
            Browse available RFQs and submit your first
            competitive offer.
          </p>

          <Link
            to="/supplier"
            className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
          >
            Browse Available RFQs

            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MyQuotations;

