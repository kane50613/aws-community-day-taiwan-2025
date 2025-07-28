import type { Config } from "@react-router/dev/config";
import { messages } from "./app/lib/i18n";

export default {
  ssr: false,
  prerender: Object.keys(messages).map((locale) =>
    locale === "zh-TW" ? "/" : `/${locale}`,
  ),
} satisfies Config;
