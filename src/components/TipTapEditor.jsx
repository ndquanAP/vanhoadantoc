import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { useEffect, useCallback, useRef } from 'react';
import './TipTapEditor.css';

const API_URL = 'http://localhost:3001/api';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Loading placeholder image
const LOADING_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect fill="%23f0f2f5" width="200" height="150"/%3E%3Ctext x="100" y="75" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14"%3EUploading...%3C/text%3E%3C/svg%3E';

// Validate file before upload
const validateFile = (file) => {
    console.log('[TipTap Upload] Validating file:', file.name, 'Type:', file.type, 'Size:', file.size);
    console.log('[TipTap Upload] Allowed types:', ALLOWED_TYPES);
    console.log('[TipTap Upload] Type check:', ALLOWED_TYPES.includes(file.type));
    if (!ALLOWED_TYPES.includes(file.type)) {
        console.error('[TipTap Upload] REJECTED - Invalid type');
        return { valid: false, error: 'Only JPEG, PNG, GIF, and WebP images are allowed' };
    }
    if (file.size > MAX_FILE_SIZE) {
        console.error('[TipTap Upload] REJECTED - File too large');
        return { valid: false, error: 'Image must be less than 5MB' };
    }
    console.log('[TipTap Upload] Validation PASSED');
    return { valid: true };
};

const MenuBar = ({ editor, onImageUpload }) => {
    if (!editor) return null;

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
        e.target.value = '';
    };

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
                <button type="button" onClick={handleImageClick} title="Add Image">
                    🖼 Image
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
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

export default function TipTapEditor({ content, onChange, authToken }) {
    // Track ongoing uploads: uploadId -> AbortController
    const uploadsRef = useRef(new Map());
    const editorRef = useRef(null);

    // Upload image function that uses editorRef
    const uploadImage = useCallback(async (file) => {
        const editor = editorRef.current;
        if (!editor) {
            console.error('Editor not ready');
            return;
        }

        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        // Generate unique ID for this upload
        const uploadId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Insert loading placeholder
        editor.chain().focus().setImage({ 
            src: LOADING_PLACEHOLDER,
            alt: uploadId,
        }).run();

        // Create abort controller
        const controller = new AbortController();
        uploadsRef.current.set(uploadId, controller);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = authToken || localStorage.getItem('adminToken');
            
            const response = await fetch(`${API_URL}/uploads`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(response.status === 401 ? 'Authentication required' : 'Upload failed');
            }

            const data = await response.json();
            const imageUrl = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;

            // Find and replace the placeholder
            const currentEditor = editorRef.current;
            if (!currentEditor) return;

            const { state } = currentEditor;
            let placeholderPos = null;
            
            state.doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs.alt === uploadId) {
                    placeholderPos = pos;
                    return false;
                }
            });

            if (placeholderPos !== null) {
                currentEditor.chain()
                    .setNodeSelection(placeholderPos)
                    .setImage({ src: imageUrl, alt: file.name })
                    .run();
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Upload cancelled');
                return;
            }

            console.error('Upload error:', error);
            alert(error.message || 'Failed to upload image');

            // Remove the placeholder on error
            const currentEditor = editorRef.current;
            if (!currentEditor) return;

            const { state } = currentEditor;
            state.doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs.alt === uploadId) {
                    currentEditor.chain()
                        .setNodeSelection(pos)
                        .deleteSelection()
                        .run();
                    return false;
                }
            });
        } finally {
            uploadsRef.current.delete(uploadId);
        }
    }, [authToken]);

    // Store uploadImage in ref for use in editorProps
    const uploadImageRef = useRef(uploadImage);
    uploadImageRef.current = uploadImage;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
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
                inline: false,
                allowBase64: false, // Disable base64 to prevent 413 errors
            }),
            Underline,
        ],
        content: content || { type: 'doc', content: [{ type: 'paragraph' }] },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getJSON());
        },
        editorProps: {
            handlePaste: (view, event) => {
                const items = event.clipboardData?.items;
                if (!items) return false;

                for (const item of items) {
                    if (item.type.startsWith('image/')) {
                        event.preventDefault();
                        const file = item.getAsFile();
                        if (file) {
                            // Use ref to get latest uploadImage
                            uploadImageRef.current(file);
                            return true;
                        }
                    }
                }
                return false;
            },
            handleDrop: (view, event, slice, moved) => {
                if (moved) return false;

                const files = event.dataTransfer?.files;
                if (!files || files.length === 0) return false;

                for (const file of files) {
                    if (file.type.startsWith('image/')) {
                        event.preventDefault();
                        uploadImageRef.current(file);
                        return true;
                    }
                }
                return false;
            },
        },
    });

    // Store editor in ref
    useEffect(() => {
        editorRef.current = editor;
    }, [editor]);

    // Watch for placeholder deletion to abort uploads
    useEffect(() => {
        if (!editor) return;

        const handleTransaction = ({ transaction }) => {
            const deletedPlaceholders = new Set();
            
            transaction.steps.forEach((step) => {
                if (step.slice) {
                    const { from, to } = step;
                    try {
                        editor.state.doc.nodesBetween(from, Math.min(to, editor.state.doc.content.size), (node) => {
                            if (node.type.name === 'image' && node.attrs.src === LOADING_PLACEHOLDER) {
                                const uploadId = node.attrs.alt;
                                if (uploadId && uploadsRef.current.has(uploadId)) {
                                    deletedPlaceholders.add(uploadId);
                                }
                            }
                        });
                    } catch (e) {
                        // Ignore range errors during deletion
                    }
                }
            });

            deletedPlaceholders.forEach((uploadId) => {
                const controller = uploadsRef.current.get(uploadId);
                if (controller) {
                    controller.abort();
                    uploadsRef.current.delete(uploadId);
                }
            });
        };

        editor.on('transaction', handleTransaction);
        return () => editor.off('transaction', handleTransaction);
    }, [editor]);

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
            <MenuBar editor={editor} onImageUpload={uploadImage} />
            <EditorContent editor={editor} className="tiptap-content" />
        </div>
    );
}
