import { useEffect, useRef } from "react";
import { useContextMenuStore } from "@/features/file-explorer/store/useContextMenuStore";
import useFileUIStore from "@/features/file-explorer/store/useFileUIStore";
import { modeRegistry } from "@/features/file-explorer/actions";

import type { FileExplorerMode } from "@/features/file-explorer/actions";


interface MenuButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

function MenuButton({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  disabled = false,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${
          variant === "danger"
            ? "text-red-400 hover:bg-red-500/10"
            : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
        }
      `}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}



function Separator() {
  return <div className="my-1 border-t border-zinc-800" />
}



interface ContextMenuProps {
  mode: FileExplorerMode;
};

export default function ContextMenu({ mode }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const { isOpen, menu, toggleOpen } = useContextMenuStore();
  const { x, y, layout } = menu;
  const { selectedIds } = useFileUIStore();

  const modeConfig = modeRegistry.getMode(mode);
  const menuItems = modeConfig.contextMenu[layout];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleOpen]);

  if (!isOpen) return null;

  const style = {
    top: `${y}px`,
    left: `${x}px`,
  };

  return (
    <div
      ref={menuRef}
      style={style}
      className="fixed z-100 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 animate-in fade-in zoom-in-95 duration-100"
    >
      {layout === "multiple" && (
        <p className="px-3 py-1.5 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
          Выбрано объектов: {selectedIds.length}
        </p>
      )}

      {menuItems.map((item, index) => (
        <div key={item.action}>
          {item.hidden ? null : (
            <>
              <MenuButton
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                variant={item.variant}
                disabled={item.disabled}
              />
              
              {item.hasDivider && <Separator />}
            </>
          )}
        </div>
      ))}
    </div>
  );
}