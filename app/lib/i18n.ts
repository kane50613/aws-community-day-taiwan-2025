export const messages = {
  "zh-TW": {
    "hero_section.date": "9月21日 (星期日) 上午9:30 - 下午5:30",
    "hero_section.location": "台北國際會議中心 (TICC)",
    "hero_section.cta": "立即報名",
  },
  en: {
    "hero_section.date": "September 21st (Sunday) 9:30 AM - 5:30 PM",
    "hero_section.location": "Taipei International Convention Center (TICC)",
    "hero_section.cta": "Register Now",
  },
  ja: {
    "hero_section.date": "9月21日 (日) 午前9時30分 - 午後5時30分",
    "hero_section.location": "台北国際会議センター (TICC)",
    "hero_section.cta": "今すぐ登録",
  },
} as const;

export type Locale = keyof typeof messages;

declare global {
  // biome-ignore lint/style/noNamespace: Namespace is used to extend the FormatJSIntl interface
  namespace FormatjsIntl {
    interface Message {
      ids: keyof (typeof messages)["zh-TW"];
    }
  }
}
