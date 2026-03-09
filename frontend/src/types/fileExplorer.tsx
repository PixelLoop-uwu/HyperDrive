import type { Sort } from "@/types/sort"
import type { Dispatch, SetStateAction } from "react"


export type FileItem = {
  id: string
  name: string
  type: "file" | "folder"
  size: number
  modified: number
  created: number
  stared: boolean
}

export type FileStore = {
  path: string[]
  fileItems: FileItem[]

  setPath: (path: string[]) => void
  setFileItems: (items: FileItem[]) => void
  clear: () => void
}


export type FileExplorerProps = {
  title: string
  path: string[]
  files: FileItem[] | undefined
}

export type FileToolbarProps = {
  title: string
  sort: Sort
  path: string[]
  setSort: Dispatch<SetStateAction<Sort>>
  selectedFileIds: string[]
}

export type FileListProps = {
  files: FileItem[] | undefined 
  path: string[]
  selectedFileIds: string[]
  setSelectedFileIds: Dispatch<SetStateAction<string[]>>
}
