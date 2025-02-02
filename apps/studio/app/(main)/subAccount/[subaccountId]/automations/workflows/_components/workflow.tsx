"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@repo/ui/components/ui/label";
import { Switch } from "@repo/ui/components/ui/switch";
import { toast } from "sonner";
import { onFlowPublish } from "../_actions/workflow-connections";

type Props = {
  name: string;
  description: string;
  id: string;
  publish: boolean | null;
  subaccuontId: string;
};

const Workflow = ({ description, id, name, publish, subaccuontId }: Props) => {
  const [isPublish, setIsPublish] = useState<boolean>(
    publish == null ? false : publish == false ? false : true,
  );
  const handleClick =
    (id: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      const isChecked = event.currentTarget.ariaChecked === "false";
      const response = await onFlowPublish(id, isChecked);
      if (response) {
        toast.message(response);
        setIsPublish(isChecked);
      }
    };

  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Link
          href={`/subaccount/${subaccuontId}/automations/workflows/editor/${id}`}
        >
          <div className="flex flex-row gap-2">
            <Image
              src="/googleDrive.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/notion.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/discord.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className="text-muted-foreground">
          {isPublish ? "On" : "Off"}
        </Label>
        <Switch
          id="airplane-mode"
          onClick={handleClick(id)}
          defaultChecked={isPublish}
        />
      </div>
    </Card>
  );
};

export default Workflow;
