import { create } from "zustand"
import type { ContextMenuStore } from "@/types/contextMenu"

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
  x: 0,
  y: 0,

  isOpen: false,
  type: undefined,
  selectedFileItems: null,

  tuneContextMenu: (x, y, type, selectedFileItems) =>
    set({
      x,
      y,
      type,
      selectedFileItems
    }),

  toggleContextMenu: () =>
    set((state) => ({ isOpen: !state.isOpen }))
}))