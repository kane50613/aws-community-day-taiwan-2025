import type { MessageId } from "./i18n";

export type TrackId = (typeof tracks)[number]["id"];

export const tracks = [
  {
    id: "trackA",
    name: "session.track_a.title",
    room: "201BC",
  },
  {
    id: "trackB",
    name: "session.track_b.title",
    room: "202DE",
  },
  {
    id: "ws1",
    name: "session.workshop_1.title",
    room: "201A",
  },
  {
    id: "ws2",
    name: "session.workshop_2.title",
    room: "201F",
  },
] as const satisfies {
  id: string;
  name: MessageId;
  room: string;
}[];

export type Speaker = {
  name: string;
  title?: string;
  link?: Link[];
  image?: string;
};

export type Link = {
  type: "linkedin" | "website";
  url: string;
};

export const sessions: {
  subtitle?: MessageId;
  title: MessageId;
  tracks: TrackId | TrackId[];
  startAt: string;
  endAt: string;
  speakers?: Speaker[];
}[] = [
  // 09:30 - Check-in
  {
    title: "session.check_in",
    tracks: ["trackA", "trackB"],
    startAt: "09:30",
    endAt: "10:00",
  },
  // 10:00 - Keynote I
  {
    subtitle: "session.keynote_1.subtitle",
    title: "session.keynote_1.title",
    tracks: ["trackA", "trackB"],
    speakers: [
      {
        name: "Chia-liang Kao",
        title: "CEO @ Recce",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/clkao/",
          },
        ],
      },
    ],
    startAt: "10:00",
    endAt: "10:30",
  },
  // 10:30 - Keynote II
  {
    title: "session.keynote_2.title",
    tracks: ["trackA", "trackB"],
    speakers: [
      {
        name: "Kim",
        title: "Manager Solutions Architecture, AWS",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/kimkao/",
          },
        ],
      },
    ],
    startAt: "10:30",
    endAt: "11:00",
  },
  // 11:00 - Break
  {
    title: "session.break",
    tracks: ["trackA", "trackB"],
    startAt: "11:00",
    endAt: "11:10",
  },
  // 11:10 - Panel
  {
    title: "session.track_a.11_10.title",
    subtitle: "session.track_a.11_10.subtitle",
    tracks: ["trackA", "trackB"],
    speakers: [
      {
        name: "Tse Chuan, Hsu",
        title:
          "Associate Professor. Soochow University Department of Computer Science and Information Management",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/tsechuanhsu/",
          },
        ],
      },
      {
        name: "Shiun Chiu",
        title: "AWS Community Builder",
        link: [
          {
            type: "website",
            url: "https://shiun.me/",
          },
        ],
      },
    ],
    startAt: "11:10",
    endAt: "12:00",
  },
  {
    title: "session.break",
    tracks: ["trackA", "trackB"],
    startAt: "12:00",
    endAt: "13:00",
  },
  // 13:00 - Track A: AWS Organizations..., Track B: Agentic AI..., WS1: Netflix..., WS2: Building Legal Intelligence
  {
    title: "session.track_a.13_00.title",
    tracks: "trackA",
    startAt: "13:00",
    endAt: "13:40",
    speakers: [
      {
        name: "Gordon Wei",
        title: "iKala Cloud",
        link: [
          {
            type: "website",
            url: "https://www.kmp.tw/",
          },
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/gordon-wei-a955906b/",
          },
        ],
      },
    ],
  },
  {
    subtitle: "session.track_b.13_00.subtitle",
    title: "session.track_b.13_00.title",
    tracks: "trackB",
    startAt: "13:00",
    endAt: "13:40",
    speakers: [
      {
        name: "Haowen Huang",
        title: "Amazon",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/haowenhuang/",
          },
        ],
      },
    ],
  },
  {
    subtitle: "session.ws_1.13_00.subtitle",
    title: "session.ws_1.13_00.title",
    tracks: "ws1",
    startAt: "13:00",
    endAt: "13:40",
    speakers: [
      {
        name: "劉國強",
      },
    ],
  },
  {
    title: "session.ws_2.13_00.title",
    subtitle: "session.ws_2.13_00.subtitle",
    tracks: "ws2",
    startAt: "13:00",
    endAt: "13:40",
    speakers: [
      {
        name: "Mohamed Nizzad",
        title: "Algorvation (Pvt) Ltd",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/mohamednizzad/",
          },
        ],
      },
    ],
  },
  // 13:40 - Break
  {
    title: "session.break",
    tracks: ["trackA", "trackB", "ws1", "ws2"],
    startAt: "13:40",
    endAt: "13:50",
  },
  // 13:50 - Track A: My journey..., Track B: Scaling RAG...
  {
    title: "session.track_a.13_50.title",
    tracks: "trackA",
    startAt: "13:50",
    endAt: "14:30",
    speakers: [
      {
        name: "Clay Lu",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/yu-hsuan-lu-a8b9527a/",
          },
        ],
      },
    ],
  },
  {
    subtitle: "session.track_b.13_50.subtitle",
    title: "session.track_b.13_50.title",
    tracks: "trackB",
    startAt: "13:50",
    endAt: "14:30",
    speakers: [
      {
        name: "Himanshu Sangshetti",
        title: "ZS",
        link: [
          {
            type: "linkedin",
            url: "https://in.linkedin.com/in/himanshu-sangshetti/",
          },
        ],
      },
    ],
  },
  // 14:30 - Break
  {
    title: "session.break",
    tracks: ["trackA", "trackB", "ws1", "ws2"],
    startAt: "14:30",
    endAt: "14:40",
  },
  // 14:40 - Track A: Designing Resilient..., Track B: Amazon Q, WS1: Kiro, WS2: (Workshop)
  {
    title: "session.track_a.14_40.title",
    tracks: "trackA",
    startAt: "14:40",
    endAt: "15:20",
    speakers: [
      {
        name: "Avinash Shashikant Dalvi",
        title: "Nushift Technologies",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/avinash-dalvi-315b021a/",
          },
        ],
      },
    ],
  },
  {
    subtitle: "session.track_b.14_40.subtitle",
    title: "session.track_b.14_40.title",
    tracks: "trackB",
    startAt: "14:40",
    endAt: "15:20",
    speakers: [
      {
        name: "鄭惠如 (RuRu)",
        title: "AI DataBrushing Technology Co., Ltd.",
        link: [
          {
            type: "website",
            url: "https://www.facebook.com/share/1EBtcBC4o7/",
          },
        ],
      },
    ],
  },
  {
    title: "session.ws_1.14_40.title",
    tracks: "ws1",
    startAt: "14:40",
    endAt: "15:20",
    speakers: [
      {
        name: "Scott Liao",
        title: "Amazon Web Services",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/shazi7804/",
          },
        ],
      },
    ],
  },
  // 15:20 - Break
  {
    title: "session.break",
    tracks: ["trackA", "trackB", "ws1", "ws2"],
    startAt: "15:20",
    endAt: "15:30",
  },
  {
    title: "session.track_b.15_30.title",
    tracks: "trackB",
    startAt: "15:30",
    endAt: "16:10",
    speakers: [
      {
        name: "Danny Chan",
        title: "AWS Community Builder",
        link: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/danny-code/",
          },
        ],
      },
    ],
  },
];

export type Session = (typeof sessions)[number];
