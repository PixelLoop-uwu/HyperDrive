import { IoHomeOutline, IoTrashOutline } from "react-icons/io5";
import { RiShareForward2Line } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi";

import { useNavigate, useLocation } from "react-router-dom";
import { formatSize } from "@/lib/utils";
import CreateMenu from "../../features/file-explorer/components/CreateMenu";
import { useState } from "react";
import { motion } from "framer-motion";


type SideBarProps = {
  usedSpace: number;
  totalSpace: number;
}

const NavItem = ({ icon: Icon, label, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
      ${active 
        ? "bg-zinc-800 text-white shadow-sm" 
        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
      }`}
  >
    <Icon className={`h-5 w-5 ${active ? "text-gray-200" : "text-zinc-500 group-hover:text-zinc-300"}`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function SideBar({ usedSpace, totalSpace }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const usedPercent = usedSpace === 0 ? 0 : (usedSpace / totalSpace) * 100;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-60 flex flex-col bg-[#09090b] border-r border-zinc-800 p-4">
      <div className="relative mb-8">
        <button 
          id="create-button-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl transition-all duration-300 shadow-lg
            ${isMenuOpen 
              ? "bg-zinc-800 text-zinc-100 shadow-none" 
              : "bg-zinc-100 hover:bg-white text-zinc-950 shadow-white/5"
            }`}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlinePlus className="h-5 w-5" />
          </motion.div>
          <span className="font-semibold text-sm">Создать</span>
        </button>

        <CreateMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <NavItem 
          icon={IoHomeOutline} 
          label="Главная" 
          onClick={() => navigate("/")} 
          active={location.pathname === "/"} 
        />
        <NavItem 
          icon={RiShareForward2Line} 
          label="Общее" 
          onClick={() => navigate("/shared")} 
          active={location.pathname === "/shared"} 
        />
        <NavItem 
          icon={IoTrashOutline} 
          label="Корзина" 
          onClick={() => navigate("/trash")} 
          active={location.pathname === "/trash"} 
        />
      </nav>


      <div className="mt-auto bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">Хранилище</span>
          <span className="text-xs text-zinc-300 font-medium">
            {Math.round(usedPercent)}%
          </span>
        </div>
        
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usedPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className={`h-full rounded-full ${
              usedPercent > 90 ? "bg-rose-600" : "bg-zinc-300"
            }`}
          />
        </div>
        
        <p className="text-[10px] text-zinc-500 mt-3 leading-tight">
          Использовано {formatSize(usedSpace)} из {formatSize(totalSpace)}
        </p>
      </div>
    </div>
  );
}