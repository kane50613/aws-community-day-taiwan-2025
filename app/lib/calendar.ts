export interface CalendarEvent {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  location: string;
  description: string;
}

export const awsCommunityDayEvent: CalendarEvent = {
  title: "AWS Community Day Taiwan 2025",
  startDate: "20250921",
  endDate: "20250921",
  startTime: "093000",
  endTime: "173000",
  timezone: "Asia/Taipei",
  location: "Taipei International Convention Center (TICC)",
  description:
    "Join us for AWS Community Day Taiwan 2025 - a full day of AWS insights, networking, and community building.",
};

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.startDate}T${event.startTime}/${event.endDate}T${event.endTime}`,
    ctz: event.timezone,
    location: event.location,
    details: event.description,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(event: CalendarEvent): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AWS Community Day Taiwan//EN",
    "BEGIN:VEVENT",
    `DTSTART;TZID=${event.timezone}:${event.startDate}T${event.startTime}`,
    `DTEND;TZID=${event.timezone}:${event.endDate}T${event.endTime}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICSFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
