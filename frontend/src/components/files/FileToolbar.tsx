import type { SortField, SortOrder } from "@/types/sort"
import type { FileToolbarProps } from "@/types/fileExplorer"

import { motion } from "framer-motion"
import { HiOutlinePlus } from "react-icons/hi"
import { IoStar, IoStarOutline, IoTrashOutline, IoPencilOutline } from "react-icons/io5"




export default function FileToolbar({ title, path, sort, setSort, selectedFileIds }: FileToolbarProps) {
  const sortOptions: { id: SortField; label: string }[] = [
    { id: "name", label: "Имя" },
    { id: "date", label: "Дата изменения" },
    { id: "size", label: "Размер" }
  ]

  function changeSort(field: SortField) {
    setSort(prev => ({
      ...prev,
      field
  }))}

  function changeOrder(order: SortOrder) {
    setSort(prev => ({
      ...prev,
      order
  }))}

  return (
    <div>
      <div className="text-gray-300 text-2xl flex gap-2">{title} {path.map(opt => (<div>› {opt}</div>))}</div>

      <div className="flex mt-4 font-semibold text-sm text-gray-300">

        {/* сортировка по полю */}
        <div className="flex gap-4">
          {sortOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => changeSort(opt.id)}
              className="relative pb-1"
            >
              {opt.label}

              {sort.field === opt.id && (
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
            onClick={() => changeOrder("asc")}
            className="relative pb-1"
          >
            По возрастанию

            {sort.order === "asc" && (
              <motion.div
                layoutId="sort-order"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => changeOrder("desc")}
            className="relative pb-1"
          >
            По убыванию

            {sort.order === "desc" && (
              <motion.div
                layoutId="sort-order"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <button className="hover:text-white" >
            <HiOutlinePlus size={22} color="#d1d5dc" />
          </button>
          <button disabled={selectedFileIds.some(el => el === "")}  className="disabled:opacity-50">
            <IoPencilOutline size={20} color="#d1d5dc" />
          </button>
          <button disabled={selectedFileIds.some(el => el === "")}  className="disabled:opacity-50">
            <IoStarOutline size={20} color="#d1d5dc" />
          </button>
          <button disabled={selectedFileIds.some(el => el === "")}  className="disabled:opacity-50">
            <IoTrashOutline size={20} color="#d1d5dc" />
          </button>
        </div>
      </div>
    </div>
  )
}