import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import React, { useEffect, useState } from "react";
import { getRoles } from "./component-roles";
import { useEditor } from "@repo/ui/providers/editor/editor-provider";

type Props = {
  onSaveStyles: (role: string, css: string) => void;
};

const RoleBasedStyleEditor = ({ onSaveStyles }: Props) => {
  const { state, dispatch } = useEditor();

  const availableRoles = getRoles(state.editor.selectedElement.type);

  // Initialize state
  const [selectedRole, setSelectedRole] = useState(availableRoles[0] || "");
  const [css, setCss] = useState(
    state.editor.selectedElement.roleStyles?.[selectedRole] ?? "",
  );

  useEffect(() => {
    const firstRole = availableRoles[0] || "";
    setSelectedRole(firstRole);
    setCss(state.editor.selectedElement.roleStyles?.[firstRole] ?? "");
  }, [state.editor.selectedElement, availableRoles]);

  const handleSave = () => {
    onSaveStyles(selectedRole, css);
  };

  return (
    <div className="role-editor flex flex-col gap-4">
      <div>
        <Label>Select Role:</Label>
        <Select
          value={selectedRole}
          onValueChange={(e) => {
            setSelectedRole(e);
            setCss(state.editor.selectedElement.roleStyles?.[e] ?? "");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={css}
        onChange={(e) => setCss(e.target.value)}
        placeholder={`Enter CSS for ${selectedRole}`}
        className="css-input"
      />
      <Button onClick={handleSave}>Save Styles</Button>
    </div>
  );
};

export default RoleBasedStyleEditor;
