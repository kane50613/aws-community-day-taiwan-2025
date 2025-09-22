import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { type Session, tracks } from "~/lib/config";
import { cn } from "~/lib/utils";
import { SessionSpeaker } from "./session-speaker";

export function SessionCard({ session }: { session: Session }) {
  const trackIds =
    typeof session.tracks === "string" ? [session.tracks] : session.tracks;

  const trackMessageIds = trackIds.map(
    (trackId) => tracks.find((track) => track.id === trackId)?.name,
  );

  return (
    <div
      id={`session-${session.startAt}-${session.title}`}
      className="flex flex-col gap-4 sm:grid grid-cols-4 w-full min-h-[3em] text-2xl relative"
    >
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2",
          session.speakers ? "col-span-2" : "col-span-3",
        )}
      >
        {session.subtitle && (
          <p className="text-[0.875em] text-foreground/75 font-normal flex items-center text-center justify-center">
            # <FormattedMessage id={session.subtitle} />
          </p>
        )}
        <p className="font-medium text-balance">
          <FormattedMessage id={session.title} />
        </p>
      </div>
      {session.speakers && (
        <div className="flex flex-col gap-2">
          {session.speakers.map((speaker) => (
            <SessionSpeaker key={speaker.name} speaker={speaker} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2 sm:justify-center sm:text-end text-balance text-foreground/75 text-[0.75em] sm:text-[0.875em]">
        <p>
          {session.startAt} - {session.endAt}
        </p>
        <p>
          {trackMessageIds.map((trackMessageId, index) => {
            const trackId = trackIds[index];
            const track = tracks.find((t) => t.id === trackId);
            return (
              <Fragment key={trackMessageId}>
                <FormattedMessage id={trackMessageId} />
                {track?.room && (
                  <span className="text-sm text-gray-500 pl-2">
                    {track.room}
                  </span>
                )}
                {index !== trackMessageIds.length - 1 && " / "}
              </Fragment>
            );
          })}
        </p>
      </div>
    </div>
  );
}
