import { FormattedMessage } from "react-intl";
import QRCode from "react-qr-code";
import { useEnrollment } from "~/lib/api/get-enrollment";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export function QRCodeDialogContent() {
  const { data: enrollment } = useEnrollment();

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
        <div className="flex justify-center">
          <QRCode value={enrollment.code} size={256} />
        </div>
      )}
    </>
  );
}
