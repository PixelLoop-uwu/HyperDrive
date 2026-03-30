import type { FileItem } from "./fileExplorer"
import type { IconType } from "react-icons"

export type ContextMenuStore = {
  x: number
  y: number
  type: "file" | "folder" | "empty" | undefined
  selectedFileItems: FileItem[] | null
  isOpen: boolean

  tuneContextMenu: (
    x: number,
    y: number,
    type: "file" | "folder" | "empty",
    selectedFileItems: FileItem[] | null
  ) => void

  toggleContextMenu: () => void
}

export type ActionButton = {
  key: string
  label: string
  forSingle?: boolean 
  gap?: boolean
  icon: IconType
  handler: (items: FileItem[] | null) => void
}