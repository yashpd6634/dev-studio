import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsTrigger,
  TabsList,
  TabsContent,
} from "@repo/ui/components/ui/tabs";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { CirclePlus, Trash2 } from "lucide-react";
import {
  dropdownSettings,
  useEditor,
} from "@repo/ui/providers/editor/editor-provider";

type Props = {};

const DropdownSettings = (props: Props) => {
  const { state, dispatch } = useEditor();

  // Consolidated form state
  const [formData, setFormData] = useState<dropdownSettings>({
    keyValuePairs: [{ key: "", value: "", subMenu: [] }],
    label: "Pedro Duarte",
    triggerName: "Pedro Duarte",
    activeTab: "menu",
  });

  const handleAddPair = () => {
    setFormData({
      ...formData,
      keyValuePairs: [
        ...formData.keyValuePairs!,
        { key: "", value: "", subMenu: [] },
      ],
    });
  };

  const handleKeyValueChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updatedPairs = formData.keyValuePairs!.map((pair, i) =>
      i === index ? { ...pair, [field]: value } : pair,
    );
    setFormData({ ...formData, keyValuePairs: updatedPairs });
  };

  const handleSubMenuChange = (
    menuIndex: number,
    subMenuIndex: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updatedPairs = formData.keyValuePairs!.map((pair, i) => {
      if (i === menuIndex && pair.subMenu) {
        const updatedSubMenu = pair.subMenu.map((sub, subIndex) =>
          subIndex === subMenuIndex ? { ...sub, [field]: value } : sub,
        );
        return { ...pair, subMenu: updatedSubMenu };
      }
      return pair;
    });
    setFormData({ ...formData, keyValuePairs: updatedPairs });
  };

  const handleAddSubMenu = (index: number) => {
    const updatedPairs = formData.keyValuePairs!.map((pair, i) =>
      i === index
        ? {
            ...pair,
            subMenu: [...(pair.subMenu || []), { key: "", value: "" }],
          }
        : pair,
    );
    setFormData({ ...formData, keyValuePairs: updatedPairs });
  };

  const handleDeletePair = (index: number) => {
    const updatedPairs = formData.keyValuePairs!.filter((_, i) => i !== index);
    setFormData({ ...formData, keyValuePairs: updatedPairs });
  };

  const handleDeleteSubMenu = (menuIndex: number, subMenuIndex: number) => {
    const updatedPairs = formData.keyValuePairs!.map((pair, i) => {
      if (i === menuIndex && pair.subMenu) {
        const updatedSubMenu = pair.subMenu.filter(
          (_, subIndex) => subIndex !== subMenuIndex,
        );
        return { ...pair, subMenu: updatedSubMenu };
      }
      return pair;
    });
    setFormData({ ...formData, keyValuePairs: updatedPairs });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChangeCustomValues = () => {
    console.log(formData);

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            dropdownSettings: {
              ...formData,
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    console.log(state.editor.selectedElement.content);
    if (!Array.isArray(state.editor.selectedElement.content)) {
      setFormData(
        state.editor.selectedElement.content.dropdownSettings ?? {
          keyValuePairs: [{ key: "", value: "", subMenu: [] }],
          label: "Pedro Duarte",
          triggerName: "Pedro Duarte",
          activeTab: "menu",
        },
      );
    }
  }, [state.editor.selectedElement]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground">Dropdown Menu Type</p>
      <Tabs
        value={formData.activeTab}
        onValueChange={(tab) => handleInputChange("activeTab", tab)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="radio">Radio</TabsTrigger>
          <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
              <CardDescription>
                Add your menu and sub menu options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggerName">Trigger Button Name</Label>
                <Input
                  id="triggerName"
                  value={formData.triggerName}
                  onChange={(e) =>
                    handleInputChange("triggerName", e.target.value)
                  }
                />
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => handleInputChange("label", e.target.value)}
                />
              </div>
              {formData.keyValuePairs!.map((pair, index) => (
                <div className="space-y-2">
                  <div className="flex space-x-2" key={index}>
                    <div className="space-y-2">
                      <Label htmlFor={`key-${index}`}>Key</Label>
                      <Input
                        id={`key-${index}`}
                        value={pair.key}
                        onChange={(e) =>
                          handleKeyValueChange(index, "key", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`value-${index}`}>Value</Label>
                      <Input
                        id={`value-${index}`}
                        value={pair.value}
                        onChange={(e) =>
                          handleKeyValueChange(index, "value", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 mt-7"
                      onClick={() => handleDeletePair(index)}
                    >
                      <Trash2 size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-7"
                      onClick={() => handleAddSubMenu(index)}
                    >
                      <CirclePlus size={20} />
                    </Button>
                  </div>
                  {pair.subMenu &&
                    pair.subMenu.length > 0 &&
                    pair.subMenu.map((sub, subIndex) => (
                      <div className="flex space-x-2" key={subIndex}>
                        <div className="space-y-2">
                          <Label htmlFor={`sub-key-${index}-${subIndex}`}>
                            Sub Key
                          </Label>
                          <Input
                            id={`sub-key-${index}-${subIndex}`}
                            value={sub.key}
                            onChange={(e) =>
                              handleSubMenuChange(
                                index,
                                subIndex,
                                "key",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`sub-value-${index}-${subIndex}`}>
                            Sub Value
                          </Label>
                          <Input
                            id={`sub-value-${index}-${subIndex}`}
                            value={sub.value}
                            onChange={(e) =>
                              handleSubMenuChange(
                                index,
                                subIndex,
                                "value",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 mt-7"
                          onClick={() => handleDeleteSubMenu(index, subIndex)}
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    ))}
                </div>
              ))}
              <Button
                variant="ghost"
                className="text-muted-foreground w-full"
                onClick={handleAddPair}
              >
                <CirclePlus /> {" Add More"}
              </Button>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                id="menuOptions"
                onClick={handleChangeCustomValues}
              >
                Save Menu Options
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="radio">
          <Card>
            <CardHeader>
              <CardTitle>Radio</CardTitle>
              <CardDescription>Add your radio options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggerName">Trigger Button Name</Label>
                <Input
                  id="triggerName"
                  value={formData.triggerName}
                  onChange={(e) =>
                    handleInputChange("triggerName", e.target.value)
                  }
                />
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => handleInputChange("label", e.target.value)}
                />
              </div>
              {formData.keyValuePairs!.map((pair, index) => (
                <div className="flex space-x-2" key={index}>
                  <div className="space-y-2">
                    <Label htmlFor={`key-${index}`}>Key</Label>
                    <Input
                      id={`key-${index}`}
                      value={pair.key}
                      onChange={(e) =>
                        handleKeyValueChange(index, "key", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      value={pair.value}
                      onChange={(e) =>
                        handleKeyValueChange(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 mt-7"
                    onClick={() => handleDeletePair(index)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                className="text-muted-foreground w-full"
                onClick={handleAddPair}
              >
                <CirclePlus /> {" Add More"}
              </Button>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                id="menuOptions"
                onClick={handleChangeCustomValues}
              >
                Save Menu Options
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="checkbox">
          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
              <CardDescription>Add your checkbox options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggerName">Trigger Button Name</Label>
                <Input
                  id="triggerName"
                  value={formData.triggerName}
                  onChange={(e) =>
                    handleInputChange("triggerName", e.target.value)
                  }
                />
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => handleInputChange("label", e.target.value)}
                />
              </div>
              {formData.keyValuePairs!.map((pair, index) => (
                <div className="flex space-x-2" key={index}>
                  <div className="space-y-2">
                    <Label htmlFor={`key-${index}`}>Key</Label>
                    <Input
                      id={`key-${index}`}
                      value={pair.key}
                      onChange={(e) =>
                        handleKeyValueChange(index, "key", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      value={pair.value}
                      onChange={(e) =>
                        handleKeyValueChange(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 mt-7"
                    onClick={() => handleDeletePair(index)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                className="text-muted-foreground w-full"
                onClick={handleAddPair}
              >
                <CirclePlus /> {" Add More"}
              </Button>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                id="menuOptions"
                onClick={handleChangeCustomValues}
              >
                Save Menu Options
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DropdownSettings;
