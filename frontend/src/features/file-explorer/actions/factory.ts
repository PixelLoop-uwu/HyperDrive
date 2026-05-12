import type { FileExplorerMode, ModeConfig, ModeRegistry } from "./types";
import { defaultModeConfig } from "./default";
import { trashModeConfig } from "./trash";


function createModeRegistry() {
  const registry: ModeRegistry = {
    default: defaultModeConfig,
    trash: trashModeConfig,
  };
  
  return {
    getMode(mode: FileExplorerMode): ModeConfig {
      const config = registry[mode];
      if (!config) throw new Error(`Mode "${mode}" is not registered`);
      return config;
    },
    registerMode: (mode: FileExplorerMode, config: ModeConfig) => {
      registry[mode] = config;
    }
  };
}

export const modeRegistry = createModeRegistry();
