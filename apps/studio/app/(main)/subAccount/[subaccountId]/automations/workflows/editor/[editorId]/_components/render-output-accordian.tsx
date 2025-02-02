import { ConnectionProviderProps } from "@repo/ui/providers/connections-provider";
import { AutomationEditorState } from "@repo/ui/providers/editor-provider";
import { useAutomationStore } from "@repo/store/automation/automation-store";
import React from "react";
import ContentBasedOnTitle from "./content-based-on-title";

type Props = {
  state: AutomationEditorState;
  nodeConnection: ConnectionProviderProps;
};

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useAutomationStore();
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
};

export default RenderOutputAccordion;
