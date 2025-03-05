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
            toast.success('Order Deleted Successfully');
        }
        catch (error) {
            toast.error("Internal Server Error");
        }
    };

    return (
        <OrderContext.Provider value={{
            ShowAllOrder,
            orderData,
            DeleteOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export default orderState;