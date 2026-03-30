import { IoHomeOutline, IoStarOutline, IoTrashOutline } from "react-icons/io5";
import { RiShareForward2Line } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi";

import { useContextMenuStore } from "@/store/contextMenu";
import type { FileSideBarProps } from "@/types/fileExplorer";
import { useNavigate } from "react-router-dom";
import { formatSize } from "@/utils/sizeFormat";

export default function SideBar({ usedSpace, totalSpace }: FileSideBarProps) {
  const navigate = useNavigate();
  const { tuneContextMenu, toggleContextMenu } = useContextMenuStore()
  const used = usedSpace / totalSpace * 100


  function openContextMenu (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault() 
    e.stopPropagation()

    const x = 0
    const y = 110

    tuneContextMenu(x, y, "empty", null)
    toggleContextMenu()
  }

  
  return (
    <div className="h-full w-56 flex flex-col p-5 gap-3">

      <button onClick={(e) => openContextMenu(e)} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
        <HiOutlinePlus className="h-5 w-5" color="#d1d5dc"/>
        <span>Создать</span>
      </button>

      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors mt-4"
      >
        <IoHomeOutline className="h-5 w-5" color="#d1d5dc"/>
        <span>Главная</span>
      </button>

      <button
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors mt-2"
        onClick={() => navigate("/favorite")}  
      >
        <IoStarOutline className="h-5 w-5" color="#d1d5dc"/>
        <span>Избранное</span>
      </button>

      <button
        onClick={() => navigate("/trash")}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
      >
        <RiShareForward2Line className="h-5 w-5" color="#d1d5dc"/>
        <span>Общее</span>
      </button>

      <button
        onClick={() => navigate("/trash")}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
      >
        <IoTrashOutline className="h-5 w-5" color="#d1d5dc"/>
        <span>Корзина</span>
      </button>
      
      <div className="mt-auto pt-6 mb-5">

        <div className="text-xs font-semibold text-gray-400 mb-2 text-center ">
          Исп. {formatSize(usedSpace)} из {formatSize(totalSpace)}
        </div>

        <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-400 transition-all duration-300"
            style={{ width: `${used}%` }}
          />
          </div>
      </div>
    </div>
  )
} 