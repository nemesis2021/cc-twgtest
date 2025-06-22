// Record of keys and the last fetched timestamp

import { FetchPolicy } from '@apollo/client';

// These are universal for all calls and hooks
const keys = new Map<string, number>();

/**
 * This function accepts a unique key and an expiration date.
 * It returns "network-only" if the cache key is expired
 * or "cache-first" if the key is still valid for the given expiration time
 *
 * @param key - the unique name you want to give this expiration key
 * @param expirationSeconds)
 */

const getApolloFetchPolicy = (
  key: string,
  expirationSeconds: number | false,
): FetchPolicy => {
  const lastFetchTimestamp = keys.get(key);
  const diffFromNow = lastFetchTimestamp
    ? Date.now() - lastFetchTimestamp
    : Number.MAX_SAFE_INTEGER;
  let fetchPolicy: FetchPolicy = 'cache-first';

  // Is Expired?
  if (expirationSeconds && diffFromNow > expirationSeconds * 1000) {
    keys.set(key, Date.now());
    fetchPolicy = 'network-only';
  }

  return fetchPolicy;
};

export default getApolloFetchPolicy;
