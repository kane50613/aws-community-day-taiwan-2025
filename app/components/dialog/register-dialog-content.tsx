import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { z } from "zod/mini";
import { useCreateEnrollment } from "~/lib/api/create-enrollment";
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

const schema = z.object({
  realName: z.string().check(z.minLength(1, "請輸入您的全名")),
  phone: z.string().check(z.minLength(1, "請輸入您的電話號碼")),
  source: z.enum(sourceOptions, "請選擇您得知活動的管道"),
});

export function RegisterDialogContent() {
  const { data: user } = useUser();
  const { mutate } = useCreateEnrollment();

  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: {
      realName: user?.db?.realName || "",
      phone: user?.db?.phone || "",
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
          onSubmit={form.handleSubmit((data) => {})}
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
          <Button type="submit" className="mt-4">
            <FormattedMessage id="register_dialog_content.submit" />
          </Button>
        </form>
      </Form>
    </>
  );
}
