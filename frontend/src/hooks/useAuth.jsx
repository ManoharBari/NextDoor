import { useState, useCallback, createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = useCallback(async (email, password) => {
    // Simulated API call
    setUser({
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: `https://source.unsplash.com/100x100/?portrait`,
    });
  }, []);

  const register = useCallback(async (data) => {
    // Simulated API call
    setUser({
      id: "1",
      email: data.email,
      name: data.name,
      avatar: `https://source.unsplash.com/100x100/?portrait`,
      phone: data.phone,
      address: data.address,
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
