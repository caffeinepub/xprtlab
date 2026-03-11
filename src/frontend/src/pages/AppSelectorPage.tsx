import { useNavigate } from "@tanstack/react-router";

export default function AppSelectorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-sm px-4 py-4 flex items-center justify-center">
        <img
          src="/assets/logo.png"
          alt="XpertLab"
          className="h-[36px] w-auto object-contain"
        />
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="XpertLab Hero"
          className="w-full h-40 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl font-bold mb-1">Welcome to XpertLab</h1>
            <p className="text-sm opacity-90">
              Your trusted diagnostic partner
            </p>
          </div>
        </div>
      </div>

      {/* Portal Selection */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Select Your Portal
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose the app that matches your role
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          {/* Patient App Card */}
          <button
            type="button"
            onClick={() => navigate({ to: "/patient-app" })}
            className="w-full bg-card rounded-2xl shadow-card p-6 text-left hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground mb-0.5">
                  Patient App
                </h3>
                <p className="text-xs text-muted-foreground">
                  Book tests, view reports & track health
                </p>
              </div>
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Staff App Card */}
          <button
            type="button"
            onClick={() => navigate({ to: "/staff-app" })}
            className="w-full bg-card rounded-2xl shadow-card p-6 text-left hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground mb-0.5">
                  Staff App
                </h3>
                <p className="text-xs text-muted-foreground">
                  Manage samples, attendance & reports
                </p>
              </div>
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} XpertLab
        </p>
      </footer>
    </div>
  );
}
