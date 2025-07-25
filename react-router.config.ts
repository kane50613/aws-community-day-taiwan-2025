import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/en", "/ja"],
  future: {
    unstable_middleware: true,
  },
} satisfies Config;
