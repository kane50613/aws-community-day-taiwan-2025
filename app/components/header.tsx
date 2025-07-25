import logo from "../assets/logo.png";
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
          <Button disabled>報名準備中</Button>
        </div>
      </div>
    </div>
  );
}
