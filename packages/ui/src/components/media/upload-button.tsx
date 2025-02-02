"use client";
import { useModal } from "@repo/ui/providers/modal-provider";
import React from "react";
import { Button } from "../ui/button";
import { CustomModal2 } from "../global/custom-modal";
import UploadMediaForm from "../forms/upload-media";

type Props = {
  subaccountId: string;
};

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal2
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal2>,
        );
      }}
    >
      Upload
    </Button>
  );
};

export default MediaUploadButton;
