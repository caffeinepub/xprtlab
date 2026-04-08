import {
  createActor,
  type backendInterface,
  type CreateActorOptions,
  ExternalBlob,
} from "./backend";
import type { BackendActor } from "./types/backendTypes";
import { HttpAgent } from "@icp-sdk/core/agent";

interface JsonConfig {
  backend_host: string;
  backend_canister_id: string;
  project_id: string;
  ii_derivation_origin: string;
}

interface Config {
  backend_host?: string;
  backend_canister_id: string;
  project_id: string;
  ii_derivation_origin?: string;
}

let configCache: Config | null = null;

export async function loadConfig(): Promise<Config> {
  if (configCache) {
    return configCache;
  }
  const backendCanisterId = process.env.CANISTER_ID_BACKEND;
  const envBaseUrl = process.env.BASE_URL || "/";
  const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;
  try {
    const response = await fetch(`${baseUrl}env.json`);
    const config = (await response.json()) as JsonConfig;

    if (!backendCanisterId && config.backend_canister_id === "undefined") {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }

    const canisterId = (
      config.backend_canister_id === "undefined"
        ? backendCanisterId
        : config.backend_canister_id
    ) as string;

    console.log("CANISTER ID:", canisterId);

    const fullConfig: Config = {
      backend_host:
        config.backend_host === "undefined" ? undefined : config.backend_host,
      backend_canister_id: canisterId,
      project_id:
        config.project_id !== "undefined" ? config.project_id : "0000000-0000-0000-0000-00000000000",
      ii_derivation_origin:
        config.ii_derivation_origin === "undefined"
          ? undefined
          : config.ii_derivation_origin,
    };
    configCache = fullConfig;
    return fullConfig;
  } catch (e) {
    if (!backendCanisterId) {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }
    const fallbackConfig: Config = {
      backend_host: undefined,
      backend_canister_id: backendCanisterId,
      project_id: "0000000-0000-0000-0000-00000000000",
      ii_derivation_origin: undefined,
    };
    console.log("CANISTER ID (fallback):", backendCanisterId);
    configCache = fallbackConfig;
    return fallbackConfig;
  }
}

function extractAgentErrorMessage(error: string): string {
  const errorString = String(error);
  const match = errorString.match(/with message:\s*'([^']+)'/s);
  return match ? match[1] : errorString;
}

function processError(e: unknown): never {
  if (e && typeof e === "object" && "message" in e) {
    throw new Error(extractAgentErrorMessage(`${(e as { message: string }).message}`));
  }
  throw e;
}

async function maybeLoadMockBackend(): Promise<backendInterface | null> {
  if (import.meta.env.VITE_USE_MOCK !== "true") {
    return null;
  }

  try {
    const mockModules = import.meta.glob("./mocks/backend.{ts,tsx,js,jsx}");
    const path = Object.keys(mockModules)[0];
    if (!path) return null;
    const mod = (await mockModules[path]()) as {
      mockBackend?: backendInterface;
    };
    return mod.mockBackend ?? null;
  } catch {
    return null;
  }
}

// No-op stubs for ExternalBlob upload/download (object-storage not used in this project)
const _uploadFile = async (_file: ExternalBlob): Promise<Uint8Array> => {
  throw new Error("File upload not supported in this deployment");
};

const _downloadFile = async (_bytes: Uint8Array): Promise<ExternalBlob> => {
  throw new Error("File download not supported in this deployment");
};

export async function createActorWithConfig(
  options?: CreateActorOptions,
): Promise<BackendActor> {
  const mock = await maybeLoadMockBackend();
  if (mock) {
    return mock as unknown as BackendActor;
  }

  const config = await loadConfig();
  const resolvedOptions = options ?? {};
  const agent = new HttpAgent({
    ...resolvedOptions.agentOptions,
    host: config.backend_host,
  });

  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running",
      );
      console.error(err);
    });
  }

  const actorOptions: CreateActorOptions = {
    ...resolvedOptions,
    agent,
    processError,
  };

  return createActor(
    config.backend_canister_id,
    _uploadFile,
    _downloadFile,
    actorOptions,
  ) as unknown as BackendActor;
}
