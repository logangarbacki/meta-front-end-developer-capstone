import { fetchAPI } from "../api/api.js";

const formatTime = (raw) => {
  const [h, m] = raw.split(":");
  const hour = +h;
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

export const initializeTimes = () =>
  fetchAPI(new Date()).map(formatTime);

export const updateTimes = (state, action) => {
  // Accepts either a reducer action { type, payload } or a bare date string
  const dateStr = action?.payload ?? (typeof action === "string" ? action : null);
  if (dateStr) {
    const date = new Date(dateStr);
    if (!isNaN(date)) {
      return fetchAPI(date).map(formatTime);
    }
  }
  return state;
};
