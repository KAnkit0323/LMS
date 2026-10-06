import {
  useEditor,
  EditorContent,
  useEditorState,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Unlink,
  List,
  ListOrdered,
} from "lucide-react";
import { useEffect } from "react";


export default function RichTextEditor({ input, setInput }) {

  const editor = useEditor({

    extensions: [
      StarterKit,
      Underline,

      Link.configure({
        openOnClick: false,
      }),
    ],

    // Get only description as initial content
    content: input.description,

    // Editor content changes
    onUpdate: ({ editor }) => {

      const html = editor.getText();
      console.log(html);

      // IMPORTANT:
      // Keep all other input fields
      // Change ONLY description
      setInput((prev) => ({
        ...prev,
        description: html,
      }));
    },
  });
  

  useEffect(() => {
    if (!editor) return;

    // API se description aane ke baad editor ko update karo
    if (input.description !== editor.getText()) {
      editor.commands.setContent(input.description || "");
    }
  }, [input.description, editor]);


  const active = useEditorState({
    editor,

    selector: ({ editor }) => ({
      bold: editor?.isActive("bold"),
      italic: editor?.isActive("italic"),
      underline: editor?.isActive("underline"),
      link: editor?.isActive("link"),

      bulletList: editor?.isActive("bulletList"),
      orderedList: editor?.isActive("orderedList"),

      h1: editor?.isActive("heading", { level: 1 }),
      h2: editor?.isActive("heading", { level: 2 }),
      h3: editor?.isActive("heading", { level: 3 }),
    }),
  });


  if (!editor) {
    return null;
  }


  const handleLink = () => {

    // Remove link
    if (editor.isActive("link")) {

      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }


    // Add link
    const url = window.prompt("Enter URL:");

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  };


  return (
    <div className="w-full border border-gray-300 rounded-md">

      {/* TOOLBAR */}

      <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-300">

        {/* Heading */}

        <select
          value={
            active.h1
              ? "h1"
              : active.h2
              ? "h2"
              : active.h3
              ? "h3"
              : "normal"
          }

          className="h-8 px-2 mr-2 rounded outline-none hover:bg-gray-100"

          onChange={(e) => {

            const value = e.target.value;

            if (value === "normal") {
              editor.chain().focus().setParagraph().run();
            }

            if (value === "h1") {
              editor.chain().focus()
                .setHeading({ level: 1 })
                .run();
            }

            if (value === "h2") {
              editor.chain().focus()
                .setHeading({ level: 2 })
                .run();
            }

            if (value === "h3") {
              editor.chain().focus()
                .setHeading({ level: 3 })
                .run();
            }
          }}
        >
          <option value="normal">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>


        {/* Bold */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.bold ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          <Bold size={18} />
        </button>


        {/* Italic */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.italic ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          <Italic size={18} />
        </button>


        {/* Underline */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.underline ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          <UnderlineIcon size={18} />
        </button>


        {/* Link */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleLink}

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.link ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          {active.link ? (
            <Unlink size={18} />
          ) : (
            <LinkIcon size={18} />
          )}
        </button>


        {/* Numbered List */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.orderedList ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          <ListOrdered size={18} />
        </button>


        {/* Bullet List */}

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }

          className={`w-8 h-8 flex items-center justify-center rounded
            ${active.bulletList ? "bg-gray-300" : "hover:bg-gray-100"}`}
        >
          <List size={18} />
        </button>

      </div>


      {/* EDITOR */}

      <EditorContent
        editor={editor}

        className="
          p-3
          min-h-[100px]

          [&_.tiptap]:outline-none

          [&_.tiptap_p]:m-0
          [&_.tiptap_p]:leading-6

          [&_.tiptap_h1]:text-3xl
          [&_.tiptap_h1]:font-bold

          [&_.tiptap_h2]:text-2xl
          [&_.tiptap_h2]:font-bold

          [&_.tiptap_h3]:text-xl
          [&_.tiptap_h3]:font-semibold

          [&_.tiptap_ul]:list-disc
          [&_.tiptap_ul]:pl-6

          [&_.tiptap_ol]:list-decimal
          [&_.tiptap_ol]:pl-6

          [&_.tiptap_a]:text-blue-600
          [&_.tiptap_a]:underline
        "
      />

    </div>
  );
}











// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";

// import "ckeditor5/ckeditor5.css";

// export default function RichTextEditor() {

//   return (
//     <CKEditor

//       // Which editor to use
//       editor={ClassicEditor}

//       // Plugins
//       config={{
//         licenseKey: "GPL",

//         plugins: [
//           Essentials,
//           Paragraph,
//           Bold,
//           Italic,
//         ],

//         // Toolbar
//         toolbar: [
//           "undo",
//           "redo",
//           "|",
//           "bold",
//           "italic",
//         ],
//       }}

//       // Initial content
//       data="<p>Write your course content here...</p>"

//       // Runs whenever content changes
//       onChange={(event, editor) => {

//         const data = editor.getData();

//         console.log(data);
//       }}
//     />
//   );
// }
