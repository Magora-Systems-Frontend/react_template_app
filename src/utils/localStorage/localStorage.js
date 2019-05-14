/**
 *
 */
export function clearStorage() {
  clear();
}

/**
 *
 * @param key
 * @returns {string}
 */
export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {}
}

/**
 *
 * @param key
 * @param data
 */
export function setItem(key, data) {
  try {
    localStorage.setItem(key, data);
  } catch (e) {}
}

/**
 *
 * @param key
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

/**
 *
 */
export function clear() {
  try {
    localStorage.clear();
  } catch (e) {}
}
