import type { FileListProps, FileItem } from "@/types/fileExplorer"
import type { ContextMenuState } from "@/types/contextMenu"
import { getFileIcon } from "@/utils/fileIcon"
import { formatSize } from "@/utils/sizeFormat"
import { ContextMenu } from "./ContextMeneu"

import { IoStar, IoStarOutline } from "react-icons/io5"
import { useState, useEffect } from "react"
import dayjs from "dayjs"

export default function FileList({ files, path, selectedFileIds, setSelectedFileIds }: FileListProps) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    file: null
  })


  useEffect(() => {
    const close = () =>
      setContextMenu(prev => ({ ...prev, visible: false }))

    window.addEventListener("click", close)

    return () => window.removeEventListener("click", close)
  }, [])
  

  const handleContextMenu = (
    event: React.MouseEvent,
    file: FileItem | null
  ) => {
    event.preventDefault()
    file && setSelectedFileIds([file.id])

    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      file: file
  })}


  function selectHandler (event: React.MouseEvent<HTMLDivElement>, file: FileItem) {
    if (event.shiftKey) {
      setSelectedFileIds(prev => [...prev, file.id])
      
    } else {
      setSelectedFileIds([file.id])
  }}


  function fileTemplate(file: FileItem) {
    return (
      <tr
        key={file.id} 
        className={`border-b-2 transition-colors duration-200 h-fit
                  ${selectedFileIds.includes(file.id) ? " border-gray-300" : "hover:border-gray-500 border-transparent"}`}
        onClick={(e) => selectHandler(e, file)}
        onContextMenu={(e) => handleContextMenu(e, file)}
      >
        <td className="flex items-center gap-2 py-2 min-w-0">
          {getFileIcon(file)} <span className="truncate">{file.name}</span>
        </td>
        <td className="p-2">{file.type === 'file' ? formatSize(file.size) : '-'}</td>
        <td className="p-2">{dayjs(file.modified).format('DD.MM.YYYY HH:mm')}</td>
        <td className="p-2">{dayjs(file.created).format('DD.MM.YYYY HH:mm')}</td>
        <td className="items-center">
          <button>
            {file.stared ? <IoStar size={20} color="#d1d5dc" /> : <IoStarOutline size={20} color="#d1d5dc" />}
          </button>
        </td>
      </tr>
  )}


  return (
    <div className="flex-1 overflow-hidden min-h-0">
      {files === undefined ? (
        <div className="flex-1 overflow-y-visible overflow-x-hidden h-full hide-scrollbar" aria-busy>
          <table className="w-full text-left text-gray-300 font-normal mt-1 border-collapse table-fixed select-none animate-pulse">
            <thead>
              <tr className="text-xs">
                <th className="font-medium w-1/2 py-2">Название</th>
                <th className="font-medium py-2">Размер</th>
                <th className="font-medium py-2">Изменён</th>
                <th className="font-medium py-2">Создан</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="border-b-2 border-transparent">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-gray-700" />
                      <div className="h-4 bg-gray-700 rounded w-1/2" />
                    </div>
                  </td>
                  <td className="p-2"><div className="h-4 bg-gray-700 rounded w-14" /></td>
                  <td className="p-2"><div className="h-4 bg-gray-700 rounded w-28" /></td>
                  <td className="p-2"><div className="h-4 bg-gray-700 rounded w-28" /></td>
                  <td className="p-2"><div className="h-4 bg-gray-700 rounded w-5" /></td>
                </tr>
              ))}
              <tr className="h-20"></tr>
            </tbody>
          </table>
        </div>
      ) : files.length === 0 ? (
        <div className="text-gray-300">Папка пуста</div>
      ) : (
        <div className="flex-1 overflow-y-visible overflow-x-hidden h-full hide-scrollbar">
          <table className="w-full text-left text-gray-300 font-normal mt-1 border-collapse table-fixed select-none">
            <thead>
              <tr className="text-xs">
                <th className="font-medium w-1/2 py-2">Название</th>
                <th className="font-medium py-2">Размер</th>
                <th className="font-medium py-2">Изменён</th>
                <th className="font-medium py-2">Создан</th>
                <th className="w-8"></th>
              </tr>
            </thead>  
            <tbody>
              {files.map(file => fileTemplate(file))}
              <tr className="h-20"></tr>
            </tbody>
          </table>
        </div>
      )}

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          file={contextMenu.file}
          path={path}
          onClose={() =>
            setContextMenu(prev => ({ ...prev, visible: false }))
          }
        />
      )}
    </div>
)}