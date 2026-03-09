import { create } from "zustand"
import type { FileStore } from "@/types/fileExplorer"


export const useFilesStore = create<FileStore>((set) => ({
  path: [],
  fileItems: [],

  setPath: (path) => set({ path }),
  setFileItems: (fileItems) => set({ fileItems }),

  clear: () =>
    set({
      path: [],
      fileItems: []
    })
}))

