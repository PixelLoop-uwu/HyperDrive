import NavBar from "@/components/root/NavBar"
import SideBar from "@/components/root/SideBar"
import { Outlet } from 'react-router-dom';


export default function DriveLayout () {
  return (
    <div className="min-h-screen flex flex-col gap-5">
      <NavBar />
      
      <div className="flex-1 flex flex-row gap-5">
        <SideBar usedSpace={55834574848} totalSpace={107374182400} />

        <Outlet />
      </div>
    </div>
  )
}