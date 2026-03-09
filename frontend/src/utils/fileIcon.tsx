import type { ReactElement } from 'react'
import type { FileItem } from '@/types/fileExplorer'
import { 
  IoFolderOutline, IoDocumentTextOutline, IoDocumentOutline, 
  IoImageOutline, IoVideocamOutline, IoMusicalNoteOutline, 
  IoArchiveOutline, IoCodeOutline 
} from 'react-icons/io5'

export function getFileIcon(file: FileItem): ReactElement {
  let Icon

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

  return <Icon size={20} color="#d1d5dc" />
}