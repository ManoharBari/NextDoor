import { useState, useMemo, useContext } from "react";
import axios from "axios";
import ServiceContext from "./serviceContext";
import UserContext from "../auth/userContext";
import toast from "react-hot-toast";

function ServiceState({ children }) {
  const host = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [services, setServices] = useState([]);
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Show All Services
  const ShowAllServices = async () => {
    try {
      const response = await axios.get(`${host}/services`);
      setServices(response.data);
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // Add Service
  const AddServices = async (data) => {
    try {
      await axios.post(
        `${host}/services`,
        {
          image: data.image,
          title: data.title,
          description: data.description,
          price: data.price,
          provider: user.id,
          category: data.category,
          availability: data.availability,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      await ShowAllServices();
      toast.success("Service added successfully");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // Edit Service
  const editService = async (id, data) => {
    try {
      await axios.put(
        `${host}/services/${id}`,
        {
          image: data.image,
          title: data.title,
          description: data.description,
          price: data.price,
          provider: user.id,
          category: data.category,
          availability: data.availability,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      await ShowAllServices();
      toast.success("Service updated successfully");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    try {
      await axios.delete(`${host}/services/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      await ShowAllServices();
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Internal Server Error");
    }
  };

  // Filter Services
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
    <ServiceContext.Provider
      value={{
        services: filteredServices,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        ShowAllServices,
        AddServices,
        editService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export default ServiceState;