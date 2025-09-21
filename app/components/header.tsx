import { useSetAtom } from "jotai";
import { FormattedMessage } from "react-intl";
import { useEnrollment } from "~/lib/api/get-enrollment";
import { showSurvey, surveyUrl } from "~/lib/config";
import { openedModalAtom } from "~/lib/store";
import logo from "../assets/logo.webp";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";

export function Header() {
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
          <ActionButton />
        </div>
      </div>
    </div>
  );
}

function ActionButton() {
  const setModal = useSetAtom(openedModalAtom);
  const { data: enrollment } = useEnrollment();

  if (showSurvey) {
    return (
      <Button asChild>
        <a href={surveyUrl} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="hero_section.survey" />
        </a>
      </Button>
    );
  }
  return (
    <Button onClick={() => setModal("register")}>
      <FormattedMessage
        id={enrollment ? "hero_section.get_qrcode" : "hero_section.cta"}
      />
    </Button>
  );
}
