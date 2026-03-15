import { useCallback, useEffect, useState } from "react";
import { SystemMode } from "../backend";
import { useActor } from "./useActor";

const CACHE_KEY = "xpertlab_system_mode";

export type SystemModeValue = "test" | "production" | "demo";

export function useSystemMode() {
  const { actor, isFetching } = useActor();
  const [systemMode, setSystemModeState] = useState<SystemModeValue>(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached === "test" || cached === "production") return cached;
    return "demo";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getSystemMode()
      .then((mode) => {
        const val: SystemModeValue =
          mode === SystemMode.test ? "test" : "production";
        setSystemModeState(val);
        localStorage.setItem(CACHE_KEY, val);
      })
      .catch(() => {
        // keep cached value
      })
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const setSystemMode = useCallback(
    async (mode: SystemModeValue) => {
      if (!actor) return;
      const backendMode =
        mode === "test" ? SystemMode.test : SystemMode.production;
      await actor.setSystemMode(backendMode);
      setSystemModeState(mode);
      localStorage.setItem(CACHE_KEY, mode);
    },
    [actor],
  );

  return {
    systemMode,
    isTestMode: systemMode === "test",
    setSystemMode,
    loading,
  };
}
