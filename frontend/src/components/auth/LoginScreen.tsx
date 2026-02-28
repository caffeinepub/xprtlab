import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, Shield, FlaskConical, FileText, Activity } from 'lucide-react';

export default function LoginScreen() {
  const { login, loginStatus, identity } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center p-4">
      {/* Logo Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/logo-1.png"
            alt="Xpertlab"
            className="h-14 w-auto object-contain"
          />
          <p className="text-sm text-muted-foreground font-medium">Phlebotomist Portal</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <FlaskConical className="h-4 w-4" />, label: 'Sample Collection' },
            { icon: <Activity className="h-4 w-4" />, label: 'Vitals Tracking' },
            { icon: <FileText className="h-4 w-4" />, label: 'Lab Reports' },
            { icon: <Shield className="h-4 w-4" />, label: 'Secure Access' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-xl p-2.5">
              <span className="text-primary">{f.icon}</span>
              <span className="text-xs font-semibold text-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Sign In Button */}
        <button
          onClick={login}
          disabled={isLoggingIn || isAuthenticated}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors shadow-sm"
        >
          {isLoggingIn ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
          ) : (
            <><Shield className="h-4 w-4" /> Sign In Securely</>
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Powered by Internet Identity — secure, passwordless authentication
        </p>
      </div>
    </div>
  );
}
