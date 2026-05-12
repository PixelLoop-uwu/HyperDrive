import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import { flexRender } from "@tanstack/react-table";

import type { HeaderGroup } from "@tanstack/react-table";
import type { FileItem } from "@/features/file-explorer/types/File";


type FileListHeaderProps = {
  headerGroups: HeaderGroup<FileItem>[];
};

export default function FileListHeader({ headerGroups }: FileListHeaderProps) {
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
            key={header.id}
            className="group py-3 px-4 text-xs font-semibold text-zinc-500 border-b border-zinc-800 cursor-pointer select-none hover:text-zinc-200 transition-colors"
            onClick={header.column.getToggleSortingHandler()}
            >
              <div className="flex items-center gap-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() && (
                  <span className="text-zinc-300">
                    {header.column.getIsSorted() === "asc" ? <HiChevronUp /> : <HiChevronDown />}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </>
  )
}