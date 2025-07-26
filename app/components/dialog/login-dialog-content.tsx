import { FormattedMessage } from "react-intl";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import amazon from "~/assets/amazon.svg";
import google from "~/assets/google.svg";
import line from "~/assets/line.svg";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import type { ReactNode } from "react";
import { endpoint } from "~/lib/api/client";

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
      <ButtonGroup className="justify-stretch [&_a]:flex-1">
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
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      size="lg"
      asChild
    >
      <a href={`${endpoint}/auth/${method.toLowerCase()}`}>
        <img src={iconUrl} alt={method} className="size-6" />
        {children}
      </a>
    </Button>
  );
}
