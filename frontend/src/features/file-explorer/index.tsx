import { useCallback } from "react";

import ContextMenu from "./components/ContextMenu";
import { useContextMenuStore } from "./store/useContextMenuStore";
import PathBar from "./components/PathBar";
import FileList from "./components/file-list";

import type { FileItem } from "@/features/file-explorer/types/File";
import type { FileExplorerMode } from "./actions";

type FileExplorerProps = {
  title: string;
  fileList: FileItem[] | undefined;
  currentPath: string[];
  mode: FileExplorerMode;
  error?: unknown;
  onRetry?: () => void;
};

export function FileExplorer({
  title,
  fileList,
  currentPath,
  mode,
  error,
  onRetry,
}: FileExplorerProps) {
  const { isOpen, setMenu, toggleOpen } = useContextMenuStore();

  const handleContextMenu = useCallback((
    e: React.MouseEvent,
    layout: "empty" | "file" | "folder" | "multiple"
  ) => {
    e.preventDefault();

    setMenu({
      x: e.clientX,
      y: e.clientY,
      layout: layout,
    });

    toggleOpen(true);
  }, [setMenu, toggleOpen]);

  return (
    <div className="flex flex-col flex-1 mt-1">
      <PathBar title={title} currentPath={currentPath} mode={mode} />
      <FileList
        fileList={fileList}
        error={error}
        onRetry={onRetry}
        handleContextMenu={handleContextMenu}
      />

      {isOpen && <ContextMenu mode={mode} />}
    </div>
  );
}
