import { initializeTimes, updateTimes } from "./utils/bookingUtils";

test("initializeTimes returns a non-empty list of times", () => {
  const times = initializeTimes();
  expect(times.length).toBeGreaterThan(0);
});

test("updateTimes returns the same state", () => {
  const state = initializeTimes();
  const result = updateTimes(state, { type: "UPDATE_DATE", payload: "2025-06-01" });
  expect(result).toEqual(state);
});
