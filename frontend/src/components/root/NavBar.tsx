import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [searchBuffer, setSearchBuffer] = useState<string>("");
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Searching for:", searchBuffer);
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 border-b border-zinc-800 bg-[#09090b]/50 backdrop-blur-md sticky top-0 z-50">
      
      {/* Левая часть: Логотип */}
      <div className="flex items-center gap-3 min-w-50">
        <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
          <img src="/logo.png" className="h-5 w-5 brightness-0 invert opacity-80" alt="logo" />
        </div>
        <div className="text-zinc-100 text-lg font-semibold tracking-tight">
          HyperDrive
        </div>
      </div>

      {/* Центральная часть: Поиск */}
      <div className="flex-1 max-w-2xl px-4">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          className="relative group"
        >
          <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input
            type="text"
            value={searchBuffer}
            placeholder="Поиск файлов и папок..."
            className="w-full h-10 bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 
                     text-zinc-200 placeholder-zinc-500 outline-none
                     focus:border-zinc-600 focus:ring-0 transition-all"
            onChange={(e) => setSearchBuffer(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
            <kbd className="text-[10px] font-sans px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-500 bg-zinc-800">
              ⌘ K
            </kbd>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 min-w-50 justify-end">
        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
          <IoSettingsOutline className="h-5 w-5" />
        </button>
        
        <div className="h-6 w-px bg-zinc-800 mx-2" />

        <button 
          className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
          title="Выйти"
          onClick={async () => { await logout(); navigate('/login', { replace: true }); }}
        >
          <span className="text-sm font-medium">Выход</span>
          <IoExitOutline className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}