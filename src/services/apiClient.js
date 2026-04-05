const SIMULATED_DELAY_MS = 600;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates an async API call with a configurable delay.
 * Swap the body of this function with a real fetch() call when a backend is ready.
 *
 * @param {Function} dataFn - Returns the data to resolve with
 * @param {{ delayMs?: number }} options
 * @returns {Promise<any>}
 */
export async function apiFetch(dataFn, options = {}) {
  const { delayMs = SIMULATED_DELAY_MS } = options;
  await delay(delayMs);
  return dataFn();
}
