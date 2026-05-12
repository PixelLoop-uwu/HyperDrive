import { useAuthContext } from '@/providers/AuthProvider';
import type { ReactNode } from 'react';


export default function AuthGate({ children }: { children: ReactNode }) {
  const { ready } = useAuthContext();
  if (!ready) return null;
  return <>{children}</>;
}
