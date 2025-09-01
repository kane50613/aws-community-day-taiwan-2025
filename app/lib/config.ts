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

export const sessions: {
  subtitle?: MessageId;
  title: MessageId;
  tracks: TrackId | TrackId[];
  startAt: string;
  endAt: string;
  speakers?: string[];
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
    title: "session.keynote_1",
    tracks: ["trackA", "trackB"],
    startAt: "10:00",
    endAt: "10:30",
  },
  // 10:30 - Keynote II
  {
    title: "session.keynote_2",
    tracks: ["trackA", "trackB"],
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
    title: "session.panel",
    tracks: ["trackA", "trackB"],
    startAt: "11:10",
    endAt: "12:00",
  },
  // 12:00 - Noon break / changeover
  {
    title: "session.noon_break",
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
    speakers: ["Gordon Wei"],
  },
  {
    subtitle: "session.track_b.13_00.subtitle",
    title: "session.track_b.13_00.title",
    tracks: "trackB",
    startAt: "13:00",
    endAt: "13:40",
    speakers: ["Haowen Huang"],
  },
  {
    subtitle: "session.ws_1.13_00.subtitle",
    title: "session.ws_1.13_00.title",
    tracks: "ws1",
    startAt: "13:00",
    endAt: "13:40",
    speakers: ["Luis"],
  },
  {
    title: "session.ws_2.13_00.title",
    subtitle: "session.ws_2.13_00.subtitle",
    tracks: "ws2",
    startAt: "13:00",
    endAt: "13:40",
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
    speakers: ["Clay Lu"],
  },
  {
    subtitle: "session.track_b.13_50.subtitle",
    title: "session.track_b.13_50.title",
    tracks: "trackB",
    startAt: "13:50",
    endAt: "14:30",
    speakers: ["Himanshu Sangshetti"],
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
    speakers: ["Avinash Shashikant Dalvi"],
  },
  {
    subtitle: "session.track_b.14_40.subtitle",
    title: "session.track_b.14_40.title",
    tracks: "trackB",
    startAt: "14:40",
    endAt: "15:20",
    speakers: ["鄭惠如 (RuRu)"],
  },
  {
    title: "session.ws_1.14_40.title",
    tracks: "ws1",
    startAt: "14:40",
    endAt: "15:20",
    speakers: ["Kiro"],
  },
  {
    title: "session.ws_2.14_40.title",
    tracks: "ws2",
    startAt: "14:40",
    endAt: "15:20",
  },
  // 15:20 - Break
  {
    title: "session.break",
    tracks: ["trackA", "trackB", "ws1", "ws2"],
    startAt: "15:20",
    endAt: "15:30",
  },
  // 15:30 - Track A: Kubernetes Isekai, Track B: Create trading book
  {
    subtitle: "session.track_a.15_30.subtitle",
    title: "session.track_a.15_30.title",
    tracks: "trackA",
    startAt: "15:30",
    endAt: "16:10",
    speakers: ["Chun Yin", "Cyrus Wong"],
  },
  {
    title: "session.track_b.15_30.title",
    tracks: "trackB",
    startAt: "15:30",
    endAt: "16:10",
    speakers: ["Danny Chan"],
  },
];

export type Session = (typeof sessions)[number];
