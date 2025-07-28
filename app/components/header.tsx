import { useSetAtom } from "jotai";
import { FormattedMessage } from "react-intl";
import { useEnrollment } from "~/lib/api/get-enrollment";
import { openedModalAtom } from "~/lib/store";
import logo from "../assets/logo.png";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";

export function Header() {
  const setModal = useSetAtom(openedModalAtom);
  const { data: enrollment } = useEnrollment();

  return (
    <div className="px-8 mx-auto">
      <div className="border-b w-full flex justify-between items-center h-16">
        <img
          src={logo}
          alt="AWS Community Day Taiwan"
          width={1068}
          height={390}
          className="h-10 w-auto"
        />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button onClick={() => setModal("register")}>
            <FormattedMessage
              id={enrollment ? "hero_section.get_qrcode" : "hero_section.cta"}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
