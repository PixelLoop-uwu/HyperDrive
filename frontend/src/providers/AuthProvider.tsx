import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

type AuthContextValue = {
  ready: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const refresh = useAuthStore(s => s.refresh);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await refresh();
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => { mounted = false };
  }, [refresh]);

  const value = useMemo(() => ({ ready }), [ready]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
