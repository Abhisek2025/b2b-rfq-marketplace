//```jsx id="buyer-dashboard-updated"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const BuyerDashboard = () => {
  const { user, logout } = useAuth();

  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const { data } = await api.get("/rfqs/my");
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

  const openRFQs = rfqs.filter(
    (rfq) => rfq.status === "OPEN"
  ).length;

  /*
   * Get the logged-in user's name safely.
   *
   * Depending on your AuthContext/login response,
   * user may temporarily be null while the app loads.
   */
  const userName = user?.name || "Buyer";

  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] || "Buyer";

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "B";

  /* ---------------------------------------------
     Delete RFQ
  --------------------------------------------- */

  const handleDelete = async (rfqId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this RFQ?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/rfqs/${rfqId}`);

      setRfqs((currentRfqs) =>
        currentRfqs.filter(
          (rfq) => rfq.id !== rfqId
        )
      );

      toast.success("RFQ deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete RFQ"
      );
    }
  };

  /* ---------------------------------------------
     Animations
  --------------------------------------------- */

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
      y: 20,
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

  /* ---------------------------------------------
     Stats
  --------------------------------------------- */

  const stats = [
    {
      title: "Total RFQs",
      value: rfqs.length,
      description: "All your requests",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Open RFQs",
      value: openRFQs,
      description: "Currently active",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      ),
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Quotations",
      value: 0,
      description: "Offers received",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 7h18v13H3z" />
          <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
          <path d="M8 12h8M8 16h5" />
        </svg>
      ),
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-16 py-3 flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to="/buyer"
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

            {/* Logged-in User */}
            <div className="flex items-center gap-3 sm:gap-4">

              {/* Desktop user information */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20">
                  {userInitial}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-800">
                    {userName}
                  </p>

                  <p className="text-xs text-slate-400">
                    Buyer Account
                  </p>
                </div>
              </div>

              {/* Mobile user initial */}
              <div className="sm:hidden w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                {userInitial}
              </div>

              {/* Logout */}
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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-1">
                BUYER DASHBOARD
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Welcome back, {firstName} 👋
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your RFQs and review supplier quotations.
              </p>
            </div>

            <motion.div
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                to="/buyer/rfqs/create"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>

                Create RFQ
              </Link>
            </motion.div>
          </motion.div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                }}
                className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <motion.p
                      key={stat.value}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="text-3xl font-bold text-slate-900 mt-2"
                    >
                      {stat.value}
                    </motion.p>

                    <p className="text-xs text-slate-400 mt-1">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconStyle}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* =================================================
              RFQ SECTION
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 mt-6 sm:mt-8 shadow-sm overflow-hidden"
          >
            {/* Section Header */}
            <div className="px-5 sm:px-7 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your RFQs
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Track and manage your quotation requests.
                </p>
              </div>

              {rfqs.length > 0 && (
                <span className="w-fit px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                  {rfqs.length}{" "}
                  {rfqs.length === 1
                    ? "Request"
                    : "Requests"}
                </span>
              )}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="p-5 sm:p-7 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border border-slate-100 rounded-2xl p-5 animate-pulse"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="h-5 bg-slate-200 rounded w-1/3" />
                        <div className="h-4 bg-slate-100 rounded w-2/3" />
                      </div>

                      <div className="h-6 w-20 bg-slate-200 rounded-full" />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                      <div className="h-12 bg-slate-100 rounded-lg" />
                      <div className="h-12 bg-slate-100 rounded-lg" />
                      <div className="h-12 bg-slate-100 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : rfqs.length === 0 ? (
              /* Empty State */
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
                  className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M8 9h8M8 13h5" />
                    <path d="M16 16h4M18 14v4" />
                  </svg>
                </motion.div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  No RFQs yet
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                  Create your first request for quotation and
                  start receiving competitive supplier offers.
                </p>

                <motion.div
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <Link
                    to="/buyer/rfqs/create"
                    className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition"
                  >
                    <span>+</span>
                    Create your first RFQ
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              /* RFQ List */
              <div className="p-5 sm:p-7">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {rfqs.map((rfq) => (
                      <motion.div
                        key={rfq.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                          y: -10,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        whileHover={{
                          y: -2,
                        }}
                        className="group border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40 transition-all"
                      >
                        {/* RFQ Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M4 4h16v16H4z" />
                                  <path d="M8 9h8M8 13h6" />
                                </svg>
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                                  {rfq.productName}
                                </h3>

                                <p className="text-xs text-slate-400 mt-0.5">
                                  RFQ #{rfq.id}
                                </p>
                              </div>
                            </div>

                            <p className="text-sm text-slate-500 mt-4 line-clamp-2">
                              {rfq.description}
                            </p>
                          </div>

                          {/* Status */}
                          <span
                            className={`w-fit shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${
                              rfq.status === "OPEN"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle" />
                            {rfq.status}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400">
                              Quantity
                            </p>

                            <p className="text-sm font-semibold text-slate-800 mt-1">
                              {rfq.quantity}
                            </p>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400">
                              Delivery Location
                            </p>

                            <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
                              {rfq.deliveryLocation}
                            </p>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400">
                              Deadline
                            </p>

                            <p className="text-sm font-semibold text-slate-800 mt-1">
                              {new Date(
                                rfq.deadline
                              ).toLocaleDateString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2.5 mt-5 pt-5 border-t border-slate-100">
                          <motion.div
                            className="flex-1"
                            whileHover={{
                              scale: 1.01,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                          >
                            <Link
                              to={`/buyer/rfqs/${rfq.id}`}
                              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition"
                            >
                              View Details
                              <span>→</span>
                            </Link>
                          </motion.div>

                          <motion.div
                            className="flex-1"
                            whileHover={{
                              scale: 1.01,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                          >
                            <Link
                              to={`/buyer/rfqs/${rfq.id}/edit`}
                              className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition"
                            >
                              Edit
                            </Link>
                          </motion.div>

                          <motion.button
                            whileHover={{
                              scale: 1.01,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            onClick={() =>
                              handleDelete(rfq.id)
                            }
                            className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-semibold px-4 py-2.5 rounded-xl text-sm transition"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6" />
                            </svg>

                            Delete
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default BuyerDashboard;

