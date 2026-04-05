import { fetchAPI } from "../api/api";
import { apiFetch } from "./apiClient";

const formatTime = (raw) => {
  const [h, m] = raw.split(":");
  const hour = +h;
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

export const getAvailableTimes = (date) =>
  apiFetch(() => fetchAPI(date).map(formatTime));

export const submitReservation = (formData) =>
  apiFetch(
    () => ({ success: true, confirmationId: `LL-${Date.now()}` }),
    { delayMs: 800 }
  );
