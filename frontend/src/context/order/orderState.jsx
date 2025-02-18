import { useContext, useState } from "react";
import UserContext from "../auth/userContext";
import OrderContext from "./orderContext";


function orderState({ children }) {
    const host = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`;
    const [orderData, setOrderData] = useState([]);
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