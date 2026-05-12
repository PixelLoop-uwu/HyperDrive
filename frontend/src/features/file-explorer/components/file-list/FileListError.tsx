import { useMemo } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

import { toAppError } from "@/lib/errors";


type FileListErrorProps = {
  error: unknown;
  onRetry?: () => void;
};

export default function FileListError({ error, onRetry }: FileListErrorProps) {
  const appError = useMemo(
    () =>
      toAppError(error, {
        title: "Не удалось загрузить файлы",
        message: "Попробуйте обновить список или повторить позже.",
      }),
    [error]
  );

  return (
    <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300">
        <HiOutlineExclamationTriangle size={24} />
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-sm font-semibold text-zinc-100">{appError.title}</h3>
        <p className="text-sm text-zinc-500">{appError.message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
