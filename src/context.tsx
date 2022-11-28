import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export async function login(email: string) {
  await localStorage.setItem("login", email);

  return;
}

export async function logout() {
  await localStorage.removeItem("login");

  return;
}

export async function getCurrentUser() {
  const response = await localStorage.getItem("login");

  return response;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname, error]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(email: string) {
    setLoading(true);
    login(email);

    try {
      setUser(user);
      navigate("/expenses");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    await localStorage.removeItem("login");

    try {
      setUser(undefined);
      navigate("/");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return;
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
