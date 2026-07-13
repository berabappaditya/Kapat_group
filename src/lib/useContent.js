import { useEffect, useState } from "react";
import { sanityClient, sanityEnabled } from "./sanity";

/**
 * Fetches content live from Sanity, rendering the bundled JSON fallback
 * immediately (no loading state) and swapping in CMS data when it arrives.
 * If Sanity isn't configured, returns empty, or the request fails, the
 * fallback stays — the site never breaks because of the CMS.
 */
export function useContent(query, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    if (!sanityEnabled) return undefined;
    let cancelled = false;

    sanityClient
      .fetch(query)
      .then((result) => {
        const isEmpty =
          result == null || (Array.isArray(result) && result.length === 0);
        if (!cancelled && !isEmpty) {
          setData(result);
        }
      })
      .catch((error) => {
        console.warn("Sanity fetch failed; using bundled content.", error);
      });

    return () => {
      cancelled = true;
    };
  }, [query, fallback]);

  return data;
}
