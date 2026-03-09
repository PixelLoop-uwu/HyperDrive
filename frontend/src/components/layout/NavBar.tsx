import { GoSearch } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";

export default function NavBar() {
  return (
    <div className="w-full flex items-center justify-between px-4 py-2">

      <div className="flex flex-1 items-center gap-2">
        <img src="/logo.png" className="h-10 w-10" />
        <div className="text-gray-300 text-xl font-medium">
          HyperDrive
        </div>
      </div>

      <div className="flex items-center border-b-2 border-gray-500 px-2 gap-2 w-105
                      transition-colors duration-200 hover:border-gray-300 focus-within:border-gray-300 ">
        <GoSearch className="h-4 w-4 text-gray-400" />

        <input
          type="text"
          placeholder="Поиск на диске..."
          className="flex-1 h-8 bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <button className="flex flex-1 justify-end items-center w-auto h-9 text-gray-300 hover:text-white transition-colors">
        <IoExitOutline className="ml-1.5 h-6 w-6"/>
      </button>
    </div>
  )
}