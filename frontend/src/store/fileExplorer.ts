import { create } from "zustand"
import type { FileStore, FileItem } from "@/types/fileExplorer"

export const useFilesStore = create<FileStore>((set) => ({
  path: [],
  fileItems: undefined,

  setPath: (path: string[]) =>
    set(() => ({ path })),

  setFileItems: (fileItems: FileItem[]) =>
    set(() => ({ fileItems })),

  addFileItem: (item: FileItem) =>
    set((state) => ({
      fileItems: [...state.fileItems ?? [], item]
  })),

  removeFileItem: (name: string) =>
    set((state) => ({
      fileItems: state.fileItems?.filter(f => f.name !== name)
  })),

  starToggle: (id: string) =>
    set((state) => ({
      fileItems: state.fileItems?.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred }
          : item
      )
    })),

  clear: () =>
    set(() => ({
      path: [],
      fileItems: []
    }))
}))