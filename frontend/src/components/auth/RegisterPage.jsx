import React, { useContext, useEffect, useState } from "react";
import { User, Mail, Lock, MapPin } from "lucide-react";
import UserContext from "../../context/auth/userContext";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
    navigate("/");
    }
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    role: "client",
  });
  const { register } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(formData);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative w-full h-40 mb-8">
          <img
            src="https://source.unsplash.com/1600x900/?service-professional"
            alt="Service Professional"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            Join Our Community
          </h2>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: "name", label: "Full Name", Icon: User, type: "text" },
              { id: "email", label: "Email Address", Icon: Mail, type: "email" },
              { id: "password", label: "Password", Icon: Lock, type: "password" },
              { id: "location", label: "Address", Icon: MapPin },
            ].map(({ id, label, Icon, type = "text" }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="mt-1 relative">
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id={id}
                    type={type}
                    required
                    value={formData[id]}
                    onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                    className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ))}

            <label className="block text-sm font-medium text-gray-700" htmlFor="role">Select Role</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="pl-10 -mt-5 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="role" id="role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="client">Client</option>
                <option value="provider">Provider</option>
              </select>
            </div>
            <div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
