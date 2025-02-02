"use client";

import {
  AutomationEditorActions,
  AutomationEditorNodeType,
} from "@repo/ui/lib/types";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type AutomationEditorNode = AutomationEditorNodeType;

export type AutomationEditor = {
  elements: AutomationEditorNode[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
  selectedNode: AutomationEditorNodeType;
};

export type HistoryState = {
  history: AutomationEditor[];
  currentIndex: number;
};

export type AutomationEditorState = {
  editor: AutomationEditor;
  history: HistoryState;
};

const initialEditorState: AutomationEditorState["editor"] = {
  elements: [],
  selectedNode: {
    data: {
      completed: false,
      current: false,
      description: "",
      metadata: {},
      title: "",
      type: "Trigger",
    },
    id: "",
    position: { x: 0, y: 0 },
    type: "Trigger",
  },
  edges: [],
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: AutomationEditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const editorReducer = (
  state: AutomationEditorState = initialState,
  action: AutomationEditorActions,
): AutomationEditorState => {
  switch (action.type) {
    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex]! };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex]! };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;

    case "LOAD_DATA":
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: action.payload.elements || initialEditorState.elements,
          edges: action.payload.edges,
        },
      };
    case "SELECTED_ELEMENT":
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedNode: action.payload.element,
        },
      };
    default:
      return state;
  }
};

export type AutomationEditorContextData = {
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
};

export const AutomationEditorContext = createContext<{
  state: AutomationEditorState;
  dispatch: Dispatch<AutomationEditorActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

type AutomationEditorProps = {
  children: React.ReactNode;
};

const AutomationEditorProvider = (props: AutomationEditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <AutomationEditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AutomationEditorContext.Provider>
  );
};

export const useAutomationEditor = () => {
  const context = useContext(AutomationEditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default AutomationEditorProvider;
