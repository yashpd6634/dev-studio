import BlurPage from "@repo/ui/components/global/blur-page";
import { getMedia } from "@repo/ui/lib/queries";
import React from "react";
import MediaComponent from "@repo/ui/components/media/index";

type Props = {
  params: { subaccountId: string };
};

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId);

  return (
    <BlurPage>
      <MediaComponent data={data} subAccountId={params.subaccountId} />
    </BlurPage>
  );
};

export default MediaPage;
