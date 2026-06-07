import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    name: firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? 'Użytkownik',
    createdAt: firebaseUser.metadata.creationTime ?? null,
  });

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!firebaseAuth) {
      return false;
    }

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      setUser(mapFirebaseUser(credential.user));
      return true;
    } catch {
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    if (!firebaseAuth) {
      return false;
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateProfile(credential.user, { displayName: name });

      setUser({
        id: credential.user.uid,
        email: credential.user.email ?? email,
        name,
        createdAt: credential.user.metadata.creationTime ?? null,
      });

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    if (!firebaseAuth) {
      setUser(null);
      return;
    }

    await signOut(firebaseAuth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
