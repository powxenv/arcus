import { Modal, buttonVariants } from "@heroui/react";
import type { AssessmentProgress } from "../lib/assessment-progress";
import { ASSESSMENTS } from "./assessment-data";

export function ResumeModal({
  progress,
  open,
  onContinue,
  onStartOver,
}: {
  progress: AssessmentProgress | null;
  open: boolean;
  onContinue: () => void;
  onStartOver: () => void;
}) {
  const assessment = progress ? ASSESSMENTS[progress.assessmentKey] : null;
  const answeredCount = progress ? Object.keys(progress.answers).length : 0;
  const total = progress?.total ?? 0;

  return (
    <Modal isOpen={open} onOpenChange={(open) => !open && onStartOver()}>
      <Modal.Backdrop>
        <Modal.Container size="md" placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Pick up where you left off?</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              {assessment ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <img className="size-12 shrink-0" src={assessment.icon} alt="" />
                    <div>
                      <p className="font-semibold text-default-900">
                        {assessment.name}
                      </p>
                      <p className="text-sm text-default-500 mt-1">
                        {answeredCount} of {total} questions answered
                      </p>
                    </div>
                  </div>
                  <p className="text-default-600 leading-relaxed">
                    We saved your progress on this device. You can continue from
                    where you stopped, or clear it and start fresh.
                  </p>
                </div>
              ) : (
                <p className="text-default-600 leading-relaxed">
                  We found unfinished progress on this device.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className={buttonVariants({ variant: "ghost" })}
                onClick={onStartOver}
              >
                Start over
              </button>
              <button
                type="button"
                className={buttonVariants()}
                onClick={onContinue}
                disabled={!assessment}
              >
                Continue
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
