import NavBar from "@/components/layout/NavBar"
import SideBar from "@/components/layout/SideBar"
import FileExplorer from "@/components/fileExplorer/FileExplorer"
import { useFilesStore } from "@/store/fileExplorer"
import type { FileItem } from "@/types/fileExplorer"

import { useEffect } from "react"


export default function HomePage() {
  const setFileData = useFilesStore(state => (state.setFileItems))
  const setPath = useFilesStore(state => (state.setPath))


  const items: FileItem[] = [
    {
      id: '1',
      name: 'document.txt',
      type: 'file',
      size: 1024,
      modified: 1677705600000,
      created: 1677629200000,
      starred: false
    },
    {
      id: '2',
      name: 'photos',
      type: 'folder',
      size: 0,
      modified: 1677792000000,
      created: 1677705600000,
      starred: true
    },
    {
      id: '3',
      name: 'presentation.pptx',
      type: 'file',
      size: 204800,
      modified: 1677878400000,
      created: 1677792000000,
      starred: false
    },
    {
      id: '4',
      name: 'music',
      type: 'folder',
      size: 0,
      modified: 1677964800000,
      created: 1677878400000,
      starred: true
    },
    {
      id: '5',
      name: 'notes.pdf',
      type: 'file',
      size: 51200,
      modified: 1678051200000,
      created: 1677964800000,
      starred: false
    },
    {
      id: '6',
      name: 'video.mp4',
      type: 'file',
      size: 10485760,
      modified: 1678137600000,
      created: 1678051200000,
      starred: true
    },
    {
      id: '7',
      name: 'archive.zip',
      type: 'file',
      size: 2097152,
      modified: 1678224000000,
      created: 1678137600000,
      starred: false
    },
    {
      id: '8',
      name: 'scripts',
      type: 'folder',
      size: 0,
      modified: 1678310400000,
      created: 1678224000000,
      starred: true
    },
    {
      id: '9',
      name: 'image.jpg',
      type: 'file',
      size: 1536000,
      modified: 1678396800000,
      created: 1678310400000,
      starred: false
    },
    {
      id: '10',
      name: 'data.json',
      type: 'file',
      size: 4096,
      modified: 1678483200000,
      created: 1678396800000,
      starred: true
    },
    {
      id: '11',
      name: 'backup',
      type: 'folder',
      size: 0,
      modified: 1678569600000,
      created: 1678483200000,
      starred: false
    },
    {
      id: '12',
      name: 'report.docx',
      type: 'file',
      size: 307200,
      modified: 1678656000000,
      created: 1678569600000,
      starred: true
    },
    {
      id: '13',
      name: 'audio.mp3',
      type: 'file',
      size: 5242880,
      modified: 1678742400000,
      created: 1678656000000,
      starred: false
    },
    {
      id: '14',
      name: 'config.ini',
      type: 'file',
      size: 1024,
      modified: 1678828800000,
      created: 1678742400000,
      starred: true
    },
    {
      id: '15',
      name: 'logs',
      type: 'folder',
      size: 0,
      modified: 1678915200000,
      created: 1678828800000,
      starred: false
    },
  ]

  useEffect(() => {
    setFileData(items)
    setPath([""])
  }, [])

  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <NavBar />

      <div className="flex row flex-1 min-h-0">
        <SideBar usedSpace={10000000000} totalSpace={100000000000 } />
        <FileExplorer title="Мой диск" />
      </div>
    </div>
  )
}