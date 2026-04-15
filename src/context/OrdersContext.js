import { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ll_orders")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ll_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const clearOrders = () => setOrders([]);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
