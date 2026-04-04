import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "../utils/bookingUtils";
import * as api from "../api/api";

describe("BookingForm", () => {
  beforeEach(() => {
    jest.spyOn(api, "fetchAPI").mockImplementation((date) => {
      return [
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
      ];
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the Reserve a Table heading", () => {
    const times = initializeTimes();

    render(<BookingForm availableTimes={times} onSubmit={() => {}} />);
    
    const heading = screen.getByText(/reserve a table/i);
    expect(heading).toBeInTheDocument();
  });

  test("initializeTimes returns correctly formatted times", () => {
    const times = initializeTimes();

    expect(times).toEqual([
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
    ]);
  });

  test("updateTimes returns updated times based on selected date", () => {
    const initialState = initializeTimes();

    const updatedState = updateTimes(initialState, "2025-06-01");

    expect(updatedState).toEqual([
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
    ]);
  });

  test("all times are in correct 12-hour format", () => {
    const times = initializeTimes();

    const timeRegex = /^\d{1,2}:\d{2} (AM|PM)$/;

    times.forEach((time) => {
      expect(time).toMatch(timeRegex);
    });
  });
});

test("form inputs have correct HTML5 validation attributes", () => {
  const times = initializeTimes();

  render(<BookingForm availableTimes={times} onSubmit={() => {}} />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const guestsInput = screen.getByLabelText(/guests/i);
  const dateInput = screen.getByLabelText(/date/i);

  expect(nameInput).toBeRequired();
  expect(emailInput).toBeRequired();
  expect(guestsInput).toBeRequired();
  expect(dateInput).toBeRequired();

  expect(emailInput).toHaveAttribute("type", "email");

  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
});