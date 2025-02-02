import { ConnectionsProvider } from "@repo/ui/providers/connections-provider";
import AutomationEditorProvider from "@repo/ui/providers/editor-provider";
import React from "react";
import EditorCanvas from "./_components/editor-canvas";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <AutomationEditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </AutomationEditorProvider>
    </div>
  );
};

export default Page;
