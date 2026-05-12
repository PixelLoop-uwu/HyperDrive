import { HiOutlinePlus } from "react-icons/hi";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";

import type { PathBarConfig } from "../types";

export const defaultPathBarConfig: PathBarConfig = {
  primaryButton: {
    action: "new-item",
    icon: HiOutlinePlus,
    title: "Новый элемент",
  },
  toolButtons: [
    {
      action: "rename",
      icon: IoPencilOutline,
      title: "Переименовать",
    },
    {
      action: "delete",
      icon: IoTrashOutline,
      title: "Удалить",
      variant: "danger",
    },
  ],
};
