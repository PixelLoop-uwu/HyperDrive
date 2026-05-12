import React, { useCallback, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel} from "@tanstack/react-table";

import useFileUIStore from "@/features/file-explorer/store/useFileUIStore";

import createColumns from "./table/columns";
import FileListHeader from "./table/FileListHeader";
import FileListRow from "./table/FileListRow";
import EmptyFolder from "./EmptyFolder";
import SkeletonLoader from "./SkeletonLoader";
import FileListError from "./FileListError";

import type { SortingState } from "@tanstack/react-table";
import type { FileItem } from "@/features/file-explorer/types/File";
import type { ContextMenuLayout} from '@/features/file-explorer/types/ContextMenu';


type FileListProps = {
  fileList: FileItem[] | undefined;
  error?: unknown;
  onRetry?: () => void;
  handleContextMenu: (e: React.MouseEvent, type?: ContextMenuLayout, rowId?: string) => void;
};

export default function FileList({ fileList, error, onRetry, handleContextMenu }: FileListProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }]);
  const toggleSelection = useFileUIStore((state) => state.toggleSelection);
  const clearSelection = useFileUIStore((state) => state.clearSelection);
  const setSelection = useFileUIStore((state) => state.setSelection);

  const columns = useMemo(() => createColumns(), []);

  const table = useReactTable({
    enableSortingRemoval: false,
    data: fileList ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  });

  const rows = table.getRowModel().rows;

  const handleRowClick = useCallback((e: React.MouseEvent, rowId: string) => {
    e.stopPropagation();
    if (e.ctrlKey) {
      toggleSelection(rowId);
    } else {
      setSelection(rowId);
    }
  }, [setSelection, toggleSelection]);

  const openContextMenu = useCallback((e: React.MouseEvent, type?: ContextMenuLayout, rowId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (rowId) {
      const { selectedIds, selectedIdSet } = useFileUIStore.getState();
      const isMultiple = selectedIds.length > 1 && selectedIdSet.has(rowId);
      if (isMultiple) {
        handleContextMenu(e, "multiple");
      } else {
        handleRowClick(e, rowId);
        handleContextMenu(e, type);
      }
    } else {
      handleContextMenu(e, "empty");
    }
  }, [handleContextMenu, handleRowClick]);

  return (
    <div 
      className="flex-1 flex flex-col min-h-0 bg-[#09090b]" 
      onClick={() => clearSelection()}
      onContextMenu={(e) => openContextMenu(e)}
    >
      <div className="flex-1 overflow-y-auto hide-scrollbar relative">
        {error ? (
          <FileListError error={error} onRetry={onRetry} />
        ) : fileList === undefined ? (
          <SkeletonLoader />
        ) : (
          <table 
            className="w-full text-left border-separate border-spacing-0" 
            onClick={(e) => e.stopPropagation()} 
            onContextMenu={(e) => e.stopPropagation()}
          >
            <thead className="sticky top-0 z-20 bg-[#09090b]/80 backdrop-blur-md">
              <FileListHeader headerGroups={table.getHeaderGroups()} />
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => {
                  return (
                    <FileListRow
                      key={row.id}
                      row={row}
                      prevRowId={rows[index - 1]?.id}
                      nextRowId={rows[index + 1]?.id}
                      onRowClick={handleRowClick}
                      onContextMenu={openContextMenu}
                    />
                  );
                })
              ) : (
                <EmptyFolder colSpan={columns.length} />
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}