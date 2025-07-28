import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../store";
import { endpoint } from "./client";

export const sourceOptions = [
  "AWS Summit",
  "AWS User Group 每月小小聚",
  "社群平台 (FB, IG, Line……)",
  "親友介紹",
  "其他",
] as const;

interface User {
  name: string;
  username: string;
  email: string;
  picture: string;
  db?: {
    userId: number;
    email: string;
    source: (typeof sourceOptions)[number];
    realName: string;
    company: string;
    phone: string;
    role: string;
    acceptTos: boolean;
    createdAt: string;
  };
}

export const userQueryKey = ["user"] as const;

export function useUser() {
  const token = useAtomValue(tokenAtom);

  return useQuery({
    enabled: !!token,
    queryKey: userQueryKey,
    async queryFn() {
      const response = await fetch(`${endpoint}/api/users/me`, {
        headers: {
          Authorization: token ?? "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return response.json() as Promise<User>;
    },
  });
}
