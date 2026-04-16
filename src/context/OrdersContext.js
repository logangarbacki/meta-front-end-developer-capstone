import { createContext, useContext, useState, useEffect, useRef } from "react";

const OrdersContext = createContext(null);

// How long each status lasts (ms)
const PREPARING_DURATION = 30_000;  // 30s → on_the_way
const ON_THE_WAY_DURATION = 60_000; // 60s → delivered

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ll_orders")) || [];
    } catch {
      return [];
    }
  });

  const timersRef = useRef({});

  useEffect(() => {
    localStorage.setItem("ll_orders", JSON.stringify(orders));
  }, [orders]);

  const updateStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status } : o)
    );
  };

  // Whenever a new "preparing" order appears, schedule its transitions
  useEffect(() => {
    orders.forEach((order) => {
      if (timersRef.current[order.id]) return; // already scheduled

      if (order.status === "preparing") {
        timersRef.current[order.id] = true;
        const t1 = setTimeout(() => {
          updateStatus(order.id, "on_the_way");
          const t2 = setTimeout(() => {
            updateStatus(order.id, "delivered");
          }, ON_THE_WAY_DURATION);
          timersRef.current[`${order.id}_t2`] = t2;
        }, PREPARING_DURATION);
        timersRef.current[`${order.id}_t1`] = t1;
      } else if (order.status === "on_the_way") {
        // App reloaded mid-delivery — finish the transition
        timersRef.current[order.id] = true;
        const t2 = setTimeout(() => {
          updateStatus(order.id, "delivered");
        }, ON_THE_WAY_DURATION);
        timersRef.current[`${order.id}_t2`] = t2;
      }
    });
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const loyaltyPoints = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + Math.floor(o.total * 10), 0);

  const clearOrders = () => {
    // Clear any pending timers
    Object.values(timersRef.current).forEach((t) => {
      if (typeof t === "number") clearTimeout(t);
    });
    timersRef.current = {};
    setOrders([]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, clearOrders, loyaltyPoints }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
