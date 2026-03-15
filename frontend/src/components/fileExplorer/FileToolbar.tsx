import type { SortField } from "@/types/sortSettings"
import type { FileToolbarProps } from "@/types/fileExplorer"
import { useSortSettingsStore } from "@/store/sortSettings"
import { useFilesStore } from "@/store/fileExplorer"
import { useSelectedFilesStore } from "@/store/selectedFileItems"
import { useContextMenuStore } from "@/store/contextMenu"

import { motion } from "framer-motion"
import { HiOutlinePlus } from "react-icons/hi"
import { IoStar, IoStarOutline, IoTrashOutline, IoPencilOutline } from "react-icons/io5"


export default function FileToolbar({ title }: FileToolbarProps) {
  const sortOptions: { id: SortField; label: string }[] = [
    { id: "name", label: "Имя" },
    { id: "date", label: "Дата изменения" },
    { id: "size", label: "Размер" }
  ]

  const { order, field, setField, setOrder } = useSortSettingsStore()
  const { tuneContextMenu, toggleContextMenu} = useContextMenuStore()
  const { path }= useFilesStore()
  const { selected } = useSelectedFilesStore()


  function openContextMenu (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault() 
    e.stopPropagation()

    const x = e.clientX
    const y = e.clientY

    tuneContextMenu(x, y, "empty", null)
    toggleContextMenu()
  }

  return (
    <div>
      <div className="text-gray-300 text-2xl flex gap-2">{title} {path.map(opt => (<div>› {opt}</div>))}</div>

      <div className="flex mt-4 font-semibold text-sm text-gray-300">

        {/* сортировка по полю */}
        <div className="flex gap-4">
          {sortOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setField(opt.id)}
              className="relative pb-1"
            >
              {opt.label}

              {field === opt.id && (
                <motion.div
                  layoutId="sort-field"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* направление сортировки */}
        <div className="flex gap-4 ml-6">
          <button
            onClick={() => setOrder("asc")}
            className="relative pb-1"
          >
            По возрастанию

            {order === "asc" && (
              <motion.div
                layoutId="sort-order"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setOrder("desc")}
            className="relative pb-1"
          >
            По убыванию

            {order === "desc" && (
              <motion.div
                layoutId="sort-order"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <button className="hover:text-white" onClick={(e) => openContextMenu(e)}>
            <HiOutlinePlus size={22} color="#d1d5dc" />
          </button>
          <button
            disabled={selected.length !== 1}  
            className="text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <IoPencilOutline size={20} color="#d1d5dc" />
          </button>
          <button 
            disabled={!selected.length}
            className="text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <IoStarOutline size={20} color="#d1d5dc" />
          </button>
          <button
            disabled={!selected.length}
            className="text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <IoTrashOutline size={20} />
          </button>
        </div>  
      </div>
    </div>
  )
}