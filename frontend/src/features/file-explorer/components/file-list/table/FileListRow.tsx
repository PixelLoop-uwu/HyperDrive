import React, { memo } from "react";

import { motion } from "framer-motion";
import { flexRender } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import useFileUIStore from "@/features/file-explorer/store/useFileUIStore";

import type { Row } from "@tanstack/react-table";
import type { FileItem } from "@/features/file-explorer/types/File";
import type { ContextMenuLayout } from "@/features/file-explorer/types/ContextMenu";


type FileListRowProps = {
  row: Row<FileItem>;
  prevRowId?: string;
  nextRowId?: string;
  onRowClick: (e: React.MouseEvent, rowId: string) => void;
  onContextMenu: (e: React.MouseEvent, type?: ContextMenuLayout, rowId?: string) => void;
}; 

function FileListRow({
  row,
  prevRowId,
  nextRowId,
  onRowClick,
  onContextMenu,
}: FileListRowProps) {
  const isSelected = useFileUIStore((state) => state.selectedIdSet.has(row.id));
  const prevSelected = useFileUIStore((state) => Boolean(prevRowId && state.selectedIdSet.has(prevRowId)));
  const nextSelected = useFileUIStore((state) => Boolean(nextRowId && state.selectedIdSet.has(nextRowId)));
  const cells = row.getVisibleCells();

  return (
    <motion.tr
      drag={false}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) => onRowClick(e, row.id)}
      onContextMenu={(e) => onContextMenu(e, row.original.type, row.original.id)}
      className="group cursor-pointer select-none outline-none"
    >
      {cells.map((cell, cellIdx) => {
        const isFirstCell = cellIdx === 0;
        const isLastCell = cellIdx === cells.length - 1;

        return (
          <td
            key={cell.id}
            className={cn(
              "py-3 px-4 text-sm transition-all duration-150 text-zinc-300 border-b",
              
              {
                "border-b-transparent": nextSelected && isSelected,
                "border-zinc-900/50": !(nextSelected && isSelected),
                "bg-zinc-800/70": isSelected,
              },

              isSelected && isFirstCell && !prevSelected && "rounded-tl-xl",
              isSelected && isFirstCell && !nextSelected && "rounded-bl-xl",
              isSelected && isLastCell && !prevSelected && "rounded-tr-xl",
              isSelected && isLastCell && !nextSelected && "rounded-br-xl"
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </motion.tr>
  );
}

export default memo(FileListRow);