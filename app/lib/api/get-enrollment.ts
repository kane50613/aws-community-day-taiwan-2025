import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../store";
import { endpoint, slug } from "./client";

interface Enrollment {
  code: string;
}

export const enrollmentQueryKey = ["enrollment"] as const;

export function useEnrollment() {
  const token = useAtomValue(tokenAtom);

  return useQuery({
    enabled: !!token,
    queryKey: enrollmentQueryKey,
    async queryFn() {
      const response = await fetch(`${endpoint}/events/${slug}/enrolls/me`, {
        headers: {
          Authorization: token ?? "",
        },
      });

      if (response.ok) {
        return response.json() as Promise<Enrollment>;
      }
    },
  });
}
