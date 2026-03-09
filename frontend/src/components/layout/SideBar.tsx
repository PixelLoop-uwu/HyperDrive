import { IoHomeOutline, IoStarOutline, IoTrashOutline } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const used = 37; 
  return (
    <div className="h-full w-56 flex flex-col p-5 gap-3">

      <button className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
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
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
        onClick={() => navigate("/favorite")}  
      >
        <IoStarOutline className="h-5 w-5" color="#d1d5dc"/>
        <span>Избранное</span>
      </button>

      <button
        onClick={() => navigate("/trash")}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
      >
        <IoTrashOutline className="h-5 w-5" color="#d1d5dc"/>
        <span>Корзина</span>
      </button>
      
      <div className="mt-auto pt-6 mb-5">

        <div className="text-xs font-semibold text-gray-400 mb-2 text-left">
          Использовано 37 ГБ из 100 ГБ
        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-500 transition-all duration-300"
            style={{ width: `${used}%` }}
          />
          </div>
      </div>
    </div>
  )
} 


// type SideBarProps = {
//   diskSpaceInfo: object[]
// }