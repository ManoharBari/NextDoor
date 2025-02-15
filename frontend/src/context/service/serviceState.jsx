import { useState, useMemo } from "react";
import { mockServices } from "../../data/mockServices";
import ServiceContext from "./serviceContext";
import userState from "../auth/userState";

export function useServices() {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Show All Services
  const ShowAllServices = async (email, password) => {
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

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  return (
    <ServiceContext.Provider value={{
      services: filteredServices,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
    }}>
    </ServiceContext.Provider>
  );
}

export default userState;
