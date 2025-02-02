"use client";
import { CustomModal2 } from "@repo/ui/components/global/custom-modal";
import { Button } from "@repo/ui/components/ui/button";
import { useModal } from "@repo/ui/providers/modal-provider";
import ContactUserForm from "@repo/ui/components/forms/contact-user-form";
import React from "react";

type Props = {
  subaccountId: string;
};

const CreateContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal2
        title="Create Or Update Contact information"
        subheading="Contacts are like customers."
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal2>,
    );
  };

  return <Button onClick={handleCreateContact}>Create Contact</Button>;
};

export default CreateContactButton;
