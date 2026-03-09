import type { FileItem } from "./fileExplorer"

export type ContextMenuState = {
  visible: boolean
  x: number
  y: number
  file: FileItem | null
}

export type ContextMenuProps = {
  x: number
  y: number
  file?: FileItem | null
  path: string[]
  onClose: () => void
}

export type MenuAction = {
  label: string
  icon: React.ReactNode
  onClick: () => void
  gap?: boolean
}