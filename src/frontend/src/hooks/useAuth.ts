import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "../types/models";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // The backend exposes getCallerUserRole; we build a minimal profile from it
      try {
        const role = await actor.getCallerUserRole();
        return { name: "", appRole: role as any, phone: "" };
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
