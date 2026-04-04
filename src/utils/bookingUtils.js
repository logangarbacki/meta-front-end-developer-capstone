import { fetchAPI } from "../api/api";

export const validateName = (name) => name.length >= 2;
export const validateEmail = (email) => email.includes("@");

export const initializeTimes = () => {
  return fetchAPI(new Date()).map((time) => {
    const [h, m] = time.split(":");
    const hour = +h;
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  });
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATE":
      return state;
    default:
      return state;
  }
};
