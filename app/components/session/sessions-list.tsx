import { useAtomValue } from "jotai";
import { Fragment, useMemo } from "react";
import { trackAtom } from "~/components/index/sessions-section";
import { type Session, sessions } from "~/lib/config";
import { Separator } from "../ui/separator";
import { SessionCard } from "./session-card";

export function SessionsList() {
  const track = useAtomValue(trackAtom);

  const filteredSessionGroupByStartTime = useMemo(() => {
    const filteredSessions =
      track === "all"
        ? sessions
        : sessions.filter((session) => session.tracks.includes(track));

    return filteredSessions.reduce(
      (acc, session) => {
        const startTime = session.startAt;

        if (!acc[startTime]) {
          acc[startTime] = [];
        }

        acc[startTime].push(session);

        return acc;
      },
      {} as Record<string, Session[]>,
    );
  }, [track]);

  return (
    <div>
      {Object.entries(filteredSessionGroupByStartTime).map(
        ([startTime, sessions]) => (
          <div key={startTime} className="space-y-8 py-4 px-8">
            <p className="text-[1.5em]">{startTime}</p>
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
            <Separator />
          </div>
        ),
      )}
    </div>
  );
}
