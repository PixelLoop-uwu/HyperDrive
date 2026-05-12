import { HiOutlineTrash, HiOutlineInformationCircle } from "react-icons/hi";
import { TbRestore } from "react-icons/tb";

import type { ContextMenuConfig } from "../types";

export const trashContextMenuConfig: ContextMenuConfig = {
  empty: [
    {
      action: "folder-props",
      icon: HiOutlineInformationCircle,
      label: "Свойства",
    },
    {
      action: "permanently-delete",
      icon: HiOutlineTrash,
      label: "Удалить все",
      variant: "danger",
    },
  ],

  file: [
    {
      action: "restore",
      icon: TbRestore,
      label: "Восстановить",
      hasDivider: true,
    },
    {
      action: "permanently-delete",
      icon: HiOutlineTrash,
      label: "Удалить безвозвратно",
      variant: "danger",
    },
  ],

  folder: [
    {
      action: "restore",
      icon: TbRestore,
      label: "Восстановить",
      hasDivider: true,
    },
    {
      action: "permanently-delete",
      icon: HiOutlineTrash,
      label: "Удалить безвозвратно",
      variant: "danger",
    },
  ],

  multiple: [
    {
      action: "restore",
      icon: TbRestore,
      label: "Восстановить",
      hasDivider: true,
    },
    {
      action: "permanently-delete",
      icon: HiOutlineTrash,
      label: "Удалить безвозвратно",
      variant: "danger",
    },
  ],
};
