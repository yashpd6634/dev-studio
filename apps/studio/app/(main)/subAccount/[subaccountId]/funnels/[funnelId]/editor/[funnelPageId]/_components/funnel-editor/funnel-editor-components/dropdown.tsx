"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { EditorBtns } from "@repo/ui/lib/constant";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  EditorElement,
  useEditor,
} from "@repo/ui/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash, UserPlus } from "lucide-react";

import React, { useMemo, useRef } from "react";

type Props = {
  element: EditorElement;
};

const DropdownComponent = (props: Props) => {
  const { dispatch, state } = useEditor();

  const roleStyles = props.element.roleStyles;

  const getRoleStyle = (role: string) => {
    if (props.element.id) {
      return roleStyles?.[role] ?? "";
    } else return "";
  };

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const styles = props.element.styles;

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const keyValuePairs = !Array.isArray(props.element.content)
    ? props.element.content.dropdownSettings?.keyValuePairs || []
    : [];

  const activeTab = !Array.isArray(props.element.content)
    ? props.element.content.dropdownSettings?.activeTab || "menu"
    : "";

  const dropdownLabel = !Array.isArray(props.element.content)
    ? props.element.content.dropdownSettings?.label || ""
    : "";

  const dropdownTriggerName = !Array.isArray(props.element.content)
    ? props.element.content.dropdownSettings?.triggerName || "Open"
    : "";

  return (
    <div
      id={props.element.id}
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "dropdown")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,

          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        },
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {!Array.isArray(props.element.content) && (
        // (state.editor.previewMode || state.editor.liveMode) &&
        <DropdownMenu>
          <DropdownMenuTrigger
            className={getRoleStyle("dropdown-menu-trigger")}
            asChild
          >
            <Button variant="outline">{dropdownTriggerName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={getRoleStyle("dropdown-menu-content")}
          >
            {dropdownLabel && (
              <>
                <DropdownMenuLabel
                  className={getRoleStyle("dropdown-menu-label")}
                >
                  {dropdownLabel}
                </DropdownMenuLabel>
                <DropdownMenuSeparator
                  className={getRoleStyle("dropdown-menu-separator")}
                />
              </>
            )}
            {activeTab === "menu" && (
              <>
                <DropdownMenuGroup
                  className={getRoleStyle("dropdown-menu-group")}
                >
                  {keyValuePairs.map((pair) =>
                    pair.subMenu && pair.subMenu.length > 0 ? (
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                          className={getRoleStyle("dropdown-menu-sub-trigger")}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          <span>{pair.key}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent
                            className={getRoleStyle(
                              "dropdown-menu-sub-content",
                            )}
                          >
                            {pair.subMenu.map((sub, subIndex) => (
                              <DropdownMenuItem
                                key={sub.key}
                                className={getRoleStyle(
                                  "dropdown-menu-sub-item",
                                )}
                              >
                                <span>{sub.value}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem
                        key={pair.key}
                        textValue={pair.value}
                        className={getRoleStyle("dropdown-menu-item")}
                      >
                        <span>{pair.key}</span>
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuGroup>
              </>
            )}
            {activeTab === "checkbox" && (
              <>
                {keyValuePairs.map((pair) => (
                  <DropdownMenuCheckboxItem
                    // checked={showStatusBar}
                    // onCheckedChange={setShowStatusBar}
                    key={pair.key}
                    textValue={pair.value}
                  >
                    {pair.key}
                  </DropdownMenuCheckboxItem>
                ))}
              </>
            )}
            {activeTab === "radio" && (
              <DropdownMenuRadioGroup
              // value={selectedRadio}
              // onValueChange={handleRadioChange}
              >
                {keyValuePairs.map((pair) => (
                  <DropdownMenuRadioItem key={pair.key} value={pair.value!}>
                    {pair.key} {/* Use the key as the label */}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {/* {!state.editor.previewMode && !state.editor.liveMode && (
        <span
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElement = e.target as HTMLSpanElement;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...props.element,
                  content: {
                    innerText: spanElement.innerText,
                  },
                },
              },
            });
          }}
        >
          {!Array.isArray(props.element.content) &&
            props.element.content.innerText}
        </span>
      )} */}
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-bluePrimary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default DropdownComponent;
