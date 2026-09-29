import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Clock3,
  Trash2,
  Activity,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchAdminDashboard } from "../api/adminApi";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetchAdminDashboard();

      setDashboard(response.data);
    } catch (error) {
      toast.error(error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.totalUsers ?? 0,
      description: "Registered users",
      icon: Users,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Notes",
      value: dashboard?.totalNotes ?? 0,
      description: "Notes in system",
      icon: FileText,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Recent Notes",
      value: dashboard?.recentNotes ?? 0,
      description: "Created in last 7 days",
      icon: Clock3,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Deleted Notes",
      value: dashboard?.deletedNotes ?? 0,
      description: "Deleted notes",
      icon: Trash2,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck size={20} />
                </span>

                <span className="text-sm font-medium text-indigo-200">
                  ADMIN PANEL
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Dashboard Overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Monitor users, notes and activity across your Jenny Notes
                application.
              </p>
            </div>

            <button
              onClick={() => loadDashboard(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </section>

        {/* Stats */}
        {loading ? (
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </section>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
                    >
                      <Icon size={22} />
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 transition group-hover:text-slate-500"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Activity Overview */}
        <section className="grid gap-6 lg:grid-cols-3">

          {/* History Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Activity Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Summary of note activity
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Activity size={20} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Created
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {dashboard?.totalHistoryEntries
                    ? "—"
                    : 0}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Creation activity
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Updated
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {dashboard?.totalHistoryEntries
                    ? "—"
                    : 0}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Update activity
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Deleted
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {dashboard?.deletedNotes ?? 0}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Deletion activity
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Total activity
                </p>

                <p className="text-xs text-slate-400">
                  All recorded history entries
                </p>
              </div>

              <span className="text-xl font-bold text-indigo-600">
                {dashboard?.totalHistoryEntries ?? 0}
              </span>
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              System Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current application status
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-sm font-medium text-slate-700">
                    API Server
                  </span>
                </div>

                <span className="text-xs font-semibold text-emerald-600">
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Database
                  </span>
                </div>

                <span className="text-xs font-semibold text-emerald-600">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Authentication
                  </span>
                </div>

                <span className="text-xs font-semibold text-indigo-600">
                  Protected
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Jenny Notes Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your application currently has{" "}
                <span className="font-semibold text-slate-700">
                  {dashboard?.totalUsers ?? 0}
                </span>{" "}
                users managing{" "}
                <span className="font-semibold text-slate-700">
                  {dashboard?.totalNotes ?? 0}
                </span>{" "}
                notes.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3">
              <Activity size={18} className="text-indigo-600" />

              <span className="text-sm font-semibold text-indigo-700">
                {dashboard?.totalHistoryEntries ?? 0} activities
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;