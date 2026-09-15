
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const SupplierDashboard = () => {
  const { user, logout } = useAuth();

  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const { data } = await api.get("/rfqs");
        setRfqs(data.rfqs || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load RFQs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRFQs();
  }, []);

  const openRFQs = useMemo(
    () => rfqs.filter((rfq) => rfq.status === "OPEN"),
    [rfqs]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-16 py-3 flex items-center justify-between gap-4">
            {/* Brand */}
            <Link
              to="/supplier"
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-xl transition-all">
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

            {/* User actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name || "Supplier"}
                  </p>

                  <p className="text-xs text-slate-400">
                    Supplier Account
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="group inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl border border-red-200 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                </svg>

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-500/20"
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              Supplier Workspace
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mt-5">
              Welcome back,{" "}
              {user?.name?.split(" ")[0] || "Supplier"} 👋
            </h1>

            <p className="text-blue-100 mt-3 text-sm sm:text-base leading-6 max-w-2xl">
              Discover buyer requirements, submit competitive
              quotations, and grow your B2B business through
              RFQ Marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link
                to="/supplier/quotations"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8M8 12h6M8 16h4" />
                </svg>

                My Quotations
              </Link>

              <a
                href="#available-rfqs"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/15 transition-all"
              >
                Browse RFQs

                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14" />
                  <path d="m6 13 6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
        >
          <StatCard
            label="Available RFQs"
            value={openRFQs.length}
            description="Open requirements"
            type="blue"
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8M8 12h5M8 16h7" />
              </svg>
            }
          />

          <StatCard
            label="Total RFQs"
            value={rfqs.length}
            description="Buyer requirements"
            type="indigo"
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            }
          />

          <Link
            to="/supplier/quotations"
            className="block"
          >
            <StatCard
              label="My Quotations"
              value="View"
              description="Track your submissions"
              type="emerald"
              clickable
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="m7 12 3 3 7-7" />
                </svg>
              }
            />
          </Link>
        </motion.div>

        {/* RFQ Section */}
        <motion.section
          id="available-rfqs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="mt-8 sm:mt-10"
        >
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            {/* Section header */}
            <div className="p-5 sm:p-6 lg:p-7 border-b border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 7h18M5 7v12h14V7M8 7V4h8v3" />
                      </svg>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Available RFQs
                    </h2>
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Browse open requirements from buyers and
                    submit your best quotation.
                  </p>
                </div>

                <Link
                  to="/supplier/quotations"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl border border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50 font-semibold text-sm transition-all"
                >
                  My Quotations

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

            {/* Content */}
            <div className="p-5 sm:p-6 lg:p-7">
              {loading ? (
                <LoadingSkeleton />
              ) : openRFQs.length === 0 ? (
                <EmptyState />
              ) : (
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
                    {openRFQs.map((rfq) => (
                      <RFQCard
                        key={rfq.id}
                        rfq={rfq}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

/* ---------------------------------------------
   Stat Card
--------------------------------------------- */

const StatCard = ({
  label,
  value,
  description,
  icon,
  type = "blue",
  clickable = false,
}) => {
  const iconStyles = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
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
      className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${
        clickable ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            iconStyles[type]
          }`}
        >
          {icon}
        </div>

        {clickable && (
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
        )}
      </div>

      <p className="text-sm text-slate-500 mt-4">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {description}
      </p>
    </motion.div>
  );
};

/* ---------------------------------------------
   RFQ Card
--------------------------------------------- */

const RFQCard = ({ rfq }) => {
  const formattedDeadline = rfq.deadline
    ? new Date(rfq.deadline).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Not specified";

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -4,
      }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow overflow-hidden"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mt-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            RFQ #{rfq.id}
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 truncate">
            {rfq.productName}
          </h3>
        </div>

        <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          OPEN
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-6 mt-4 line-clamp-2">
        {rfq.description ||
          "No additional description provided by the buyer."}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <DetailBox
          label="Quantity"
          value={rfq.quantity}
          icon={
            <svg
              className="w-4 h-4"
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

        <DetailBox
          label="Delivery Location"
          value={rfq.deliveryLocation}
          icon={
            <svg
              className="w-4 h-4"
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

        <DetailBox
          label="Deadline"
          value={formattedDeadline}
          icon={
            <svg
              className="w-4 h-4"
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

        <DetailBox
          label="Buyer Requirement"
          value="Quotation"
          icon={
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8M8 12h6M8 16h4" />
            </svg>
          }
        />
      </div>

      {/* Action */}
      <Link
        to={`/supplier/rfqs/${rfq.id}`}
        className="mt-5 flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25 transition-all"
      >
        View RFQ & Submit Quote

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
    </motion.div>
  );
};

/* ---------------------------------------------
   Detail Box
--------------------------------------------- */

const DetailBox = ({ label, value, icon }) => {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 min-w-0">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium truncate">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-800 mt-2 truncate">
        {value || "—"}
      </p>
    </div>
  );
};

/* ---------------------------------------------
   Loading Skeleton
--------------------------------------------- */

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="border border-slate-200 rounded-2xl p-5 sm:p-6 animate-pulse"
        >
          <div className="flex justify-between">
            <div>
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-6 w-40 bg-slate-200 rounded mt-3" />
            </div>

            <div className="h-7 w-16 bg-slate-200 rounded-lg" />
          </div>

          <div className="h-4 w-full bg-slate-100 rounded mt-5" />
          <div className="h-4 w-3/4 bg-slate-100 rounded mt-2" />

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="h-20 bg-slate-100 rounded-xl" />
            <div className="h-20 bg-slate-100 rounded-xl" />
            <div className="h-20 bg-slate-100 rounded-xl" />
            <div className="h-20 bg-slate-100 rounded-xl" />
          </div>

          <div className="h-12 bg-slate-200 rounded-xl mt-5" />
        </div>
      ))}
    </div>
  );
};

/* ---------------------------------------------
   Empty State
--------------------------------------------- */

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 sm:py-16 text-center"
    >
      <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
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

      <h3 className="text-xl font-bold text-slate-900 mt-5">
        No open RFQs available
      </h3>

      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-6">
        There are no open buyer requirements available
        right now. Check again later for new opportunities.
      </p>

      <Link
        to="/supplier/quotations"
        className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-all"
      >
        View My Quotations

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
    </motion.div>
  );
};

export default SupplierDashboard;

