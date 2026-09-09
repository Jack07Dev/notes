import { Search, Plus, MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteNote, fetchNotes } from "../api/apiConfig";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notes from the backend API
  const getNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchNotes();
      //your api response should be in the format of { data: [...] }
      setNotes(response.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to load notes.");

    } finally {
      setLoading(false);
    }
  };

  // Delete note from backend
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      // Update UI immediately without page refresh
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete note.");
    }
  };

  // Fetch notes when component loads
  useEffect(() => {
    getNotes();
  }, []);

  // Search notes by title or content
  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();
    return (
      note.title?.toLowerCase().includes(searchText) ||
      note.content?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Notes</h1>

          <p className="mt-1 text-slate-500">
            Manage all your notes in one place.
          </p>
        </div>

        <Link
          to="/notes/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Note
        </Link>
      </div>
      <div className="mb-6 flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3">
        <Search size={19} className="text-slate-400" />

        <input
          placeholder="Search your notes..."
          className="ml-3 flex-1 bg-transparent text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-slate-500">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {!loading && (
        <>
          {filteredNotes.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-500">
                {search ? "No notes found." : "No notes available."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      Note
                    </div>

                    <button className="text-slate-400 hover:text-slate-700">
                      <MoreVertical size={19} />
                    </button>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-slate-900">
                    {note.title}
                  </h2>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-500">
                    {note.content}
                  </p>

                  <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400">{note.date}</span>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-sm font-semibold text-red-600 hover:text-red-700 px-4"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/notes/${note._id}/edit`}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Notes;
