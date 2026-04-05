import { apiFetch } from "./apiClient";
import { MENU_ITEMS } from "../api/mockData";

export const getMenuItems = () => apiFetch(() => MENU_ITEMS);

export const getSpecials = () =>
  apiFetch(() => MENU_ITEMS.filter((item) => item.isSpecial));
