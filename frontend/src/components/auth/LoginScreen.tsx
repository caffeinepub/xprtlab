import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, Shield, Activity, FileText, FlaskConical } from 'lucide-react';

export default function LoginScreen() {
  const { login, isLoggingIn, loginStatus } = useAuth();

  const features = [
    { icon: <FlaskConical className="w-5 h-5" />, label: 'Test Booking' },
    { icon: <Activity className="w-5 h-5" />, label: 'Health Vitals' },
    { icon: <FileText className="w-5 h-5" />, label: 'Digital Reports' },
    { icon: <Shield className="w-5 h-5" />, label: 'Secure & Private' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden gradient-primary flex-shrink-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/assets/generated/hero-banner.dim_1200x400.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white opacity-5" />

        <div className="relative z-10 px-6 pt-16 pb-12 text-white text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-gradient-glow">
              <img
                src="/assets/generated/logo.png"
                alt="XpertLab"
                className="h-14 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-white/80 text-sm font-medium">Expert Diagnostics at Your Doorstep</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-background px-6 py-8 flex flex-col">
        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-medical p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                {f.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Login Section */}
        <div className="mt-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">
              Sign in securely with Internet Identity to access your health dashboard
            </p>
          </div>

          <button
            onClick={login}
            disabled={isLoggingIn}
            className="gradient-btn w-full py-4 text-base font-semibold flex items-center justify-center gap-2 shadow-gradient-glow"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Sign in with Internet Identity
              </>
            )}
          </button>

          {loginStatus === 'loginError' && (
            <p className="text-destructive text-sm text-center mt-3">
              Login failed. Please try again.
            </p>
          )}

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secured by Internet Computer Protocol
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground bg-background border-t border-border">
        © {new Date().getFullYear()} XpertLab · Built with{' '}
        <span className="text-red-500">♥</span> using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'xpertlab')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium gradient-primary-text"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
