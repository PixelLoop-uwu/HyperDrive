import { create } from "zustand";

import type { Overlay } from "@/types/overlay";


interface OverlayStore {
  current: Overlay | null;
  isOpen: boolean;
  open: (config: Overlay) => void;
  close: () => void;
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  current: null,
  isOpen: false,
  open: (config) => set({ current: config, isOpen: true }),
  close: () => set({ current: null, isOpen: false }),
}));