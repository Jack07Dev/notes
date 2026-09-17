import { Search, Bell, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-sm text-slate-400">Welcome back 👋</p>

        <h2 className="text-xl font-bold text-slate-900">Your Notes</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center rounded-xl bg-slate-100 px-3 py-2 md:flex">
          <Search size={18} className="text-slate-400" />

          <input
            placeholder="Search notes..."
            className="w-48 bg-transparent px-2 text-sm outline-none"
          />
        </div>

        <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        <Link
          to="/notes/create"
          className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:flex"
        >
          <Plus size={18} />
          New Note
        </Link>

        <Link
          to="/profile"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-100 font-semibold text-indigo-600"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          ) : (
            user?.username?.charAt(0).toUpperCase() || "U"
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
