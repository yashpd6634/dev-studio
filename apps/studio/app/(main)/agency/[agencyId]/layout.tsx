import { currentUser } from "@clerk/nextjs";
import Sidebar from "@repo/ui/components/sidebar-2.tsx/index";
import Unauthorized from "@repo/ui/components/unauthorized/index";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@repo/ui/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import BlurPage from "@repo/ui/components/global/blur-page";
import InfoBar from "@repo/ui/components/global/infobar";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/agency");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <Unauthorized />;

  let allNoti: any = [];
  const notification = await getNotificationAndUser(agencyId);
  if (notification) allNoti = notification;

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar notifications={allNoti} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default layout;
