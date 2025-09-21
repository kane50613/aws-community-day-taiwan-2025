import { useAtomValue } from "jotai";
import { Fragment, useEffect, useMemo, useState } from "react";
import { trackAtom } from "~/components/index/sessions-section";
import { type Session, sessions } from "~/lib/config";
import { Separator } from "../ui/separator";
import { BreakTimeCard } from "./break-time-card";
import { SessionCard } from "./session-card";

export function SessionsList() {
  const track = useAtomValue(trackAtom);

  const filteredSessionGroupByStartTime = useMemo(() => {
    // Filter sessions by track
    const filteredSessions =
      track === "all"
        ? sessions
        : sessions.filter((session) => session.tracks.includes(track));

    // Group sessions by start time
    const sessionGroups = filteredSessions.reduce(
      (acc, session) => {
        const startTime = session.startAt;

        if (!acc[startTime]) acc[startTime] = [];

        acc[startTime].push(session);

        return acc;
      },
      {} as Record<string, Session[]>,
    );

    const entries = Object.entries(sessionGroups);

    // Add showSeparator flag to each group
    return Object.fromEntries(
      entries.map(([startTime, sessions], index) => {
        const nextEntry = entries[index + 1];
        const nextSessionsAreBreaks = nextEntry?.[1]?.every(
          (session) => session.title === "session.break",
        );

        return [
          startTime,
          {
            sessions,
            showSeparator: !nextSessionsAreBreaks,
          },
        ];
      }),
    );
  }, [track]);

  return (
    <div>
      {Object.entries(filteredSessionGroupByStartTime).map(
        ([startTime, config]) => (
          <SessionTimeList key={startTime} startTime={startTime} {...config} />
        ),
      )}
    </div>
  );
}

function SessionTimeList({
  startTime,
  sessions,
  showSeparator,
}: {
  startTime: string;
  sessions: Session[];
  showSeparator: boolean;
}) {
  const [isCurrentSession, setIsCurrentSession] = useState(false);

  useEffect(() => {
    const checkIfCurrentSession = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight

      // Find if any session at this start time is currently happening
      const currentSession = sessions.find((session) => {
        if (session.title === "session.break") return false; // Skip breaks

        const [startHour, startMinute] = session.startAt.split(":").map(Number);
        const [endHour, endMinute] = session.endAt.split(":").map(Number);

        const startTimeMinutes = startHour * 60 + startMinute;
        const endTimeMinutes = endHour * 60 + endMinute;

        return currentTime >= startTimeMinutes && currentTime < endTimeMinutes;
      });

      setIsCurrentSession(!!currentSession);
    };

    checkIfCurrentSession();

    const interval = setInterval(checkIfCurrentSession, 5000);

    return () => clearInterval(interval);
  }, [sessions]);

  const firstSession = sessions[0];
  const isBreakTime = firstSession?.title === "session.break";

  if (isBreakTime) {
    return (
      <BreakTimeCard
        startTime={firstSession.startAt}
        endTime={firstSession.endAt}
      />
    );
  }

  return (
    <div className="space-y-8 py-4 px-8">
      <div className="relative w-fit">
        <p className="text-[1.5em] text-foreground/75">{startTime}</p>
        {isCurrentSession && (
          <div className="absolute top-0 -right-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-8">
        {sessions.map((session, index) => (
          <Fragment key={session.title}>
            <SessionCard session={session} />
            {index !== sessions.length - 1 && (
              <Separator className="bg-border/50" />
            )}
          </Fragment>
        ))}
      </div>
      {showSeparator && <Separator />}
    </div>
  );
}
