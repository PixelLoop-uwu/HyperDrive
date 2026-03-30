import type { FileListProps, FileItem } from "@/types/fileExplorer"
import { useSelectedFilesStore } from "@/store/selectedFileItems"
import { useContextMenuStore } from "@/store/contextMenu"
import { useFilesStore } from "@/store/fileExplorer"

import { getFileIcon } from "@/utils/fileIcon"
import { formatSize } from "@/utils/sizeFormat"

import { IoStar, IoStarOutline } from "react-icons/io5"
import { motion } from "framer-motion";
import dayjs from "dayjs"

export default function FileList({ sortedFiles }: FileListProps) {
  const { selected, addSelectedItems, setSelectedItems } = useSelectedFilesStore()
  const { tuneContextMenu, toggleContextMenu} = useContextMenuStore()
  const { starToggle } = useFilesStore()


  function selectHandler (event: React.MouseEvent<HTMLDivElement>, fileItem: FileItem) {
    if (sortedFiles === undefined) return 

    if (event.ctrlKey || event.metaKey) {
      addSelectedItems([fileItem])

    } else {
      setSelectedItems([fileItem])
    }
  }

  function starHandler (file: FileItem) {
    setSelectedItems([file])
    starToggle(file.id)
  }


  function openContextMenu (e: React.MouseEvent<HTMLDivElement>, type: "file" | "folder" | "empty", fileItem?: FileItem) {
    e.preventDefault() 
    e.stopPropagation()

    const x = e.clientX
    const y = e.clientY

    if (fileItem && !selected.includes(fileItem)) {
      setSelectedItems([fileItem])
    }
    
    const contextData = type === "empty" ? null : selected;
    
    tuneContextMenu(x, y, type, contextData);
    toggleContextMenu();
  }


  function fileTemplate(file: FileItem) {
    return (
      <tr
        key={file.id}
        className={`border-b-2 transition-colors duration-200 h-fit
                  ${selected.some(f => f.id === file.id) ? " border-gray-300" : "hover:border-gray-500 border-transparent"}`}
        onClick={(e) => {e.stopPropagation(); selectHandler(e, file)}}
        onContextMenu={(e) => openContextMenu(e, file.type, file)}
      >
        <td className="flex items-center gap-2 py-2 min-w-0">
          {getFileIcon(file)} <span className="truncate">{file.name}</span>
        </td>
        <td className="p-2">{file.type === 'file' ? formatSize(file.size) : '-'}</td>
        <td className="p-2">{dayjs(file.modified).format('DD.MM.YYYY HH:mm')}</td>
        <td className="p-2">{dayjs(file.created).format('DD.MM.YYYY HH:mm')}</td>
        <td className="items-center">
        <motion.button
          onClick={(e) => { e.stopPropagation(); starHandler(file) }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            key={file.starred ? "filled" : "outline"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {file.starred ? <IoStar size={20} /> : <IoStarOutline size={20} />}
          </motion.span>
        </motion.button>
        </td>
      </tr>
  )}


  return (
    <div className="flex-1 overflow-hidden min-h-0">
      {sortedFiles === undefined ? (
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
      ) : sortedFiles.length === 0 ? (
        <div className="text-gray-300">Папка пуста</div>
      ) : (
        <div className="flex-1 overflow-y-visible overflow-x-hidden h-full hide-scrollbar" onClick={() => setSelectedItems([])}>
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
              {sortedFiles.map(file => fileTemplate(file))}
              <tr className="h-20"></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
)}