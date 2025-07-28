import { useQuery } from "@tanstack/react-query";
import { endpoint, fetchWithSession, slug } from "./client";

interface Enrollment {
  code: string;
}

export const enrollmentQueryKey = ["enrollment"] as const;

export async function fetchEnrollment() {
  const response = await fetchWithSession(
    `${endpoint}/events/${slug}/enrolls/me`,
  );

  if (response.ok) {
    return response.json() as Promise<Enrollment>;
  }
}

export function useEnrollment() {
  return useQuery({
    queryKey: enrollmentQueryKey,
    queryFn: fetchEnrollment,
  });
}
