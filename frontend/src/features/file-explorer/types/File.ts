export type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null; 
  updatedAt: string;

  size: number | null;
  extension: string | null;
  mimeType: string| null;
}