import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Table,
  Strikethrough,
  Subscript,
  Superscript,
  Link,
  Undo,
  Redo,
  IndentIncrease,
  IndentDecrease,
} from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

interface ToolbarProps {
  editor: Editor | null;
}

const FORMATTING_TOOLS = [
  {
    name: "bold",
    icon: Bold,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: Italic,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: Underline,
    action: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: Strikethrough,
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: "subscript",
    icon: Subscript,
    action: (editor: Editor) => editor.chain().focus().toggleSubscript().run(),
  },
  {
    name: "superscript",
    icon: Superscript,
    action: (editor: Editor) => editor.chain().focus().toggleSuperscript().run(),
  },
];

const HEADING_OPTIONS = [
  {
    label: "Normal text",
    command: (editor: Editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor: Editor) => editor.isActive("paragraph"),
  },
  {
    label: "Heading 1",
    command: (editor: Editor) => editor.chain().focus().setHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    label: "Heading 2",
    command: (editor: Editor) => editor.chain().focus().setHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "Heading 3",
    command: (editor: Editor) => editor.chain().focus().setHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
  },
];

const LIST_TOOLS = [
  {
    name: "bulletList",
    icon: List,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
  },
  {
    name: "orderedList",
    icon: ListOrdered,
    action: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive("orderedList"),
  },
];

const LIST_ITEM_TOOLS = [
  {
    name: "Indent",
    icon: IndentIncrease,
    action: (editor: Editor) => editor.chain().focus().sinkListItem("listItem").run(),
    isEnabled: (editor: Editor) => editor.can().sinkListItem("listItem"),
  },
  {
    name: "Outdent",
    icon: IndentDecrease,
    action: (editor: Editor) => editor.chain().focus().liftListItem("listItem").run(),
    isEnabled: (editor: Editor) => editor.can().liftListItem("listItem"),
  },
];

const ALIGN_TOOLS = [
  {
    name: "alignLeft",
    icon: AlignLeft,
    action: (editor: Editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    name: "alignCenter",
    icon: AlignCenter,
    action: (editor: Editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    name: "alignRight",
    icon: AlignRight,
    action: (editor: Editor) => editor.chain().focus().setTextAlign("right").run(),
  },
];

const TABLE_ACTIONS = [
  {
    name: "Insert Table",
    action: (editor: Editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    name: "Add Row Below",
    action: (editor: Editor) => editor.chain().focus().addRowAfter().run(),
  },
  {
    name: "Add Row Above",
    action: (editor: Editor) => editor.chain().focus().addRowBefore().run(),
  },
  {
    name: "Delete Row",
    action: (editor: Editor) => editor.chain().focus().deleteRow().run(),
  },
  {
    name: "Add Column After",
    action: (editor: Editor) => editor.chain().focus().addColumnAfter().run(),
  },
  {
    name: "Add Column Before",
    action: (editor: Editor) => editor.chain().focus().addColumnBefore().run(),
  },
  {
    name: "Delete Column",
    action: (editor: Editor) => editor.chain().focus().deleteColumn().run(),
  },
  {
    name: "Delete Table",
    action: (editor: Editor) => editor.chain().focus().deleteTable().run(),
  },
];

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-background p-1">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <Select
        onValueChange={(value) => {
          const option = HEADING_OPTIONS.find((opt) => (value === "normal" ? opt.label === "Normal text" : opt.label === `Heading ${value.split("-")[1]}`));
          if (option) {
            option.command(editor);
          }
        }}
        value={
          HEADING_OPTIONS.find((opt) => opt.isActive(editor))
            ?.label.toLowerCase()
            .replace(" ", "-") ?? "normal"
        }
      >
        <SelectTrigger className="w-[180px] flex items-center justify-between">
          <SelectValue placeholder="Select Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Text Style</SelectLabel>
            {HEADING_OPTIONS.map((option) => (
              <SelectItem key={option.label.toLowerCase().replace(" ", "-")} value={option.label.toLowerCase().replace(" ", "-")}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        {FORMATTING_TOOLS.map(({ icon: Icon, name, action }) => (
          <Toggle key={name} size="sm" pressed={editor.isActive(name)} onPressedChange={() => action(editor)}>
            <Icon className="h-4 w-4" />
          </Toggle>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        {LIST_TOOLS.map(({ icon: Icon, name, action }) => (
          <Toggle key={name} size="sm" pressed={editor.isActive(name)} onPressedChange={() => action(editor)}>
            <Icon className="h-4 w-4" />
          </Toggle>
        ))}
        {LIST_ITEM_TOOLS.map(({ icon: Icon, name, action, isEnabled }) => (
          <Button key={name} size="sm" variant="ghost" disabled={!isEnabled(editor)} onClick={() => action(editor)}>
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        {ALIGN_TOOLS.map(({ icon: Icon, name, action }) => (
          <Toggle key={name} size="sm" pressed={editor.isActive({ textAlign: name.replace("align", "").toLowerCase() })} onPressedChange={() => action(editor)}>
            <Icon className="h-4 w-4" />
          </Toggle>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogTrigger asChild>
          <Toggle size="sm" pressed={editor.isActive("link")} className={editor.isActive("link") ? "bg-muted" : ""}>
            <Link className="h-4 w-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!editor.state.selection.empty && (
              <div className="grid gap-2">
                <Label htmlFor="text">Selected Text</Label>
                <Input id="text" value={editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to)} disabled />
              </div>
            )}
            {editor.state.selection.empty && (
              <div className="grid gap-2">
                <Label htmlFor="text">Display Text</Label>
                <Input id="text" value={linkText} onChange={(e) => setLinkText(e.target.value)} placeholder="Enter link text" />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setIsLinkDialogOpen(false);
                setLinkUrl("");
                setLinkText("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editor.state.selection.empty && linkText) {
                  // Insert new text with link
                  editor.chain().focus().insertContent(linkText).setLink({ href: linkUrl }).run();
                } else if (!editor.state.selection.empty) {
                  // Update existing selection with link
                  editor.chain().focus().setLink({ href: linkUrl }).run();
                }
                setIsLinkDialogOpen(false);
                setLinkUrl("");
                setLinkText("");
              }}
              disabled={!linkUrl || (editor.state.selection.empty && !linkText)}
            >
              {editor.isActive("link") ? "Update Link" : "Add Link"}
            </Button>
            {editor.isActive("link") && (
              <Button
                variant="destructive"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setIsLinkDialogOpen(false);
                  setLinkUrl("");
                  setLinkText("");
                }}
              >
                Remove Link
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Table className="h-4 w-4" />
            <span>Table</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {TABLE_ACTIONS.map(({ name, action }) => (
            <DropdownMenuItem key={name} onClick={() => action(editor)} className="flex items-center gap-2">
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Toggle size="sm" pressed={editor.isActive("code")} onPressedChange={() => editor.chain().focus().toggleCode().run()}>
        <Code className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

Toolbar.displayName = "Toolbar";

export default Toolbar;
