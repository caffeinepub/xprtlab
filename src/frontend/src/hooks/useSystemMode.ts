export type SystemModeValue = "production";
export function useSystemMode() {
  return {
    systemMode: "production" as SystemModeValue,
    isTestMode: false,
    setSystemMode: async () => {},
    loading: false,
  };
}
