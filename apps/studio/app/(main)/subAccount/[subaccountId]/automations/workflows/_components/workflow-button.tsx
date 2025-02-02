"use client";
import Workflowform from "@repo/ui/components/forms/workflow-form";
import CustomModal from "@repo/ui/components/global/custom-modal";
import { Button } from "@repo/ui/components/ui/button";
import { useBilling } from "@repo/ui/providers/billing-provider";
import { useModal } from "@repo/ui/providers/modal-provider";
import { Plus } from "lucide-react";
import React from "react";

type Props = {};

const WorkflowButton = (props: Props) => {
  const { setOpen, setClose } = useModal();
  const { credits } = useBilling();

  const handleClick = () => {
    setOpen(
      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are a powerfull that help you automate tasks."
      >
        <Workflowform />
      </CustomModal>,
    );
  };

  return (
    <Button
      size={"icon"}
      {...(credits !== "0"
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
  );
};

export default WorkflowButton;
