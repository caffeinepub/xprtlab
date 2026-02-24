import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FlaskConical, Users, Shield, ArrowRight, Heart } from 'lucide-react';

export default function AppSelectorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-accent flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center pt-10 pb-6 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white rounded-2xl p-3 shadow-lg">
            <img
              src="/assets/generated/xprtlab-logo.dim_256x256.png"
              alt="XpertLab Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">XpertLab</h1>
            <p className="text-white/80 text-sm mt-1">Advanced Diagnostic Solutions</p>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="px-4 mb-8">
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="XpertLab Hero"
            className="w-full h-40 object-cover"
          />
        </div>
      </div>

      {/* App Selection Cards */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-10">
        <div className="w-full max-w-2xl">
          <h2 className="text-white text-center text-xl font-semibold mb-6">
            Choose your portal to get started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Patient App Card */}
            <button
              onClick={() => navigate({ to: '/patient-app' })}
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left border-2 border-transparent hover:border-accent/30 focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Patient App</h3>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">For Patients</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Book diagnostic tests, manage your appointments, view lab reports, and track your health vitals — all in one place.
              </p>
              <ul className="space-y-1.5 mb-5">
                {['Book Tests & Slots', 'Home Collection Requests', 'View Lab Reports', 'Track Health Vitals'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Enter Patient Portal</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>

            {/* Staff App Card */}
            <button
              onClick={() => navigate({ to: '/staff-app' })}
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left border-2 border-transparent hover:border-primary/30 focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Staff App</h3>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">For Staff & Admins</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Manage tasks, process home collections, upload reports, review incidents, and access audit logs.
              </p>
              <ul className="space-y-1.5 mb-5">
                {['Phlebotomist Task Queue', 'Upload Lab Reports', 'Manage Incidents', 'Audit Logs & Analytics'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">Enter Staff Portal</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-white/60 text-xs">
        <p>
          Built with <Heart className="inline w-3 h-3 text-red-300 mx-0.5" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'xpertlab')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-1">© {new Date().getFullYear()} XpertLab. All rights reserved.</p>
      </footer>
    </div>
  );
}
