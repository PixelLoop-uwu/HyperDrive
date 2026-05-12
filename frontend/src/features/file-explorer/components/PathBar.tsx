import { motion } from "framer-motion";

import { modeRegistry } from "@/features/file-explorer/actions";
import useFileUIStore from "@/features/file-explorer/store/useFileUIStore";

import type { FileExplorerMode } from "@/features/file-explorer/actions";


type PathBarProps = {
  currentPath: string[];
  title: string;
  mode: FileExplorerMode;
};

export default function PathBar({ title, currentPath, mode }: PathBarProps) {
  const modeConfig = modeRegistry.getMode(mode);
  const { primaryButton, toolButtons } = modeConfig.pathBar;
  const { selectedIds } = useFileUIStore();

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="flex items-center justify-between px-4 pt-2 bg-[#09090b] border-zinc-800/50">
      <motion.nav 
        initial={{ opacity: 0, x: 4 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center overflow-x-auto no-scrollbar "
      >
        <button className="text-zinc-300 font-medium hover:text-zinc-100 transition-colors text-[27px] whitespace-nowrap">
          {title}
        </button>

        {currentPath.map((folder, index) => (
          <div key={index} className="flex items-center mt-1.5">
            <svg
              className="mx-2 text-zinc-600 shrink-0 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <button className="text-zinc-300 hover:text-white transition-colors text-sm font-medium whitespace-nowrap">
              {folder}
            </button>
          </div>
        ))}
      </motion.nav>

      <div className="flex items-center gap-1 ml-4">
        <div className="flex items-center bg-zinc-900/50 border border-zinc-800 rounded-lg p-0.5">
          {toolButtons.map((btn) => (
            <ToolbarButton
              key={btn.action}
              icon={btn.icon}
              title={btn.title}
              disabled={!hasSelection}
              variant={btn.variant}
              onClick={btn.onClick}
            />
          ))}
        </div>

        <div className="w-px h-4 bg-zinc-800 mx-1" />

        <button 
          onClick={primaryButton.onClick}
          className={`p-2 m-1 rounded-lg transition-all shadow-lg active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed
            ${
              primaryButton.variant === "danger"
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                : "bg-zinc-100 hover:bg-white text-zinc-950 shadow-white/5"
            }
          `}
        >
          <primaryButton.icon size={20} />
        </button>
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  title: string;
}

function ToolbarButton({
  icon: Icon,
  onClick,
  disabled,
  variant = "default",
  title,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed
        ${
          variant === "danger"
            ? "text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
            : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
        }
      `}
    >
      <Icon size={18} />
    </button>
  );
}