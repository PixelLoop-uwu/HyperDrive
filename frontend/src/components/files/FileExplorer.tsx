import type { FileExplorerProps } from "@/types/fileExplorer"
import type { Sort } from "@/types/sort"

import FileToolbar from "./FileToolbar"
import FileList from "./FileList"

import { useState, useMemo } from "react"

export default function FileExplorer ({ title, path, files }: FileExplorerProps) {

  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([""])

  const [sort, setSort] = useState<Sort>({
    field: "name",
    order: "asc"
  })


  const sortedFiles = useMemo(() => {
    if (files === undefined) return undefined

    return [...files].sort((a, b) => {

      if (a.type === "folder" && b.type !== "folder") return -1
      if (a.type !== "folder" && b.type === "folder") return 1

      let result = 0

      if (sort.field === "name")
        result = a.name.localeCompare(b.name)

      if (sort.field === "date")
        result = a.modified - b.modified

      if (sort.field === "size")
        result = a.size - b.size

      return sort.order === "asc" ? result : -result
    })

  }, [files, sort])

  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedFileIds([""])
    }
  }


  return (
    <div 
      onClick={(e) => handleClick(e)} className="flex-1 py-4 px-5 flex flex-col min-h-0">

      <FileToolbar
        title={title}
        sort={sort}
        path={path}
        setSort={setSort}
        selectedFileIds={selectedFileIds}
      />

      <FileList 
        files={sortedFiles}
        path={path}
        selectedFileIds={selectedFileIds}
        setSelectedFileIds={setSelectedFileIds}
      />

    </div>
  )
}