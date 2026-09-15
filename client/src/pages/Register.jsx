
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api.js";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
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

      await api.post("/auth/register", formData);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors?.length) {
        toast.error(errors[0].message);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative w-full max-w-md"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7h18M5 7v12h14V7M8 7V4h8v3" />
              </svg>
            </div>

            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RFQ Marketplace
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/70 p-6 sm:p-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M15 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M17 8v6M14 11h6" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Create Account
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Join the B2B RFQ Marketplace
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
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
            className="mt-7 space-y-5"
          >
            {/* Name */}
            <motion.div
              variants={fieldVariants}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </div>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fieldVariants}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path d="m3 7 9 6 9-6" />
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
                  className={inputClass}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              variants={fieldVariants}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <span className="text-xs text-slate-400">
                  Min. 8 characters
                </span>
              </div>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="w-5 h-5"
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
                </div>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                  autoComplete="new-password"
                  placeholder="Create a secure password"
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.3A10.7 10.7 0 0 1 12 4c5 0 8.5 4 9.8 6.2a3.5 3.5 0 0 1 0 3.6 15 15 0 0 1-3.1 3.5" />
                      <path d="M6.1 6.1A15.4 15.4 0 0 0 2.2 10.2a3.5 3.5 0 0 0 0 3.6C3.5 16 7 20 12 20c1.3 0 2.5-.3 3.6-.7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Account Type */}
            <motion.div
              variants={fieldVariants}
            >
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Type
              </label>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 21v-8l8-4 8 4v8" />
                    <path d="M8 21v-4h8v4" />
                    <path d="M12 9V3M9 6h6" />
                  </svg>
                </div>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                >
                  <option value="BUYER">
                    Buyer — Post RFQs & Receive Quotes
                  </option>

                  <option value="SUPPLIER">
                    Supplier — Browse RFQs & Submit Quotes
                  </option>
                </select>

                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              variants={fieldVariants}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100"
            >
              <div className="w-7 h-7 shrink-0 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 10v6M12 7h.01" />
                </svg>
              </div>

              <p className="text-xs sm:text-sm text-blue-800 leading-5">
                Choose the account type that matches how
                you will use the marketplace. You can
                start posting or responding to RFQs after
                registration.
              </p>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fieldVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  !loading
                    ? {
                        y: -2,
                        scale: 1.01,
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
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                {loading ? (
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

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

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
            </motion.div>
          </motion.form>

          {/* Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-7 pt-6 border-t border-slate-100"
          >
            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Secure B2B procurement starts here.
        </p>
      </motion.div>
    </div>
  );
};

/* ---------------------------------------------
   Shared styles
--------------------------------------------- */

const inputClass =
  "w-full border border-slate-200 bg-slate-50/70 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300";

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default Register;

