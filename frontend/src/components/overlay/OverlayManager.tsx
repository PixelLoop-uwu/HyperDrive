import { motion, AnimatePresence } from "framer-motion";
import { useOverlayStore } from "@/store/useOverlayStore"; 
import { cn } from "@/lib/utils";

export default function OverlayManager() {
  const { current, isOpen, close } = useOverlayStore();

  if (!current || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 backdrop-blur-[2px] bg-black/40 z-50 flex items-center justify-center p-4 text-zinc-100"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-90 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {current.type === "confirm" && (
            <div className="p-6">
              {/* Header: Icon + Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800",
                  current.opt.danger ? "text-red-400" : "text-zinc-400"
                )}>
                  <current.opt.icon size={20} />
                </div>
                <h3 className="text-lg font-medium tracking-tight">
                  {current.opt.label}
                </h3>
              </div>

              {/* Описание (если добавишь в тип в будущем) */}
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                {current.opt.label}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={close}
                  className="flex-1 px-4 py-2.5 text-sm font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
                >
                  {current.opt.cancelText || "Отмена"}
                </button>
                <button
                  onClick={() => {
                    // Здесь вызывается логика подтверждения
                    // current.opt.onConfirm(); 
                    close();
                  }}
                  className={cn(
                    "flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all",
                    current.opt.danger 
                      ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-200" // В монохроме danger выделяем инверсией
                      : "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
                  )}
                >
                  {current.opt.confirmText || "Подтвердить"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}