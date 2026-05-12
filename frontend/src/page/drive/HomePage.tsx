import { FileExplorer } from "@/features/file-explorer"

import type { FileItem } from "@/features/file-explorer/types/File"


export default function HomePage () {
  const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    parentId: null,
    updatedAt: '2023-10-20T10:00:00Z',
    size: null,
    extension: null,
    mimeType: null,
  },
  {
    id: '2',
    name: 'Work',
    type: 'folder',
    parentId: '1',
    updatedAt: '2023-10-21T14:30:00Z',
    size: null,
    extension: null,
    mimeType: null,
  },
  {
    id: '3',
    name: 'project-proposal.pdf',
    type: 'file',
    parentId: '2',
    updatedAt: '2023-10-22T09:15:00Z',
    size: 2048576, // 2MB
    extension: 'pdf',
    mimeType: 'application/pdf',
  },
  {
    id: '4',
    name: 'budget-2024.xlsx',
    type: 'file',
    parentId: '2',
    updatedAt: '2023-10-23T11:45:00Z',
    size: 512000,
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    id: '5',
    name: 'Images',
    type: 'folder',
    parentId: null,
    updatedAt: '2023-10-24T16:20:00Z',
    size: null,
    extension: null,
    mimeType: null,
  },
  {
    id: '6',
    name: 'vacation-photo.jpg',
    type: 'file',
    parentId: '5',
    updatedAt: '2023-10-25T18:05:00Z',
    size: 3500000,
    extension: 'jpg',
    mimeType: 'image/jpeg',
  },
  {
    id: '7',
    name: 'README.md',
    type: 'file',
    parentId: null,
    updatedAt: '2023-10-26T12:00:00Z',
    size: 1024,
    extension: 'md',
    mimeType: 'text/markdown',
  }
  
];

  return (
    <FileExplorer mode={"default"} title={"Мой диск"} fileList={mockFiles} currentPath={[""]} />
  )
}