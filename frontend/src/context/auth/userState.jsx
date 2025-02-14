import { useState, createContext, useContext } from "react";
import UserContext from "./userContext";
function userState({ children }) {
  const [user, setUser] = useState(null);

  // Sign In
  const signIn = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      setUser({
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.profilePicture || `https://source.unsplash.com/100x100/?portrait`,
        token: data.token, // Save token for authentication
        role: data.user.role
      });

      localStorage.setItem("token", data.token); // Store token in localStorage
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Register
  const register = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Registration failed");

      const resData = await response.json();
      setUser({
        id: resData.user._id,
        email: resData.user.email,
        name: resData.user.name,
        avatar: resData.user.avatar || `https://source.unsplash.com/100x100/?portrait`,
        phone: resData.user.phone,
        address: resData.user.address,
        token: resData.token, // Save token for authentication
      });

      localStorage.setItem("token", resData.token); // Store token in localStorage
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token"); // Remove token on logout
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signOut, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default userState;