import { useState, useMemo, useContext } from "react";
import ServiceContext from "./serviceContext";
import UserContext from "../auth/userContext";

function serviceState({ children }) {
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
  const [services, setServices] = useState([]);
  const { user } = useContext(UserContext);
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

  // Add Services
  const AddServices = async (data) => {
    try {
      const response = await fetch(`${host}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          provider: user.id,
          price: data.price,
          category: data.category,
          availability: data.availability,
          image: data.image,
        }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const res = await response.json();
      await ShowAllServices()
      console.log("success")

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
      ShowAllServices,
      AddServices
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export default serviceState;
