import BlurPage from "@repo/ui/components/global/blur-page";
import React from "react";

const PipelinesLayout = ({ children }: { children: React.ReactNode }) => {
  return <BlurPage>{children}</BlurPage>;
};

export default PipelinesLayout;
