import { useAtom } from "jotai";
import { FormattedMessage } from "react-intl";
import { type TrackId, tracks } from "~/lib/config";
import { cn } from "~/lib/utils";
import { trackAtom } from "../index/sessions-section";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function TrackTabs({ className }: { className?: string }) {
  const [track, setTrack] = useAtom(trackAtom);

  return (
    <Tabs
      value={track}
      onValueChange={(value) => setTrack(value as TrackId)}
      className={cn("sticky top-4 w-full overflow-x-auto px-5 z-50", className)}
    >
      <TabsList>
        <TabsTrigger value="all">
          <FormattedMessage id="session.session_tab.all" />
        </TabsTrigger>
        {tracks.map((track) => (
          <TabsTrigger key={track.id} value={track.id}>
            <FormattedMessage id={track.name} />
            {track.room && (
              <span className="text-sm text-gray-500">{track.room}</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
