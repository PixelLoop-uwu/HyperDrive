import { useEffect, useRef, useState } from "react";
import { useContextMenuStore } from "@/store/contextMenu";
import { useCloseOnOutside } from "@/hooks/closeOnOutside";
import type { ActionButton } from "@/types/contextMenu";
import { 
  IoFolder,
  IoFolderOpen,
  IoCreate,
  IoTrash,
  IoShare,
  IoCloudUpload,
  IoArchive,
  IoDocument
} from "react-icons/io5";

export default function ContextMenu() {
  const { x, y, type, selectedFileItems, isOpen } = useContextMenuStore();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  

  function close() {
    useContextMenuStore.setState({ isOpen: false });
  }

  const actionsMap: Record<string, ActionButton[]> = {
    empty: [
      { 
        key: "newFolder", 
        label: "Создать папку", 
        icon: IoFolder,
        handler: () => {} 
      },
      { 
        key: "upload", 
        label: "Загрузить файлы", 
        icon: IoCloudUpload,
        handler: () => {} 
      }
    ],
    folder: [
      { 
        key: "open", 
        label: "Перейти в", 
        icon: IoFolderOpen,
        handler: () => {}, 
        forSingle: true,
        gap: true 
      },
      { 
        key: "rename", 
        label: "Переименовать", 
        icon: IoCreate,
        handler: () => {}, 
        forSingle: true
      },
      { 
        key: "delete", 
        label: "В корзину", 
        icon: IoTrash,
        handler: () => {} 
      },
      { 
        key: "arch", 
        label: "Архивировать", 
        icon: IoArchive,
        handler: () => {}
      },
    ],
    file: [
      { 
        key: "open", 
        label: "Открыть", 
        icon: IoDocument,
        handler: () => {}, 
        forSingle: true 
      },
      { 
        key: "rename", 
        label: "Переименовать", 
        icon: IoCreate,
        handler: () => {}, 
        forSingle: true 
      },
      { 
        key: "delete", 
        label: "В корзину", 
        icon: IoTrash,
        handler: () => {}, 
        gap: true 
      },
      { 
        key: "share", 
        label: "Поделиться", 
        icon: IoShare,
        handler: () => {}, 
        forSingle: true, 
      },
    ]
  };

  useEffect(() => {
    if (!isOpen) return setPos(null);
    const el = menuRef.current;
    if (!el) return;

    const margin = 8;
    const rect = el.getBoundingClientRect();
    const menuW = rect.width || 220;
    const menuH = rect.height || 240;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x;
    let top = y;

    if (x + menuW + margin > vw) left = Math.max(margin, x - menuW);
    else left = Math.max(margin, x);

    if (y + menuH + margin > vh) top = Math.max(margin, vh - menuH - margin);
    else top = Math.max(margin, y);

    setPos({ left, top });
  }, [x, y, isOpen, selectedFileItems]);

  useCloseOnOutside(isOpen, menuRef, close);

  if (!isOpen) return null;

  const fileCount = selectedFileItems?.length ?? 0;
  const actions = actionsMap[type ?? ""] ?? [];

  return (
    <div 
      ref={menuRef} 
      style={{ left: pos?.left ?? x, top: pos?.top ?? y }} 
      className="fixed z-50 max-w-[320px] overflow-hidden"
      role="menu"
    >
      <div className="flex flex-col py-1 text-gray-300 bg-black rounded-md shadow-lg">
        {actions.map((act) => {
          const disabled = act.forSingle && fileCount !== 1;
          const gap = act.gap === true;
          const Icon = act.icon;
          
          return (
            <button
              key={act.key}
              className={`
                flex items-center gap-3 px-2 mx-2 py-1 text-[15px] 
                hover:text-gray-100 focus:outline-none transition-colors duration-200
                ${disabled ? "opacity-50 cursor-not-allowed hover:bg-transparent" : ""}
                ${gap ? "border-b border-gray-400 pb-2" : ""}
              `}
              onClick={() => act.handler(selectedFileItems ?? null)}
              disabled={disabled}
            >
              {Icon && <Icon className="text-lg" />}
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}