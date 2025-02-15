import { useState, useMemo } from "react";
import { mockServices } from "../../data/mockServices";
import ServiceContext from "./serviceContext";

function serviceState({ children }) {
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Show All Services
  const ShowAllServices = async () => {
    try {
      const response = await fetch(`${host}/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      setServices(data);

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
      ShowAllServices
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export default serviceState;
