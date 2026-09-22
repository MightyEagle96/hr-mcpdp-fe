import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

function RichTextEditor({
  value,
  onChange,
  //placeholder = "Start writing your topic...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class: `
      min-h-[550px]
      px-8
      py-7
      focus:outline-none

      [&_h1]:mb-6
      [&_h1]:mt-8
      [&_h1]:text-4xl
      [&_h1]:font-bold
      [&_h1]:leading-tight
      [&_h1]:text-slate-900

      [&_h2]:mb-4
      [&_h2]:mt-7
      [&_h2]:text-3xl
      [&_h2]:font-bold
      [&_h2]:leading-tight
      [&_h2]:text-slate-900

      [&_h3]:mb-3
      [&_h3]:mt-6
      [&_h3]:text-2xl
      [&_h3]:font-semibold
      [&_h3]:leading-tight
      [&_h3]:text-slate-900

      [&_p]:mb-4
      [&_p]:text-base
      [&_p]:leading-8
      [&_p]:text-slate-700

      [&_ul]:mb-5
      [&_ul]:list-disc
      [&_ul]:pl-6

      [&_ol]:mb-5
      [&_ol]:list-decimal
      [&_ol]:pl-6

      [&_li]:mb-2

      [&_blockquote]:my-6
      [&_blockquote]:border-l-4
      [&_blockquote]:border-[#C63C38]
      [&_blockquote]:bg-slate-50
      [&_blockquote]:px-5
      [&_blockquote]:py-3
      [&_blockquote]:italic
      [&_blockquote]:text-slate-600

      [&_a]:font-medium
      [&_a]:text-[#C63C38]
      [&_a]:underline

      [&_img]:my-6
      [&_img]:rounded-2xl
      [&_img]:shadow-sm
    `,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL", "https://");

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 py-3">
        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo2 size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo2 size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link */}
        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          title="Insert link"
        >
          <LinkIcon size={17} />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton onClick={addImage} title="Insert image">
          <ImageIcon size={17} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal line"
        >
          <Minus size={17} />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}

function ToolbarButton({
  children,
  onClick,
  active = false,
  disabled = false,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex h-9 w-9 items-center justify-center rounded-lg
        transition
        ${
          active
            ? "bg-[#C63C38]/10 text-[#C63C38]"
            : "text-slate-600 hover:bg-white hover:text-slate-900"
        }
        disabled:cursor-not-allowed
        disabled:opacity-30
      `}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-6 w-px bg-slate-200" />;
}

export default RichTextEditor;
