const SESSION_KEY = "xpertlab_session";

export interface XpertSession {
  userId: string;
  mobileNumber?: string;
  mobile?: string;
  role: "phlebotomist" | "labAdmin" | "superAdmin" | "patient";
  loginType: "identity" | "otp";
  name?: string;
  loginAt?: number;
}

export function getSession(): XpertSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as XpertSession;
  } catch {
    return null;
  }
}

export function saveSession(session: XpertSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
