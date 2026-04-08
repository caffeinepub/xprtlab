/**
 * useActor — STUB (Internet Identity removed)
 *
 * The actor is now managed directly inside backendService.ts as an
 * anonymous singleton. This stub exists only to satisfy any remaining
 * import references that have not yet been cleaned up.
 * Do not add new usages of this hook.
 */

import type { BackendActor } from "../types/backendTypes";

export function useActor(): {
  actor: BackendActor | null;
  isFetching: boolean;
} {
  return { actor: null, isFetching: false };
}
