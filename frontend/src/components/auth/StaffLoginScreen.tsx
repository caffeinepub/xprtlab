import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Shield, ClipboardList, Upload, AlertTriangle, BarChart3, FlaskConical, Crown, Beaker } from 'lucide-react';
import GradientButton from '../shared/GradientButton';
import { AppRole } from '../../backend';

interface StaffLoginScreenProps {
  showRoleError?: boolean;
  onDemoMode?: (role: AppRole) => void;
}

export default function StaffLoginScreen({ showRoleError = false, onDemoMode }: StaffLoginScreenProps) {
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
    { icon: ClipboardList, label: 'Task Management', desc: 'Manage phlebotomy tasks' },
    { icon: Upload, label: 'Upload Reports', desc: 'Upload lab results' },
    { icon: AlertTriangle, label: 'Incident Reports', desc: 'Submit & review incidents' },
    { icon: BarChart3, label: 'Audit Logs', desc: 'Full system audit trail' },
  ];

  const demoRoles = [
    {
      role: AppRole.phlebotomist,
      label: 'Phlebotomist',
      emoji: '🩸',
      icon: FlaskConical,
      desc: 'Task Queue & Collections',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      role: AppRole.labAdmin,
      label: 'Lab Admin',
      emoji: '🔬',
      icon: Beaker,
      desc: 'Bookings & Reports',
      color: 'from-violet-500 to-purple-500',
    },
    {
      role: AppRole.superAdmin,
      label: 'Super Admin',
      emoji: '👑',
      icon: Crown,
      desc: 'Full System Access',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/80 to-primary flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl p-2 shadow-md">
            <img
              src="/assets/generated/xprtlab-logo.dim_256x256.png"
              alt="XpertLab"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">XpertLab</h1>
            <p className="text-white/70 text-xs">Staff Portal</p>
          </div>
        </div>
        <a
          href="/"
          className="text-white/70 text-xs underline hover:text-white transition-colors"
        >
          ← Back
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pb-8 pt-4">
        <div className="w-full max-w-md">
          {/* Role Error */}
          {showRoleError && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-5 text-center">
              <p className="text-white font-semibold text-sm">⚠️ Patient Account Detected</p>
              <p className="text-white/80 text-xs mt-1">
                This app is for staff only. Please use the{' '}
                <a href="/patient-app" className="underline font-medium">XpertLab Patient App</a>.
              </p>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-3 shadow-md">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Staff Portal</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to access your staff dashboard
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-3 mb-4 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Role-based access:</p>
              <ul className="space-y-0.5">
                <li>🩸 <strong>Phlebotomist</strong> → Task Queue & Home Collections</li>
                <li>🔬 <strong>Lab Admin</strong> → Bookings & Report Upload</li>
                <li>👑 <strong>Super Admin</strong> → Full System Access</li>
              </ul>
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

            {/* Divider */}
            {onDemoMode && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-medium px-1">OR TRY DEMO MODE</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Demo Mode Section */}
                <div>
                  <p className="text-center text-xs text-muted-foreground mb-3">
                    Explore the app instantly — no login required
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {demoRoles.map(({ role, label, emoji, desc, color }) => (
                      <button
                        key={role}
                        onClick={() => onDemoMode(role)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-transparent bg-gradient-to-br ${color} text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-150`}
                      >
                        <span className="text-xl leading-none">{emoji}</span>
                        <span className="text-xs font-bold leading-tight text-center">{label}</span>
                        <span className="text-[10px] leading-tight text-white/80 text-center">{desc}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground mt-2">
                    ⚠️ Demo data only — no real backend calls
                  </p>
                </div>
              </>
            )}
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
        © {new Date().getFullYear()} XpertLab · Built with{' '}
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
