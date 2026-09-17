import { User, Mail, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log("Current user:", response);

        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-red-500">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <p className="mt-1 text-slate-500">Manage your account information.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col items-center gap-5 justify-between border-b border-slate-100 pb-8 sm:flex-row">
          <div className="flex items-center gap-5 justify-between">
            <div className="flex flex-col items-center justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.username?.charAt(0).toUpperCase()
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {user.username}
              </h2>

              <p className="text-slate-500">Notes workspace member</p>
            </div>
          </div>
          <div className="">
            <Link
              to="/profile/edit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <User size={18} className="text-slate-400" />

              <input
                value={user.username || ""}
                readOnly
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Mail size={18} className="text-slate-400" />

              <input
                value={user.email || ""}
                readOnly
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Shield size={18} className="text-emerald-500" />

              <span className="text-sm font-medium text-emerald-600">
                {user.role === "admin" ? "Admin" : "Active"}
              </span>
            </div>
          </div>
          {/* Bio */}
          {user.bio && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bio
              </label>

              <div className="rounded-xl border border-slate-200 px-4 py-3 text-slate-600">
                {user.bio}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
