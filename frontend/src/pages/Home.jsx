import { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  Trash2,
  Loader2,
  ArrowRight,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchAdminDashboard } from "../api/adminApi";

import { Link } from "react-router-dom";
import { fetchNotes } from "../api/api";

function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentNotes, setRecentNotes] = useState([]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetchAdminDashboard();
      setDashboard(response.data);
    } catch (error) {
      toast.error(error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadRecentNotes = async () => {
    try {
      const response = await fetchNotes();
      const notes = response.data || [];
      const latestNotes = [...notes]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentNotes(latestNotes);
    } catch (error) {
      toast.error(error.message || "Failed to load recent notes");
    }
  };

  useEffect(() => {
    loadDashboard();
    loadRecentNotes();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.totalUsers ?? 0,
      icon: Users,
    },
    {
      title: "Total Notes",
      value: dashboard?.totalNotes ?? 0,
      icon: FileText,
    },
    {
      title: "Recent Notes",
      value: dashboard?.recentNotes ?? 0,
      icon: Clock3,
    },
    {
      title: "Deleted Notes",
      value: dashboard?.deletedNotes ?? 0,
      icon: Trash2,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-indigo-600 p-8 text-white shadow-lg">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium text-indigo-200">
            YOUR PERSONAL WORKSPACE
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Capture your ideas.
            <br />
            Keep everything organized.
          </h1>

          <p className="mt-4 max-w-xl text-indigo-100">
            Create, organize and manage your notes from one beautiful, simple
            workspace.
          </p>

          <Link
            to="/notes/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Create your first note
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Stats */}

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {loading ? <Loader2 /> : stats.value}
      </p>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Recent */}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Notes</h2>

            <p className="text-sm text-slate-500">Your latest notes</p>
          </div>

          <Link
            to="/notes"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
          </Link>
        </div>

        {recentNotes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">No notes found.</p>

            <Link
              to="/notes/create"
              className="mt-3 inline-block text-sm font-semibold text-indigo-600"
            >
              Create your first note
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentNotes.map((note) => (
              <div
                key={note._id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                    Note
                  </span>

                  <span className="text-xs text-slate-400">
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {note.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
