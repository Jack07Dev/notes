import { User, Mail, Shield } from "lucide-react";

function Profile() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <p className="mt-1 text-slate-500">Manage your account information.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col items-center gap-5 border-b border-slate-100 pb-8 sm:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
            J
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Jawed</h2>

            <p className="text-slate-500">Notes workspace member</p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <User size={18} className="text-slate-400" />

              <input value="Jawed" readOnly className="flex-1 outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Mail size={18} className="text-slate-400" />

              <input
                value="jawed@example.com"
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
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
