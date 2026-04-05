import { useState, useEffect } from "react";

/**
 * Generic data-fetching hook with loading and error states.
 *
 * @param {Function} fetchFn - Async function that returns the data
 * @param {Array}    deps    - Dependency array that re-triggers the fetch
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchFn()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Something went wrong. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // fetchFn reference changes on every render; deps controls re-fetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
