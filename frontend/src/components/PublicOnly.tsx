import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuthContext } from '@/providers/AuthProvider';

export default function PublicOnly({ children }: { children: ReactNode }) {
  const isAuth = useAuthStore(s => s.isAuth);
  const { ready } = useAuthContext();
  const location = useLocation();

  if (!ready) return null;
  if (isAuth) return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  return <>{children}</>;
}
