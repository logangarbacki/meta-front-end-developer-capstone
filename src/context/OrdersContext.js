import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { postOrder, fetchMyOrders } from "../api/api";

const OrdersContext = createContext(null);

const PREPARING_DURATION = 30_000;
const ON_THE_WAY_DURATION = 60_000;

export function OrdersProvider({ children }) {
  const { token, isLoggedIn } = useAuth();

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

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    fetchMyOrders(token)
      .then((data) => {
        setOrders((prev) => {
          const apiIds = new Set(data.map((o) => o.order_number));
          const localOnly = prev.filter((o) => !apiIds.has(o.orderNumber));
          const merged = [
            ...data.map((o) => ({
              id: o.order_number,
              orderNumber: o.order_number,
              items: o.items,
              subtotal: parseFloat(o.subtotal),
              deliveryFee: parseFloat(o.delivery_fee),
              tip: parseFloat(o.tip),
              discount: parseFloat(o.discount),
              total: parseFloat(o.total),
              address: o.address,
              name: o.name,
              email: o.email,
              status: o.status,
              eta: o.eta,
              placedAt: o.placed_at,
            })),
            ...localOnly,
          ];
          return merged;
        });
      })
      .catch(() => {});
  }, [isLoggedIn, token]);

  const updateStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status } : o)
    );
  };

  useEffect(() => {
    orders.forEach((order) => {
      if (timersRef.current[order.id]) return;

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
        timersRef.current[order.id] = true;
        const t2 = setTimeout(() => {
          updateStatus(order.id, "delivered");
        }, ON_THE_WAY_DURATION);
        timersRef.current[`${order.id}_t2`] = t2;
      }
    });
  }, [orders]);

  const addOrder = async (order) => {
    setOrders((prev) => [order, ...prev]);
    if (token) {
      try {
        await postOrder({
          order_number: order.orderNumber,
          items: order.items,
          subtotal: order.subtotal,
          delivery_fee: order.deliveryFee,
          tip: order.tip || 0,
          discount: order.discount || 0,
          total: order.total,
          address: order.address,
          name: order.name,
          email: order.email,
          status: order.status,
          eta: order.eta,
        }, token);
      } catch {}
    }
  };

  const loyaltyPoints = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + Math.floor(o.total * 10), 0);

  const clearOrders = () => {
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
