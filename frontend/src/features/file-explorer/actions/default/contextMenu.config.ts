import {
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineDuplicate,
  HiOutlineFolder,
  HiOutlineCloudUpload,
  HiOutlineInformationCircle,
  HiOutlineScissors,
} from "react-icons/hi";

import type { ContextMenuConfig } from "../types";

export const defaultContextMenuConfig: ContextMenuConfig = {
  empty: [
    {
      action: "new-folder",
      icon: HiOutlineFolder,
      label: "Новая папка",
    },
    {
      action: "upload-files",
      icon: HiOutlineCloudUpload,
      label: "Загрузить файлы",
    },
    {
      action: "folder-props",
      icon: HiOutlineInformationCircle,
      label: "Свойства папки",
    },
  ],

  file: [
    {
      action: "download",
      icon: HiOutlineDownload,
      label: "Скачать",
    },
    {
      action: "rename",
      icon: HiOutlinePencil,
      label: "Переименовать",
    },
    {
      action: "copy",
      icon: HiOutlineDuplicate,
      label: "Копировать",
    },
    {
      action: "move",
      icon: HiOutlineScissors,
      label: "Переместить",
      hasDivider: true,
    },
    {
      action: "delete",
      icon: HiOutlineTrash,
      label: "Удалить",
      variant: "danger",
    },
  ],

  folder: [
    {
      action: "download",
      icon: HiOutlineDownload,
      label: "Скачать",
    },
    {
      action: "rename",
      icon: HiOutlinePencil,
      label: "Переименовать",
    },
    {
      action: "copy",
      icon: HiOutlineDuplicate,
      label: "Копировать",
    },
    {
      action: "move",
      icon: HiOutlineScissors,
      label: "Переместить",
      hasDivider: true,
    },
    {
      action: "delete",
      icon: HiOutlineTrash,
      label: "Удалить",
      variant: "danger",
    },
  ],

  multiple: [
    {
      action: "download",
      icon: HiOutlineDownload,
      label: "Скачать архивом",
    },
    {
      action: "move",
      icon: HiOutlineScissors,
      label: "Переместить",
      hasDivider: true,
    },
    {
      action: "delete",
      icon: HiOutlineTrash,
      label: "Удалить",
      variant: "danger",
    },
  ],
};
