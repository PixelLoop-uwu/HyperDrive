import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthContext } from "@/providers/AuthProvider";

import type { ReactNode } from "react";


export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = useAuthStore((s) => s.isAuth);
  const { ready } = useAuthContext();
  const location = useLocation();

  if (!ready) return <></>;
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
