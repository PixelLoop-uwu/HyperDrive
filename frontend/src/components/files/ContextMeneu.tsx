import type { ContextMenuProps, MenuAction } from "@/types/contextMenu"
import { useRef, useLayoutEffect, useState } from "react"
import {
  IoFolderOutline,
  IoCloudUploadOutline,
  IoPencilOutline,
  IoArchiveOutline,
  IoTrashOutline,
  IoOpenOutline,
  IoDownloadOutline,
  IoShareOutline
} from "react-icons/io5"

export const ContextMenu = ({ x, y, file, path, onClose }: ContextMenuProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    let newLeft = x
    let newTop = y

    if (x + rect.width > window.innerWidth) {
      newLeft = x - rect.width
    }

    if (y + rect.height > window.innerHeight) {
      newTop = y - rect.height
    }

    newLeft = Math.max(0, newLeft)
    newTop = Math.max(0, newTop)

    setPos({
      left: newLeft,
      top: newTop
    })
  }, [x, y, file])

  let actions: MenuAction[] = []

  if (!file) {
    actions = [
      {
        label: "Создать папку",
        icon: <IoFolderOutline size={16} />,
        onClick: () => {},
        gap: true
      },
      {
        label: "Загрузить файл",
        icon: <IoCloudUploadOutline size={16} />,
        onClick: () => {}
      },
      {
        label: "Загрузить папку",
        icon: <IoCloudUploadOutline size={16} />,
        onClick: () => {}
      }
    ]
  } else if (file.type === "folder") {
    actions = [
      {
        label: "Переименовать",
        icon: <IoPencilOutline size={16} />,
        onClick: () => {},
      },
      {
        label: "В архив",
        icon: <IoArchiveOutline size={16} />,
        onClick: () => {},
        gap: true
      },
      {
        label: "В корзину",
        icon: <IoTrashOutline size={16} />,
        onClick: () => {}
      }
    ]
  } else if (file.type === "file") {
    actions = [
      {
        label: "Открыть",
        icon: <IoOpenOutline size={16} />,
        onClick: () => {},
        gap: true
      },
      {
        label: "Переименовать",
        icon: <IoPencilOutline size={16} />,
        onClick: () => {}
      },
      {
        label: "Скачать",
        icon: <IoDownloadOutline size={16} />,
        onClick: () => {}
      },
      {
        label: "Поделиться",
        icon: <IoShareOutline size={16} />,
        onClick: () => {},
        gap: true
      },
      {
        label: "В корзину",
        icon: <IoTrashOutline size={16} />,
        onClick: () => {}
      }
    ]
  }

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="fixed z-50 bg-gray-950 text-gray-300 text-md flex flex-col gap-1 py-3 px-3 rounded-"
      style={{
        top: pos.top,
        left: pos.left
      }}
    >
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => {
            action.onClick()
            onClose()
          }}
          className={`flex items-center gap-2 border-gray-500 text-left hover:text-white transition-colors duration-200 pb-1 
                      ${action.gap ? "pb-1.5 border-b" : ""}
                    `}
        >
          {action.icon} 
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  )
}