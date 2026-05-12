import type { ModeConfig } from "../types";
import { trashContextMenuConfig } from "./contextMenu.config";
import { trashPathBarConfig } from "./pathBar.config";

export const trashModeConfig: ModeConfig = {
  contextMenu: trashContextMenuConfig,
  pathBar: trashPathBarConfig,
};
