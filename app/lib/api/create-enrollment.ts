import { useMutation } from "@tanstack/react-query";

export function useCreateEnrollment() {
  return useMutation({
    async mutationFn() {
      fetch();
    },
  });
}
