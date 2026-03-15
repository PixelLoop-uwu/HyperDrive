export type FileItem = {
  id: string
  name: string
  type: "file" | "folder"
  size: number
  modified: number
  created: number
  starred: boolean
}


export type FileStore = {
  path: string[]
  fileItems: FileItem[] | undefined

  setPath: (path: string[]) => void
  setFileItems: (items: FileItem[]) => void
  addFileItem: (items: FileItem) => void
  removeFileItem: (path: string) => void

  starToggle: (id: string) => void
 
  clear: () => void
}

export type SelectedFileItemsStore = {
  selected: FileItem[]

  setSelectedItems: (items: FileItem[]) => void
  addSelectedItems: (items: FileItem[]) => void
  removeSelectedItems: (id: string[]) => void
  
  clear: () => void
}


export type FileExplorerProps = {
  title: string
}

export type FileToolbarProps = {
  title: string
}

export type FileListProps = {
  sortedFiles: FileItem[] | undefined 
}

export type FileSideBarProps = {
  usedSpace: number
  totalSpace: number
}