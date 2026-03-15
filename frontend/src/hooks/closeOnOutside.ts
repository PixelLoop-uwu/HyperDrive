import { useEffect } from "react";


export function useCloseOnOutside(
  isOpen: boolean,
  refs: React.RefObject<HTMLElement>[],
  close: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    function onClick(e: MouseEvent) {
      const target = e.target as Node;

      const clickedInside = refs.some((ref) => {
        const el = ref.current;
        return el && el.contains(target);
      });

      if (!clickedInside) close();
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [isOpen, refs, close]);
}