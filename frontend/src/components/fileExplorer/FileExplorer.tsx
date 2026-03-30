import type { FileExplorerProps } from "@/types/fileExplorer"
import FileToolbar from "./FileToolbar"
import FileList from "./FileList"

import { useFilesStore } from "@/store/fileExplorer"
import { useSortSettingsStore } from "@/store/sortSettings"

import { useMemo } from "react"


export default function FileExplorer ({ title }: FileExplorerProps) {
  const fileItems = useFilesStore(state => state.fileItems)

  const sortOrder = useSortSettingsStore(state => state.order) 
  const sortField = useSortSettingsStore(state => state.field) 

  const sortedFiles = useMemo(() => {
    if (fileItems === undefined) return undefined

    return [...fileItems].sort((a, b) => {

      if (a.type === "folder" && b.type !== "folder") return -1
      if (a.type !== "folder" && b.type === "folder") return 1

      let result = 0

      if (sortField === "name")
        result = a.name.localeCompare(b.name)

      if (sortField === "date")
        result = a.modified - b.modified

      if (sortField === "size")
        result = a.size - b.size

      return sortOrder === "asc" ? result : -result
    })

  }, [fileItems, sortOrder, sortField])



  return (
    <div 
      className="flex-1 py-4 px-5 flex flex-col min-h-0">

      <FileToolbar
        title={title}
      />

      <FileList 
        sortedFiles={sortedFiles}
      />

    </div>
  )
}