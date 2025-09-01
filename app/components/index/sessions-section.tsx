import { atom } from "jotai";
import { FormattedMessage } from "react-intl";
import { SessionsList } from "~/components/session/sessions-list";
import { TrackTabs } from "~/components/session/track-tabs";
import type { TrackId } from "~/lib/config";

export const trackAtom = atom<TrackId | "all">("all");

export function SessionsSection() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-semibold px-8 my-8">
        <FormattedMessage id="session_section.title" />
      </h2>
      <TrackTabs className="mb-8" />
      <SessionsList />
    </div>
  );
}
