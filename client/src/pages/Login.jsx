import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const { data } = await api.post("/auth/login", formData);

      login(data);

      toast.success("Login successful");

      navigate(data.user.role === "BUYER" ? "/buyer" : "/supplier");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Animation Variants ---------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
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
      y: 35,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4 py-8">
      {/* ==================================================
          Animated Background
      ================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ==================================================
          Main Container
      ================================================== */}

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30">
          {/* ==================================================
              LEFT BRANDING
          ================================================== */}

          <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12 text-white flex-col justify-between overflow-hidden">
            {/* Decorative circles */}

            <motion.div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/10"
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute top-1/2 right-10 w-4 h-4 rounded-full bg-white/20"
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Logo */}

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-12"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M8 11h8M9 15h6" />
                  </svg>
                </motion.div>

                <span className="text-xl font-bold tracking-tight">
                  RFQ Marketplace
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold leading-tight"
              >
                Smarter sourcing.
                <br />
                Better business.
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-blue-100 text-lg leading-relaxed max-w-md"
              >
                Connect buyers and suppliers, manage requests for quotation,
                compare offers, and grow your business from one powerful
                marketplace.
              </motion.p>
            </motion.div>

            {/* Features */}

            <motion.div
              className="relative z-10 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "Fast RFQ management",
                "Connect with verified suppliers",
                "Simplify your procurement workflow",
              ].map((feature) => (
                <motion.div
                  key={feature}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span className="text-blue-50">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ==================================================
              LOGIN SECTION
          ================================================== */}

          <motion.div
            className="p-6 sm:p-10 lg:p-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile Logo */}

            <motion.div
              variants={itemVariants}
              className="flex lg:hidden items-center justify-center gap-3 mb-8"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                }}
                className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M8 11h8M9 15h6" />
                </svg>
              </motion.div>

              <span className="text-xl font-bold text-slate-900">
                RFQ Marketplace
              </span>
            </motion.div>

            {/* Header */}

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide">
                WELCOME BACK
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Sign in to your account
              </h1>

              <p className="text-slate-500 mt-3">
                Access your RFQs, quotations, and marketplace dashboard.
              </p>
            </motion.div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </motion.div>

              {/* Password */}

              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    onClick={() =>
                      alert(
                        "Sorry, this feature is currently under maintenance.",
                      )
                    }
                    type="button"
                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                        <path d="M9.9 4.2A10.5 10.5 0 0112 4c5 0 8.3 4 9.5 6-.4.7-1.3 2-2.7 3.2M6.2 6.2C3.9 7.7 2.8 9.5 2.5 10c1.2 2 4.5 6 9.5 6 1 0 2-.2 2.8-.5" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19 2.5 12 2.5 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Remember Me */}

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500 cursor-pointer"
                >
                  Remember me
                </label>
              </motion.div>

              {/* Login Button */}

              <motion.button
                variants={itemVariants}
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
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-shadow duration-200 hover:shadow-xl hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <motion.span
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Divider */}

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 my-7"
            >
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400 uppercase tracking-wider">
                New here?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </motion.div>

            {/* Register */}

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <Link
                to="/register"
                className="flex items-center justify-center w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
              >
                Create an account
              </Link>
            </motion.div>

            {/* Footer */}

            <motion.p
              variants={itemVariants}
              className="text-center text-xs text-slate-400 mt-7"
            >
              © {new Date().getFullYear()} RFQ Marketplace. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
