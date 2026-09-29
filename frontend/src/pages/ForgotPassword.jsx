import { ArrowLeft, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { forgotPassword } from "../api/authApi";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(
        email.trim()
      );

      toast.success(
        response.message || "OTP sent successfully"
      );

      navigate("/verify-otp", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      toast.error(
        error.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-md">

        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Mail size={24} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Enter your email address and we'll send
              you a verification OTP.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />

              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;