import { Globe } from "lucide-react";
import { Link } from "react-router";
import type { Locale } from "~/lib/i18n";
import { useLocale } from "~/root";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const locales = {
  "zh-TW": "繁體中文",
  en: "English",
  ja: "日本語",
} as const satisfies Record<Locale, string>;

export function LanguageSwitcher() {
  const currentLocale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(locales).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            disabled={locale === currentLocale}
            asChild
          >
            <Link
              hrefLang={locale}
              to={locale === "zh-TW" ? "/" : `/${locale}`}
              reloadDocument
            >
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
