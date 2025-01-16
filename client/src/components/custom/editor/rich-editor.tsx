import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Toolbar from "./toolbar";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface RichEditorProps {
  key?: string;
  name?: string;
  initialContent?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  autofocus?: boolean;
}

// Define a custom document with required nodes
const CustomDocument = Document.extend({
  content: "block+",
});

const CustomParagraph = Paragraph.extend({
  content: "inline*",
});

const extensions = [
  CustomDocument,
  CustomParagraph,
  Text,
  StarterKit.configure({
    document: false,
    paragraph: false,
    heading: false,
    text: false,
    listItem: false,
    orderedList: false,
    bulletList: false,
    codeBlock: false,
    code: false,
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Underline,
  Subscript,
  Superscript,
  ListItem,
  OrderedList.configure({
    keepMarks: true,
    keepAttributes: true,
    HTMLAttributes: { class: "list-decimal ml-4" },
  }),
  BulletList.configure({
    keepMarks: true,
    keepAttributes: true,
    HTMLAttributes: { class: "list-disc ml-4" },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
  }),
  Link.configure({
    openOnClick: false,
    linkOnPaste: true,
    autolink: false,
    HTMLAttributes: {
      class: "text-primary underline cursor-pointer",
    },
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: { class: "border-collapse table-auto w-full" },
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes: { class: "border border-border bg-muted" },
  }),
  TableCell.configure({
    HTMLAttributes: { class: "border border-border p-2" },
  }),
  Code,
  CodeBlock.configure({
    HTMLAttributes: { class: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono" },
  }),
];

const RichEditor: React.FC<RichEditorProps> = ({ initialContent, onChange, readOnly = false, className, placeholder, autofocus = false, key, name }) => {
  const editor = useEditor({
    extensions,
    content: initialContent ?? "<p></p>",
    editable: !readOnly,
    autofocus,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-p:leading-7",
          "prose-pre:bg-muted prose-pre:rounded-lg prose-pre:p-4",
          "prose-code:bg-muted prose-code:rounded prose-code:px-1.5 prose-code:py-0.5",
          "prose-table:text-sm",
          "focus:outline-none",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  if (!editor) return null;

  return (
    <Card className="w-full" key={key}>
      {!readOnly && <Toolbar editor={editor} />}
      <CardContent className="p-4">
        <EditorContent editor={editor} name={name} />
      </CardContent>
    </Card>
  );
};

RichEditor.displayName = "RichEditor";

export default RichEditor;
