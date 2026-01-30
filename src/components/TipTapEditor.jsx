import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { useEffect, useCallback } from 'react';
import './TipTapEditor.css';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <div className="tiptap-toolbar">
            <div className="tiptap-toolbar-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    title="Bold (Ctrl+B)"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    title="Italic (Ctrl+I)"
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                    title="Underline (Ctrl+U)"
                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    title="Strikethrough"
                >
                    <s>S</s>
                </button>
            </div>

            <div className="tiptap-toolbar-divider" />

            <div className="tiptap-toolbar-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    title="Heading 3"
                >
                    H3
                </button>
            </div>

            <div className="tiptap-toolbar-divider" />

            <div className="tiptap-toolbar-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    title="Bullet List"
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                    title="Numbered List"
                >
                    1. List
                </button>
            </div>

            <div className="tiptap-toolbar-divider" />

            <div className="tiptap-toolbar-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                    title="Quote"
                >
                    " Quote
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    ─ Line
                </button>
                <button type="button" onClick={addImage} title="Add Image">
                    🖼 Image
                </button>
            </div>

            <div className="tiptap-toolbar-divider" />

            <div className="tiptap-toolbar-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    ↩ Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    ↪ Redo
                </button>
            </div>
        </div>
    );
};

export default function TipTapEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Configure StarterKit options if needed
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Underline,
        ],
        content: content || { type: 'doc', content: [{ type: 'paragraph' }] },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getJSON());
        },
    });

    // Update editor content when prop changes
    useEffect(() => {
        if (editor && content) {
            const currentContent = JSON.stringify(editor.getJSON());
            const newContent = JSON.stringify(content);
            if (currentContent !== newContent) {
                editor.commands.setContent(content);
            }
        }
    }, [content, editor]);

    return (
        <div className="tiptap-editor">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="tiptap-content" />
        </div>
    );
}
