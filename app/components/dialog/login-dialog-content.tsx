import { type ReactNode, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import amazon from "~/assets/amazon.svg";
import google from "~/assets/google.svg";
import line from "~/assets/line.svg";
import { endpoint } from "~/lib/api/client";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export function LoginDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <FormattedMessage id="login_dialog_content.title" />
        </DialogTitle>
        <DialogDescription>
          <FormattedMessage id="login_dialog_content.description" />
        </DialogDescription>
      </DialogHeader>
      <ButtonGroup className="justify-stretch [&_a]:flex-1 flex-wrap">
        <Method iconUrl={google} method="Google">
          Google
        </Method>
        <Method iconUrl={line} method="Line">
          Line
        </Method>
        <Method iconUrl={amazon} method="LoginWithAmazon">
          Amazon
        </Method>
      </ButtonGroup>
    </>
  );
}

function Method({
  iconUrl,
  method,
  children,
}: {
  iconUrl: string;
  method: string;
  children: ReactNode;
}) {
  const [authUrl, setAuthUrl] = useState<string>();

  useEffect(() => setAuthUrl(createAuthUrl(method)), [method]);

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      size="lg"
      asChild
    >
      <a href={authUrl} className={cn(!authUrl && "text-muted-foreground")}>
        <img src={iconUrl} alt={method} className="size-6" />
        {children}
      </a>
    </Button>
  );
}

function createAuthUrl(method: string): string {
  const redirectTo = encodeURIComponent(`${origin}?show_register_dialog=true`);

  return `${endpoint}/auth/${method}?redirectTo=${redirectTo}`;
}
