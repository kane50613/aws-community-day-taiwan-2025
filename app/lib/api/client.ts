import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://tw.events.awsug.net"
    : "http://localhost:3000";

export const slug = "aws-community-day-taiwan-2025";

export function fetchWithSession(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem("session") ?? "",
    },
  });
}
