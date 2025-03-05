import { useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function userState({ children }) {
  const [user, setUser] = useState({});
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
  const navigate = useNavigate();

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
      toast.success(`Welcome back ${data.user.name}`);
      navigate("/")
    } catch (error) {
      toast.error("Internal Server Error");
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
      toast.error("Internal Server Error");
    }
  };

  // Register
  const register = async (data) => {
    const formData = new FormData();
    formData.append("profilePicture", data.avatar);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("location", data.location);
    formData.append("role", data.role);

    try {
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: {
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Registration failed");

      const resData = await response.json();
      setUser({
        id: resData.user._id,
        email: resData.user.email,
        name: resData.user.name,
        avatar: resData.user.profilePicture,
        location: resData.user.location,
        token: resData.token, // Save token for authentication
        role: resData.user.role
      });
      localStorage.setItem("token", resData.token); // Store token in localStorage
      toast.success('Registration successful!');
      navigate("/");

    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // Sign Out
  const signOut = () => {
    setUser({});
    localStorage.removeItem("token"); // Remove token on logout
    toast.success("Logged out successfully!");
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