import type { ContextMenuLayout } from '@/features/file-explorer/types/ContextMenu';
import { create } from 'zustand';


type MenuState = {
  x: number;
  y: number;
  layout: ContextMenuLayout
};

type ContextMenuStoreProps = {
  isOpen: boolean;
  menu: MenuState;
  toggleOpen: (open?: boolean) => void;
  setMenu: (menu: Partial<MenuState>) => void;
};

export const useContextMenuStore = create<ContextMenuStoreProps>((set) => ({
  isOpen: false,
  menu: {
    x: 0,
    y: 0,
    layout: 'empty'
  },

  setMenu: (newMenu) => set((state) => ({
    menu: { ...state.menu, ...newMenu }
  })),

  toggleOpen: (open) => set((state) => ({
    isOpen: open !== undefined ? open : !state.isOpen
  }))
}));

export default useContextMenuStore;