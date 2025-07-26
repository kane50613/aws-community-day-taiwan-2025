export const messages = {
  "zh-TW": {
    "hero_section.date": "9月21日 (星期日) 上午9:30 - 下午5:30",
    "hero_section.location": "台北國際會議中心 (TICC)",
    "hero_section.cta": "立即報名",
    "hero_section.cta_subtitle": "或查看報到 QR Code",
    "register_dialog.title": "報名 AWS Community Day Taiwan 2025",
    "login_dialog_content.title": "首先，使用您的社交帳號登入",
    "login_dialog_content.description":
      "報名資訊將會記錄在您的帳號中，您可以隨時登入查看或修改",
    "register_dialog_content.title": "再來，確認您的聯絡資訊",
    "register_dialog_content.email": "電子信箱",
    "register_dialog_content.email_description": "電子信箱由社交帳號自動填入",
    "register_dialog_content.name": "全名",
    "register_dialog_content.phone": "電話號碼",
    "register_dialog_content.submit": "送出",
    "qrcode_dialog_content._title": "報到 QR Code",
    "qrcode_dialog_content._description":
      "請在活動當天出示此 QR Code 進行報到，您隨時可以回到這個頁面取得 QR Code",
  },
  en: {
    "hero_section.date": "September 21st (Sunday) 9:30 AM - 5:30 PM",
    "hero_section.location": "Taipei International Convention Center (TICC)",
    "hero_section.cta": "Register Now",
    "hero_section.cta_subtitle": "or view your check-in QR Code",
    "register_dialog.title": "Register for AWS Community Day Taiwan 2025",
    "login_dialog_content.title": "First, log in with your social account",
    "login_dialog_content.description":
      "Registration information will be recorded in your account. You can log in anytime to view or modify it.",
    "register_dialog_content.title": "Confirm Information",
    "register_dialog_content.email": "Email",
    "register_dialog_content.email_description":
      "Email is automatically filled in from your social account",
    "register_dialog_content.name": "Full Name",
    "register_dialog_content.phone": "Phone Number",
    "register_dialog_content.submit": "Submit",
    "qrcode_dialog_content._title": "Check-in QR Code",
    "qrcode_dialog_content._description":
      "Please show this QR Code for check-in on the day of the event. You can return to this page anytime to get the QR Code.",
  },
  ja: {
    "hero_section.date": "9月21日 (日) 午前9時30分 - 午後5時30分",
    "hero_section.location": "台北国際会議センター (TICC)",
    "hero_section.cta": "今すぐ登録",
    "hero_section.cta_subtitle": "またはチェックインQRコードを確認",
    "register_dialog.title": "AWS Community Day Taiwan 2025に登録",
    "login_dialog_content.title":
      "まず、ソーシャルアカウントでログインしてください",
    "login_dialog_content.description":
      "登録情報はアカウントに記録されます。いつでもログインして確認・変更できます。",
    "register_dialog_content.title": "情報確認",
    "register_dialog_content.email": "メールアドレス",
    "register_dialog_content.email_description":
      "メールアドレスはソーシャルアカウントから自動入力されます",
    "register_dialog_content.name": "氏名",
    "register_dialog_content.phone": "電話番号",
    "register_dialog_content.submit": "送信",
    "qrcode_dialog_content._title": "チェックインQRコード",
    "qrcode_dialog_content._description":
      "イベント当日にこのQRコードを提示してチェックインしてください。また、このページに戻ってQRコードを取得することもできます。",
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
