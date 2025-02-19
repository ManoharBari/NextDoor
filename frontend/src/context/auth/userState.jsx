import { useState, createContext, useContext } from "react";
import UserContext from "./userContext";

function userState({ children }) {
  const [user, setUser] = useState({});
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;

  // Sign In
  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${host}/auth/login`, {
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

  // get user details
  const showUser = async () => {
    try {
      const response = await fetch(`${host}/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`
        },
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const user = await response.json();
      setUser({
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.profilePicture || `https://source.unsplash.com/100x100/?portrait`,
        role: user.role
      });
    } catch (error) {
      console.error("user getting error:", error.message);
    }
  };

  // Register
  const register = async (data) => {
    try {
      const response = await fetch(`${host}/auth/signup`, {
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
        location: resData.user.location,
        token: resData.token, // Save token for authentication
        role: resData.user.role
      });
      localStorage.setItem("token", resData.token); // Store token in localStorage
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  // Sign Out
  const signOut = () => {
    setUser({});
    localStorage.removeItem("token"); // Remove token on logout
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, showUser, isAuthenticated: !!user, signIn, signOut, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default userState;