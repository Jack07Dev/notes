import { ArrowLeft, Lock, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { changePassword } from "../api/authApi";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setSaving(true);

      const response = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        response.message || "Password changed successfully"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Change password error:", error);

      toast.error(
        error.message || "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/profile"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        <h1 className="text-3xl font-bold text-slate-900">
          Change Password
        </h1>

        <p className="mt-1 text-slate-500">
          Update your account password.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8"
      >
        <div className="space-y-6">

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Current Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              New Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="flex-1 bg-transparent outline-none"
              />
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Minimum 6 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm New Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
            <Link
              to="/profile"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {saving ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;