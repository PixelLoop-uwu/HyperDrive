import {  HiOutlineTrash } from "react-icons/hi";
import { TbRestore } from "react-icons/tb";

import type { PathBarConfig } from "../types";

export const trashPathBarConfig: PathBarConfig = {
  primaryButton: {
    action: "permanent-delete",
    icon: HiOutlineTrash,
    title: "Удалить безвозвратно",
    variant: "danger",
  },
  toolButtons: [
    {
      action: "restore",
      icon: TbRestore,
      title: "Восстановить",
    },
  ],
};
