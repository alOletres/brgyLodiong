import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const tokenKey = "token" as const;

/**
 * get token from local storage.
 */
export function getToken() {
  return getCookie(tokenKey);
}

export function decodeToken() {
  const token = getToken();

  if (token) {
    return jwtDecode(token);
  }
}
/**
 * save token to local storage.
 */
export function setToken(token: string): void {
  setCookie(tokenKey, token);
}

/**
 * remove token from local storage.
 */
export function removeToken(): void {
  deleteCookie(tokenKey);
}
