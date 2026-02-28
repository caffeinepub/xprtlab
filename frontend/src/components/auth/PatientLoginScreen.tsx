import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Heart, FlaskConical, FileText, Activity, Home } from 'lucide-react';
import GradientButton from '../shared/GradientButton';

interface PatientLoginScreenProps {
  showRoleError?: boolean;
}

export default function PatientLoginScreen({ showRoleError = false }: PatientLoginScreenProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    if (identity) {
      await clear();
      queryClient.clear();
      return;
    }
    try {
      await login();
    } catch (error: any) {
      if (error?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const features = [
    { icon: FlaskConical, label: 'Book Diagnostic Tests', desc: 'Choose from 100+ tests' },
    { icon: Home, label: 'Home Collection', desc: 'Sample pickup at your door' },
    { icon: FileText, label: 'Digital Reports', desc: 'Access reports anytime' },
    { icon: Activity, label: 'Health Vitals', desc: 'Track BP, glucose & more' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-accent flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl px-3 py-2 shadow-md">
            <img
              src="/assets/logo-1.png"
              alt="Xpertlab"
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>
        <a
          href="/"
          className="text-white/70 text-xs underline hover:text-white transition-colors"
        >
          ← Back
        </a>
      </header>

      {/* Hero */}
      <div className="px-4 mb-6">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="XpertLab"
            className="w-full h-36 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pb-8">
        <div className="w-full max-w-md">
          {/* Role Error */}
          {showRoleError && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-5 text-center">
              <p className="text-white font-semibold text-sm">⚠️ Staff Account Detected</p>
              <p className="text-white/80 text-xs mt-1">
                This app is for patients only. Please use the{' '}
                <a href="/staff-app" className="underline font-medium">XpertLab Staff App</a>.
              </p>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 shadow-md">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Welcome, Patient</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to manage your health journey
              </p>
            </div>

            <GradientButton
              onClick={handleLogin}
              loading={isLoggingIn}
              className="w-full"
              size="lg"
            >
              {isLoggingIn ? 'Signing in...' : identity ? 'Sign Out' : 'Sign In with Internet Identity'}
            </GradientButton>

            <p className="text-center text-xs text-muted-foreground mt-3">
              Secure, private authentication — no passwords needed
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Icon className="w-5 h-5 text-white mb-2" />
                <p className="text-white text-xs font-semibold leading-tight">{label}</p>
                <p className="text-white/70 text-xs mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-white/50 text-xs">
        © {new Date().getFullYear()} Xpertlab · Built with{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'xpertlab')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/80"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
