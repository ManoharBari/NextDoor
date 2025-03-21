import { useState } from "react";
import OrderContext from "./orderContext";
import toast from "react-hot-toast";
import axios from "axios";

function orderState({ children }) {
    const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
    const [orderData, setOrderData] = useState([]);

    const ShowAllOrder = async () => {
        try {
            const response = await axios.get(`${host}/orders`, {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token")
                }
            });

            setOrderData(response.data);
        }
        catch (error) {
            toast.error("Internal Server Error");
        }
    };

    const DeleteOrder = async (orderId) => {
        try {
            await axios.delete(`${host}/orders/${orderId}`, {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                }
            });

            await ShowAllOrder();
            toast.success("Order Cancelled Successfully");
        }
        catch (error) {
            toast.error("Internal Server Error");
        }
    };

    const markAs = async (orderId, status) => {
        try {
            const { data } = await axios.put(
                `${host}/orders/${orderId}/status`,
                { status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("token"),
                    }
                }
            );

            await ShowAllOrder();
            toast.success(data.message);
        }
        catch (error) {
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