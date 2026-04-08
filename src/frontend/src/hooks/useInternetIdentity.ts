/**
 * useInternetIdentity — STUB (Internet Identity removed)
 *
 * Internet Identity has been removed from this app.
 * This stub exists only to satisfy any remaining import references
 * that have not yet been cleaned up.
 * Do not add new usages of this hook.
 */

export type Status =
  | "initializing"
  | "idle"
  | "logging-in"
  | "success"
  | "loginError";

export type InternetIdentityContext = {
  identity: undefined;
  login: () => void;
  clear: () => void;
  loginStatus: Status;
  isInitializing: boolean;
  isLoginIdle: boolean;
  isLoggingIn: boolean;
  isLoginSuccess: boolean;
  isLoginError: boolean;
  loginError: undefined;
};

export const useInternetIdentity = (): InternetIdentityContext => ({
  identity: undefined,
  login: () => {},
  clear: () => {
    localStorage.removeItem("xpertlab_session");
  },
  loginStatus: "idle",
  isInitializing: false,
  isLoginIdle: true,
  isLoggingIn: false,
  isLoginSuccess: false,
  isLoginError: false,
  loginError: undefined,
});

// No-op provider for any remaining JSX references
export function InternetIdentityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}

import type React from "react";
