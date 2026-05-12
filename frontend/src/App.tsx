import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import LoginPage from "@/page/LoginPage"
import NotFound from "@/page/error/NotFound"
import HomePage from "@/page/drive/HomePage"
import TrashPage from "./page/drive/TrashPage"

import OverlayManager from "./components/overlay/OverlayManager"

import ParticlesBackground from "@/components/ui/Particles"
import DriveLayout from "@/components/DriveLayout"
import RequireAuth from "@/components/RequireAuth"
import { Toaster } from "sonner"
import AuthProvider from "./providers/AuthProvider"
import AuthGate from "./components/AuthGate"
import PublicOnly from "./components/PublicOnly"
import { useAuthStore } from "@/store/useAuthStore"


export default function App() {
  return (
    <>
      <AuthProvider>
        <AuthGate>
          <div className="relative z-50 h-screen">
            <Routes>
              <Route path="/login" element={<PublicOnly><LoginPage /></PublicOnly>} />
              
              <Route element={<RequireAuth><DriveLayout /></RequireAuth>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/trash" element={<TrashPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthGate>
      </AuthProvider>

      <ParticlesBackground />
      <OverlayManager />
      <Toaster
        position="bottom-right" 
        theme="dark" 
        richColors 
        closeButton 
          expand
          visibleToasts={4}
          gap={8}
        toastOptions={{
          className: "border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl rounded-xl shadow-lg shadow-black/30",
          descriptionClassName: "text-zinc-400",
          classNames: {
            title: "text-zinc-100",
            description: "text-zinc-400",
            closeButton: "text-zinc-400 hover:text-white",
            actionButton: "bg-zinc-100 text-zinc-900 hover:bg-white rounded-md px-2 py-1",
            cancelButton: "text-zinc-300 hover:text-white rounded-md px-2 py-1",
            success: "border-emerald-800/50",
            error: "border-red-800/50",
            info: "border-blue-800/50",
            warning: "border-amber-800/50",
            loading: "border-zinc-700/60",
            icon: "opacity-80",
          },
          duration: 3500,
        }}
      />
    </> 
  )
}