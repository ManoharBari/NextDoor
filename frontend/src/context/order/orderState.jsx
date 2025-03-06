import { useState } from "react";
import OrderContext from "./orderContext";
import toast from "react-hot-toast";


function orderState({ children }) {
    const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
    const [orderData, setOrderData] = useState([]);

    const ShowAllOrder = async () => {
        try {
            const response = await fetch(`${host}/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`
                },
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            setOrderData(data);

        }
        catch (error) {
            toast.error("Internal Server Error");
        }
    };
    const DeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`${host}/orders/${orderId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`
                },
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            await ShowAllOrder();
            toast.success('Order Cancelled Successfully');
        }
        catch (error) {
            toast.error("Internal Server Error");
        }
    };

    const markAs = async (orderId, status) => {
        try {
            const response = await fetch(`${host}/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            const data = await response.json();
            await ShowAllOrder();
            toast.success(data.message);

        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <OrderContext.Provider value={{
            ShowAllOrder,
            orderData,
            markAs,
            DeleteOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export default orderState;