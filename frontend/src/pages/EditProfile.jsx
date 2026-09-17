import { ArrowLeft, Save, User, Image, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getCurrentUser, updateProfile } from "../api/authApi";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        const user = response.data;

        setFormData({
          username: user.username || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error(error.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile({
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        profileImage: formData.profileImage.trim(),
      });

      toast.success(response.message || "Profile updated successfully");

      navigate("/profile");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
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
          Edit Profile
        </h1>

        <p className="mt-1 text-slate-500">
          Update your account information.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8"
      >
        <div className="space-y-6">

          {/* Avatar Preview */}
          <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt={formData.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                formData.username?.charAt(0).toUpperCase() || "U"
              )}
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Profile picture
              </h2>

              <p className="text-sm text-slate-500">
                Enter an image URL below to update your avatar.
              </p>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Username
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <User size={18} className="text-slate-400" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Profile Image URL
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <Image size={18} className="text-slate-400" />

              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Bio
            </label>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <FileText
                size={18}
                className="mt-1 text-slate-400"
              />

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                maxLength={250}
                rows={4}
                className="flex-1 resize-none bg-transparent outline-none"
              />
            </div>

            <p className="mt-1 text-right text-xs text-slate-400">
              {formData.bio.length}/250
            </p>
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

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;