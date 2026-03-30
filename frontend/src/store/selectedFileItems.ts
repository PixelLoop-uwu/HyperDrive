import { create } from "zustand"
import type { SelectedFileItemsStore, FileItem } from "@/types/fileExplorer"

export const useSelectedFilesStore = create<SelectedFileItemsStore>((set) => ({
  selected: [] as FileItem[],

  setSelectedItems: (items: FileItem[]) =>
    set({
      selected: items
    }),

  addSelectedItems: (items: FileItem[]) =>
    set((state) => ({
      selected: [...state.selected, ...items]
    })),

  removeSelectedItems: (ids: string[]) =>
    set((state) => {
      const idsSet = new Set(ids)

      return {
        selected: state.selected.filter(file => !idsSet.has(file.id))
      }
    }),

  clear: () =>
    set({
      selected: []
    })
}))