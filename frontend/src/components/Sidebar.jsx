import {
  Home,
  FileText,
  Plus,
  History,
  User,
  LogOut,
  BookOpen,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: FileText,
  },
  {
    name: "Create Note",
    path: "/notes/create",
    icon: Plus,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}

        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">Jenny</h1>

            <p className="text-xs text-slate-400">Notes workspace</p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon size={19} />

                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}

        <div className="border-t border-slate-100 p-4">
          <NavLink
            to="/profile"
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <User size={19} />
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
