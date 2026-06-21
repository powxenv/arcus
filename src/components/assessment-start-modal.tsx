import { Link } from "@tanstack/react-router";
import { Button, Modal, buttonVariants } from "@heroui/react";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import type { AssessmentData } from "./assessment-data";

export function AssessmentStartModal({
  assessment,
  triggerLabel = "Start",
  triggerClassName,
}: {
  assessment: AssessmentData;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  return (
    <Modal>
      <Modal.Trigger>
        <Button className={triggerClassName} variant="outline">
          <SolarPlayLineDuotone />
          {triggerLabel}
        </Button>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container size="lg" placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Start {assessment.shortName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <img
                    className="size-12 shrink-0"
                    src={assessment.icon}
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-default-900">
                      {assessment.name}
                    </p>
                    <p className="text-sm text-default-500 mt-1">
                      {assessment.domain}
                    </p>
                  </div>
                </div>

                <p className="text-default-600 leading-relaxed">
                  {assessment.overview}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-default-50 rounded-xl border-[.5px] border-default-200 p-4">
                    <p className="text-sm text-default-400">Questions</p>
                    <p className="font-bold mt-1">{assessment.questionCount}</p>
                  </div>
                  <div className="bg-default-50 rounded-xl border-[.5px] border-default-200 p-4">
                    <p className="text-sm text-default-400">Time</p>
                    <p className="font-bold mt-1">{assessment.duration}</p>
                  </div>
                </div>

                <div className="bg-default-50 rounded-xl border-[.5px] border-default-200 p-4">
                  <p className="font-semibold text-default-800">
                    {assessment.question}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Link
                to="/assessment/$key/take"
                params={{ key: assessment.key }}
                className={buttonVariants()}
              >
                Begin
                <SolarArrowRightLineDuotone />
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
