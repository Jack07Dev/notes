import { FileText, Clock3, Trash2, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Notes",
    value: "24",
    icon: FileText,
  },
  {
    title: "Recent Notes",
    value: "8",
    icon: Clock3,
  },
  {
    title: "Deleted Notes",
    value: "3",
    icon: Trash2,
  },
];

const recentNotes = [
  {
    id: 1,
    title: "Project Ideas",
    description: "Ideas for my next full-stack application...",
    date: "Sep 09, 2026",
  },
  {
    id: 2,
    title: "Learning React",
    description: "React hooks, optimization and advanced patterns.",
    date: "Sep 08, 2026",
  },
  {
    id: 3,
    title: "Backend Architecture",
    description: "Express, MongoDB, controllers and services.",
    date: "Sep 07, 2026",
  },
];

function Home() {
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

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

          <Link to="/notes" className="text-sm font-semibold text-indigo-600">
            View all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentNotes.map((note) => (
            <div
              key={note.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  Note
                </span>

                <span className="text-xs text-slate-400">{note.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {note.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
