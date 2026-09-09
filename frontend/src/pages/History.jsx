import { Plus, Trash2, Edit3 } from "lucide-react";

const history = [
  {
    type: "created",
    title: "Project Ideas",
    date: "Today, 10:30 AM",
  },
  {
    type: "updated",
    title: "React Learning",
    date: "Yesterday, 06:20 PM",
  },
  {
    type: "deleted",
    title: "Old Project",
    date: "Sep 07, 2026",
  },
];

function History() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">History</h1>

        <p className="mt-1 text-slate-500">See what you've recently done.</p>
      </div>

      <div className="space-y-3">
        {history.map((item, index) => {
          const config = {
            created: {
              icon: Plus,
              label: "Created",
              className: "bg-emerald-50 text-emerald-600",
            },
            updated: {
              icon: Edit3,
              label: "Updated",
              className: "bg-indigo-50 text-indigo-600",
            },
            deleted: {
              icon: Trash2,
              label: "Deleted",
              className: "bg-red-50 text-red-600",
            },
          }[item.type];

          const Icon = config.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className={`rounded-xl p-3 ${config.className}`}>
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {config.label} note
                </p>

                <p className="mt-1 text-sm text-slate-500">{item.title}</p>
              </div>

              <span className="text-xs text-slate-400">{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
