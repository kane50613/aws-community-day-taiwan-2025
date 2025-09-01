import { FormattedMessage } from "react-intl";
import { Separator } from "../ui/separator";

export function BreakTimeCard({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  return (
    <div className="flex gap-4 justify-center items-center w-full my-8 whitespace-nowrap overflow-hidden">
      <Separator />
      <FormattedMessage id="session.break" />
      <span className="text-foreground/75 font-normal">
        {startTime} - {endTime}
      </span>
      <Separator />
    </div>
  );
}
