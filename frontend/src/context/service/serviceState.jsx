import { useState, useMemo, useContext } from "react";
import ServiceContext from "./serviceContext";
import UserContext from "../auth/userContext";
import toast from "react-hot-toast";

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
      toast.error("Internal Server Error");
    }
  };

  // Add Services
  const AddServices = async (data) => {

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("provider", user.id);
    formData.append("category", data.category);
    formData.append("availability", data.availability);

    try {
      const response = await fetch(`${host}/services`, {
        method: "POST",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Invalid credentials");

      const res = await response.json();
      await ShowAllServices();
      toast.success("Service added successfully");
      
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // edit service
  const editService = async (id, data) => {

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("provider", user.id);
    formData.append("category", data.category);
    formData.append("availability", data.availability);

    try {
      const response = await fetch(`${host}/services/${id}`, {
        method: "PUT",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update service");

      const updatedService = await response.json();
      await ShowAllServices();
      toast.success("Service updated successfully");

    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`${host}/services/${id}`, {
        method: "DELETE",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete service");

      await ShowAllServices();

      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.message);
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
      AddServices,
      editService,
      deleteService
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export default serviceState;
