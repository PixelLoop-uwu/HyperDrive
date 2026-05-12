import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  IoFolderOutline, IoDocumentTextOutline, IoDocumentOutline, 
  IoImageOutline, IoVideocamOutline, IoMusicalNoteOutline, 
  IoArchiveOutline, IoCodeOutline 
} from 'react-icons/io5'

import type { SortingFn } from "@tanstack/react-table";
import type { ReactElement } from 'react'
import type { FileItem } from '@/features/file-explorer/types/File'
import type { IconType } from "react-icons/lib"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}



export function getFileIcon(file: FileItem): ReactElement {
  let Icon: IconType

  if (file.type === 'folder') Icon = IoFolderOutline
  else {
    const ext = file.name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'txt':
      case 'md':
      case 'docx':
        Icon = IoDocumentTextOutline
        break
      case 'pdf':
        Icon = IoDocumentOutline
        break
      case 'jpg':
      case 'png':
      case 'gif':
      case 'svg':
        Icon = IoImageOutline
        break
      case 'mp4':
      case 'avi':
      case 'mkv':
        Icon = IoVideocamOutline
        break
      case 'mp3':
      case 'wav':
        Icon = IoMusicalNoteOutline
        break
      case 'zip':
      case 'rar':
      case '7z':
        Icon = IoArchiveOutline
        break
      case 'js':
      case 'ts':
      case 'py':
      case 'java':
        Icon = IoCodeOutline
        break
      default:
        Icon = IoDocumentOutline
    }
  }

  return <Icon size={20} />
}



export const folderFirstSort: SortingFn<FileItem> = (rowA, rowB, columnId) => {
  const isFolderA = rowA.original.type === "folder";
  const isFolderB = rowB.original.type === "folder";

  if (isFolderA !== isFolderB) {
    const column = rowA.getAllCells().find((cell) => cell.column.id === columnId)?.column;
    const isDesc = column?.getIsSorted() === "desc";
    return isFolderA ? (isDesc ? 1 : -1) : (isDesc ? -1 : 1);
  }

  const valueA = rowA.getValue(columnId);
  const valueB = rowB.getValue(columnId);

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
}