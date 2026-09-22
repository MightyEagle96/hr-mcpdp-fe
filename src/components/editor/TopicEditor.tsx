import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface TopicEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

function TopicEditor({
  value,
  onChange,
  placeholder = "Start developing this topic...",
}: TopicEditorProps) {
  return (
    <div className="topic-editor  overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",

          plugins: [
            Essentials,
            Paragraph,
            Heading,

            Bold,
            Italic,
            Underline,

            Link,

            List,
            Indent,
            IndentBlock,

            BlockQuote,

            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,

            MediaEmbed,

            Table,
            TableToolbar,

            Undo,
          ],

          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },

          toolbar: [
            "undo",
            "redo",
            "|",

            "heading",
            "|",

            "bold",
            "italic",
            "underline",
            "|",

            "link",
            "|",

            "bulletedList",
            "numberedList",
            "|",

            "outdent",
            "indent",
            "|",

            "blockQuote",
            "|",

            "insertImage",
            "mediaEmbed",
            "insertTable",
          ],

          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
            ],
          },

          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
          },

          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "|",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },

          placeholder,
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
}

export default TopicEditor;
