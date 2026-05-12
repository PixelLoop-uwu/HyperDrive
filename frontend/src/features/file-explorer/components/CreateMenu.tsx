import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineFolder, HiOutlineDocumentAdd, HiOutlineCloudUpload } from "react-icons/hi";


interface CreateMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMenu({ isOpen, onClose }: CreateMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;

      if (!(target instanceof Element)) return;

      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }

      if (target.closest("#create-button-toggle")) {
        return;
      }

      onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 origin-top"
        >
          <CreateMenuItem 
            icon={HiOutlineFolder} 
            label="Новая папка" 
            onClick={() => { console.log("New Folder"); onClose(); }} 
          />
          <CreateMenuItem 
            icon={HiOutlineCloudUpload} 
            label="Загрузить файлы" 
            onClick={() => { console.log("Upload"); onClose(); }} 
          />
          <div className="my-1 border-t border-zinc-800" />
          <CreateMenuItem 
            icon={HiOutlineDocumentAdd} 
            label="Документ" 
            onClick={() => { console.log("Doc"); onClose(); }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CreateMenuItem({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}