import { create } from 'zustand'


type FileUIStore = {
  currentPath: string[];
  selectedIds: string[];
  selectedIdSet: Set<string>;

  setCurrentPath: (newPath: string[]) => void;
  toggleSelection: (fileId: string) => void;
  setSelection: (fileId: string) => void;
  clearSelection: () => void;
}

const getSelectionState = (selectedIds: string[]) => ({
  selectedIds,
  selectedIdSet: new Set(selectedIds),
});

const useFileUIStore = create<FileUIStore>((set, get) => ({
  currentPath: [''],
  ...getSelectionState([]),

  toggleSelection: (fileId) => 
    set((state) => {
      const isSelected = state.selectedIdSet.has(fileId);
      const selectedIds = isSelected
        ? state.selectedIds.filter((id) => id !== fileId)
        : [...state.selectedIds, fileId];
      
      return getSelectionState(selectedIds);
    }),

  clearSelection: () => {
    if (get().selectedIds.length === 0) return;
    set(getSelectionState([]));
  },
  setCurrentPath: (newPath) => set({ currentPath: newPath, ...getSelectionState([]) }),
  setSelection: (fileId) => {
    const { selectedIds } = get();
    if (selectedIds.length === 1 && selectedIds[0] === fileId) return;
    set(getSelectionState([fileId]));
  },
}));


export default useFileUIStore;
