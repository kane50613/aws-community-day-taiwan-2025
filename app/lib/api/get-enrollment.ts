import { useQuery } from "@tanstack/react-query";
import { endpoint } from "./client";

interface Enrollment {
  code: string;
}

export const enrollmentQueryKey = ["enrollment"] as const;

export async function fetchEnrollment() {
  const response = await fetch(
    `${endpoint}/events/ug-tpe-202506-online/enrolls/me`,
    {
      credentials: "include",
    },
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
