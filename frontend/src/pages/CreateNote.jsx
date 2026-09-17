import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function CreateNote({
  isEdit = false,
  formData = { title: "", content: "" },
  onFormChange,
  onSubmit,
  loading = false,
  error = "",
}) {

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/notes"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to notes
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {isEdit ? "Edit Note" : "Create Note"}
          </h1>

          <p className="mt-2 text-slate-500">
            {isEdit
              ? "Update your note."
              : "Write down your idea, task or thought."}
          </p>
        </div>
        {/* Error message */}{" "}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {" "}
            {error}{" "}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>

            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={onFormChange}
              placeholder="Enter note title..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Content
            </label>

            <textarea
              required
              rows="12"
              name="content"
              value={formData.content}
              onChange={onFormChange}
              placeholder="Write your note..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
            <Link
              to="/notes"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Save size={18} />
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Saving..."
                : isEdit
                  ? "Update Note"
                  : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
