import { FormattedMessage } from "react-intl";
import QRCode from "react-qr-code";
import { useEnrollment } from "~/lib/api/get-enrollment";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import {
  awsCommunityDayEvent,
  generateGoogleCalendarUrl,
  generateICSContent,
  downloadICSFile,
} from "~/lib/calendar";
import { Separator } from "../ui/separator";
import googleCalendar from "~/assets/google-calendar.svg";

export function QRCodeDialogContent() {
  const { data: enrollment } = useEnrollment();

  const handleAddToGoogleCalendar = () => {
    const googleCalendarUrl = generateGoogleCalendarUrl(awsCommunityDayEvent);
    window.open(googleCalendarUrl, "_blank");
  };

  const handleDownloadICS = () => {
    const icsContent = generateICSContent(awsCommunityDayEvent);
    downloadICSFile(icsContent, "aws-community-day-taiwan-2025.ics");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <FormattedMessage id="qrcode_dialog_content._title" />
        </DialogTitle>
        <DialogDescription>
          <FormattedMessage id="qrcode_dialog_content._description" />
        </DialogDescription>
      </DialogHeader>
      {enrollment && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <QRCode value={enrollment.code} size={152} />
          </div>
          <Separator />
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleAddToGoogleCalendar}
              variant="outline"
              className="flex items-center gap-2"
            >
              <img
                src={googleCalendar}
                alt="Google Calendar"
                className="h-4 w-4"
              />
              <FormattedMessage id="qrcode_dialog_content.add_to_google_calendar" />
            </Button>
            <Button
              onClick={handleDownloadICS}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <FormattedMessage id="qrcode_dialog_content.download_ics" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
