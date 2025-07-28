import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { z } from "zod/mini";
import {
  endpoint,
  fetchWithSession,
  queryClient,
  slug,
} from "~/lib/api/client";
import { enrollmentQueryKey } from "~/lib/api/get-enrollment";
import { sourceOptions, useUser } from "~/lib/api/get-user";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ReactNode } from "react";

const schema = z.object({
  realName: z.string().check(z.minLength(1, "請輸入您的全名")),
  phone: z
    .string()
    .check(
      z.minLength(1, "請輸入您的電話號碼"),
      z.regex(/^\+?[\d-]+$/, "請輸入有效的電話號碼"),
    ),
  company: z.string(),
  source: z.enum(sourceOptions, "請選擇您得知活動的管道"),
});

export function RegisterDialogContent() {
  const { data: user } = useUser();

  const { mutate: createEnrollment, isPending: isCreating } = useMutation({
    async mutationFn(data: z.infer<typeof schema>) {
      const response = await fetchWithSession(`${endpoint}/events/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          acceptTos: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: enrollmentQueryKey,
      });
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: {
      realName: user?.db?.realName || "",
      phone: user?.db?.phone || "",
      source: user?.db?.source,
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <FormattedMessage id="register_dialog_content.title" />
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) => createEnrollment(data))}
        >
          <FormItem>
            <FormLabel asterisk>
              <FormattedMessage id="register_dialog_content.email" />
            </FormLabel>
            <FormControl>
              <Input value={user?.email || "Unknown"} readOnly disabled />
            </FormControl>
            <FormDescription>
              <FormattedMessage id="register_dialog_content.email_description" />
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="realName"
            render={() => (
              <FormItem>
                <FormLabel asterisk>
                  <FormattedMessage id="register_dialog_content.name" />
                </FormLabel>
                <FormControl>
                  <Input {...form.register("realName")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={() => (
              <FormItem>
                <FormLabel asterisk>
                  <FormattedMessage id="register_dialog_content.phone" />
                </FormLabel>
                <FormControl>
                  <Input {...form.register("phone")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={() => (
              <FormItem>
                <FormLabel asterisk>
                  <FormattedMessage id="register_dialog_content.company" />
                </FormLabel>
                <FormControl>
                  <Input {...form.register("company")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>
                  <FormattedMessage id="register_dialog_content.source" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sourceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-foreground/70">
            <FormattedMessage
              id="register_dialog_content.accept_tos_on_submit"
              values={{
                privacy: (children: ReactNode) => (
                  <a
                    href="https://aws.amazon.com/tw/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                terms: (children: ReactNode) => (
                  <a
                    href="https://aws.amazon.com/tw/service-terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </p>
          <Button type="submit" className="mt-4" disabled={isCreating}>
            <FormattedMessage id="register_dialog_content.submit" />
            {isCreating && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </>
  );
}
