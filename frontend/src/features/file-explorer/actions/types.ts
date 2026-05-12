import type { IconType } from "react-icons";

export type ContextMenuLayout = "empty" | "file" | "folder" | "multiple";
export type FileExplorerMode = "default" | "trash";


export type ContextMenuAction = 
  | "new-folder"
  | "upload-files"
  | "folder-props"
  | "download"
  | "rename"
  | "copy"
  | "move"
  | "delete"
  | "restore"
  | "permanently-delete";

export interface ContextMenuItemConfig {
  action: ContextMenuAction;
  icon: IconType;
  label: string;
  variant?: "default" | "danger";
  hidden?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  hasDivider?: boolean;
}

export interface ContextMenuConfig {
  empty: ContextMenuItemConfig[];
  file: ContextMenuItemConfig[];
  folder: ContextMenuItemConfig[];
  multiple: ContextMenuItemConfig[];
}



export type PathBarAction =
  | "rename"
  | "delete"
  | "new-item"
  | "restore"
  | "permanent-delete";

export interface PathBarButtonConfig {
  action: PathBarAction;
  icon: IconType;
  title: string;
  variant?: "default" | "danger";
  onClick?: () => void;
}

export interface PathBarConfig {
  primaryButton: PathBarButtonConfig;
  toolButtons: PathBarButtonConfig[];
}



export interface ModeConfig {
  contextMenu: ContextMenuConfig;
  pathBar: PathBarConfig;
}

export type ModeRegistry = Record<FileExplorerMode, ModeConfig>;
