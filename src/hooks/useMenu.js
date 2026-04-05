import { useState, useMemo } from "react";
import { useFetch } from "./useFetch";
import { getMenuItems } from "../services/menuService";

/**
 * Fetches all menu items and exposes filter, sort, and search controls.
 */
export function useMenu() {
  const { data: items, loading, error } = useFetch(getMenuItems, []);

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default"); // "default" | "name" | "price-asc" | "price-desc"
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!items) return [];

    let result = items;

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, category, sortBy, search]);

  return { items: filtered, loading, error, category, setCategory, sortBy, setSortBy, search, setSearch };
}
