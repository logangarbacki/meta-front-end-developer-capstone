import { validateName, validateEmail } from "../utils/validationUtils.js";

describe("Validation functions", () => {
  test("validateName works correctly", () => {
    expect(validateName("John")).toBe(true);   // valid
    expect(validateName("J")).toBe(false);     // invalid
  });

  test("validateEmail works correctly", () => {
    expect(validateEmail("test@email.com")).toBe(true); // valid
    expect(validateEmail("invalid-email")).toBe(false); // invalid
  });
});