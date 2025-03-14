import { useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

function userState({ children }) {
  const [user, setUser] = useState({});
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
  const navigate = useNavigate();

  // Sign In
  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post(`${host}/auth/login`, { email, password });

      setUser({
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.profilePicture || "",
        token: data.token, // Save token for authentication
        role: data.user.role,
      });

      localStorage.setItem("token", data.token); // Store token in localStorage
      toast.success(`Welcome back ${data.user.name}`);
      navigate("/");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // get user details
  const showUser = async () => {
    try {
      const response = await axios.post(`${host}/auth/getuser`, {}, // Empty object for POST request body
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      const user = response.data;

      setUser({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.profilePicture,
        location: user.location,
        role: user.role,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  // Register
  const register = async (data) => {

    try {
      const response = await axios.post(`${host}/auth/signup`, data);

      const resData = response.data;

      setUser({
        id: resData.user._id,
        email: resData.user.email,
        name: resData.user.name,
        avatar: resData.user.profilePicture,
        location: resData.user.location,
        token: resData.token, // Save token for authentication
        role: resData.user.role,
      });

      localStorage.setItem("token", resData.token); // Store token in localStorage
      toast.success("Registration successful!");
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
      value={{ user, setUser, showUser, isAuthenticated: !!user.id, signIn, signOut, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default userState;