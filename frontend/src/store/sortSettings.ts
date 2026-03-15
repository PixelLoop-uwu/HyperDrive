import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { SortField, SortState, SortOrder } from "@/types/sortSettings"

const DEFAULT_SORT = {
  field: "name" as SortField,
  order: "asc" as SortOrder
}

export const useSortSettingsStore = create<SortState>()(
  persist(
    (set) => ({
      ...DEFAULT_SORT,

      setField: (field: SortField) => set({ field }),
      setOrder: (order: SortOrder) => set({ order }),
      toDefault: () => set(DEFAULT_SORT)
    }),
    {
      name: "sort-settings",
      getStorage: () => localStorage, 
    }
  )
)