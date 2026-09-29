import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { verifyOtp } from "../api/authApi";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      navigate("/forgot-password");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOtp(
        email,
        otp
      );

      toast.success(
        response.message || "OTP verified"
      );

      navigate("/reset-password", {
        state: {
          email,
          resetToken: response.resetToken,
        },
      });
    } catch (error) {
      toast.error(
        error.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-md">

        <Link
          to="/forgot-password"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <ShieldCheck size={24} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Verify OTP
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Enter the 6-digit OTP sent to your email.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="000000"
                className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;