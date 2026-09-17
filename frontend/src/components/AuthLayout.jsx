import { BookOpen, CheckCircle2, Sparkles } from "lucide-react";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        
        {/* Background decoration */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <BookOpen size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Jenny Notes
              </h1>
              <p className="text-xs text-slate-400">
                Your thoughts, organized.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-lg">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 mb-6">
              <Sparkles size={15} />
              Simple. Powerful. Personal.
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Capture your ideas.
              <span className="block text-indigo-400">
                Remember everything.
              </span>
            </h2>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Keep your notes organized, accessible, and secure.
              Write down your thoughts whenever inspiration strikes.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-indigo-400" size={20} />
                <span className="text-slate-300">
                  Create and manage notes easily
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-indigo-400" size={20} />
                <span className="text-slate-300">
                  Keep track of your note history
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-indigo-400" size={20} />
                <span className="text-slate-300">
                  Access your notes securely
                </span>
              </div>

            </div>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 Jenny Notes
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <BookOpen size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Jenny Notes
                </h1>
                <p className="text-xs text-slate-500">
                  Your thoughts, organized.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>
          </div>

          {children}

        </div>
      </div>
    </div>
  );
}

export default AuthLayout;