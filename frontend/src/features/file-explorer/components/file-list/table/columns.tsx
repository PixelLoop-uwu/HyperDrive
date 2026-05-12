import dayjs from "dayjs";

import { getFileIcon, formatSize, folderFirstSort } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";

import type { FileItem } from "@/features/file-explorer/types/File";


export default function createColumns() {
  const columnHelper = createColumnHelper<FileItem>();

  return [
  columnHelper.accessor("name", {
    header: "Название",
    sortingFn: folderFirstSort,
    cell: (info) => (
      <div className="flex items-center gap-2 min-w-0">
        <span>{getFileIcon(info.row.original)}</span>
        <span className="truncate">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("size", {
    header: "Размер",
    sortingFn: folderFirstSort,
    cell: (info) => (info.row.original.type === "file" ? formatSize(info.getValue() || 0) : "-"),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Изменён",
    sortingFn: folderFirstSort,
    cell: (info) => dayjs(info.getValue()).format("DD.MM.YYYY HH:mm"),
  }),
];
}
