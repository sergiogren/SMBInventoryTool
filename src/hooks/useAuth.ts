import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChange, logout, isEmailAllowed } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<'emailNotAllowed' | null>(null);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      if (!isEmailAllowed(firebaseUser.email)) {
        setUser(null);
        setAuthError('emailNotAllowed');
        setLoading(false);
        void logout();
        return;
      }

      setUser(firebaseUser);
      setAuthError(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    authError,
    clearAuthError,
  };
};
