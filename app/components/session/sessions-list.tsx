import { useAtomValue } from "jotai";
import { Fragment, useMemo } from "react";
import { trackAtom } from "~/components/index/sessions-section";
import { type Session, sessions } from "~/lib/config";
import { Separator } from "../ui/separator";
import { SessionCard } from "./session-card";
import { BreakTimeCard } from "./break-time-card";

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
    <div key={startTime} className="space-y-8 py-4 px-8">
      <p className="text-[1.5em] text-foreground/75">{startTime}</p>
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
