import { FormattedMessage } from "react-intl";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useEnrollment } from "~/lib/api/get-enrollment";
import { useUser } from "~/lib/api/get-user";
import { Progress } from "../ui/progress";
import { LoginDialogContent } from "./login-dialog-content";
import { QRCodeDialogContent } from "./qrcode-dialog-content";
import { RegisterDialogContent } from "./register-dialog-content";

export function RegisterDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const step = useStep();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-8 max-w-md w-full">
        <div className="pr-8 flex gap-4 items-center">
          <p className="whitespace-nowrap text-sm">{step} / 3</p>
          <Progress value={Math.round(step * 33.33)} />
        </div>
        <DialogInner />
      </DialogContent>
    </Dialog>
  );
}

export function useStep() {
  const { data: user } = useUser();
  const { data: enrollment } = useEnrollment();

  if (!user) return 1;

  if (!enrollment) return 2;

  return 3;
}

function DialogInner() {
  const step = useStep();

  const { isLoading: isUserLoading } = useUser();
  const { isLoading: isEnrollmentLoading } = useEnrollment();

  if (isEnrollmentLoading || isUserLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>
          <FormattedMessage id="register_dialog.loading" />
        </p>
      </div>
    );
  }

  switch (step) {
    case 1:
      return <LoginDialogContent />;
    case 2:
      return <RegisterDialogContent />;
    case 3:
      return <QRCodeDialogContent />;
    default:
      step satisfies never;
  }
}
