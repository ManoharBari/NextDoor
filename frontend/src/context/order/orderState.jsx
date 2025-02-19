import { useContext, useState } from "react";
import UserContext from "../auth/userContext";
import OrderContext from "./orderContext";


function orderState({ children }) {
    const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
    const [orderData, setOrderData] = useState([{
        _id: "67b2b9e9dc7a9990221d8be8",
        userId: {
            _id: "67a49395f327929d732a51a3",
            name: "Manohar Kale",
            profilePicture: ""
        },
        serviceId: {
            _id: "67b170486c3b8ad97ba4c1e6",
            title: "Profesional Plumbing Services",
            description: "I can solve any Plumbing problem"
        },
        amount: 299,
        currency: "INR",
        status: "created",
        createdAt: "2025-02-19T13:42:22.898Z"
    },]);
    const { user } = useContext(UserContext);

    // Show All Orders
    const ShowAllOrder = async () => {
        try {
            const response = await fetch(`${host}/orders/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`
                },
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            setOrderData(data);

        } catch (error) {
            console.error("Login error:", error.message);
        }
    };

    return (
        <OrderContext.Provider value={{
            ShowAllOrder,
            orderData
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export default orderState;