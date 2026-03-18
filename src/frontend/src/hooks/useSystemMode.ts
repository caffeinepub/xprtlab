import { useCallback, useState } from "react";

const CACHE_KEY = "xpertlab_system_mode";

export type SystemModeValue = "test" | "production" | "demo";

export function useSystemMode() {
  const [systemMode, setSystemModeState] = useState<SystemModeValue>(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached === "test" || cached === "production") return cached;
    return "demo";
  });

  const setSystemMode = useCallback(async (mode: SystemModeValue) => {
    setSystemModeState(mode);
    localStorage.setItem(CACHE_KEY, mode);
  }, []);

  return {
    systemMode,
    isTestMode: systemMode === "test",
    setSystemMode,
    loading: false,
  };
}
