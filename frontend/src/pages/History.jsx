import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Loader2,
  History as HistoryIcon,
  X,
  CalendarDays,
  FileText,
} from "lucide-react";
import { fetchHistory } from "../api/historyApi";
import toast from "react-hot-toast";

function History() {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await fetchHistory();

      setHistory(response.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const counts = useMemo(() => {
    return {
      all: history.length,

      created: history.filter(
        (item) => item.action === "created"
      ).length,

      updated: history.filter(
        (item) => item.action === "updated"
      ).length,

      deleted: history.filter(
        (item) => item.action === "deleted"
      ).length,
    };
  }, [history]);

  const filteredHistory = useMemo(() => {
    if (activeTab === "all") {
      return history;
    }

    return history.filter(
      (item) => item.action === activeTab
    );
  }, [history, activeTab]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionConfig = (action) => {
    const config = {
      created: {
        icon: Plus,
        label: "Created",
        iconClass: "bg-emerald-50 text-emerald-600",
        badgeClass: "bg-emerald-50 text-emerald-600",
      },

      updated: {
        icon: Edit3,
        label: "Updated",
        iconClass: "bg-indigo-50 text-indigo-600",
        badgeClass: "bg-indigo-50 text-indigo-600",
      },

      deleted: {
        icon: Trash2,
        label: "Deleted",
        iconClass: "bg-red-50 text-red-600",
        badgeClass: "bg-red-50 text-red-600",
      },
    };

    return config[action] || config.updated;
  };

  const tabs = [
    {
      key: "all",
      label: "All",
      count: counts.all,
    },
    {
      key: "created",
      label: "Created",
      count: counts.created,
    },
    {
      key: "updated",
      label: "Updated",
      count: counts.updated,
    },
    {
      key: "deleted",
      label: "Deleted",
      count: counts.deleted,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <HistoryIcon size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              History
            </h1>

            <p className="mt-1 text-slate-500">
              See what you've recently done.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-60 items-center justify-center">
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2
              size={20}
              className="animate-spin"
            />
            Loading history...
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredHistory.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <HistoryIcon
            size={40}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            No activity found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            There is no {activeTab === "all" ? "" : activeTab} activity yet.
          </p>
        </div>
      )}

      {/* History List */}
      {!loading && filteredHistory.length > 0 && (
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const config = getActionConfig(item.action);
            const Icon = config.icon;

            return (
              <button
                key={item._id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-slate-300 hover:shadow-md"
              >
                {/* Action icon */}
                <div
                  className={`shrink-0 rounded-xl p-3 ${config.iconClass}`}
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {config.label} note
                    </p>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${config.badgeClass}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {item.noteTitle}
                  </p>
                </div>

                {/* Date */}
                <span className="hidden shrink-0 text-xs text-slate-400 sm:block">
                  {formatDate(item.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Activity Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Note activity information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5">
              {/* Action */}
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-3 ${
                    getActionConfig(selectedItem.action).iconClass
                  }`}
                >
                  {(() => {
                    const Icon =
                      getActionConfig(selectedItem.action).icon;

                    return <Icon size={20} />;
                  })()}
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Action
                  </p>

                  <p className="text-sm font-semibold capitalize text-slate-900">
                    {selectedItem.action}
                  </p>
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-500">
                  <FileText size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Note
                  </p>

                  <p className="break-words text-sm font-semibold text-slate-900">
                    {selectedItem.noteTitle}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-500">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    {formatDate(selectedItem.createdAt)}
                  </p>
                </div>
              </div>

              {/* Note ID */}
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Note ID
                </p>

                <p className="mt-1 break-all font-mono text-xs text-slate-600">
                  {selectedItem.noteId}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;