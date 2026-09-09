import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-indigo-600">404</p>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
