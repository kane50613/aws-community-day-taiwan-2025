import { useQuery } from "@tanstack/react-query";

export const sourceOptions = [
  "AWS Summit",
  "AWS User Group 每月小小聚",
  "社群平台 (FB, IG, Line……)",
  "親友介紹",
  "其他",
];

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

async function fetchUser() {
  const response = await fetch("https://tw.events.awsug.net/api/users/me", {
    credentials: "include",
  });

  if (response.ok) {
    return response.json() as Promise<User>;
  }
}

export function useUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: fetchUser,
  });
}
