import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, useRef } from 'react';

// API endpoint for uploads (adjust port if needed)
const UPLOAD_API = 'http://localhost:3000/uploads';

// Toolbar button component
const MenuButton = ({ onClick, isActive, children, title }) => (
    <button
        onClick={onClick}
        className={`menu-btn ${isActive ? 'active' : ''}`}
        type="button"
        title={title}
    >
        {children}
    </button>
);

// Toolbar component
const MenuBar = ({ editor, onImageClick }) => {
    if (!editor) return null;

    return (
        <div className="editor-toolbar">
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
            >
                <strong>B</strong>
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
            >
                <em>I</em>
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
            >
                <s>S</s>
            </MenuButton>
            
            <span className="toolbar-divider" />
            
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                H1
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                H2
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
            >
                H3
            </MenuButton>
            
            <span className="toolbar-divider" />
            
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                • List
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Numbered List"
            >
                1. List
            </MenuButton>
            
            <span className="toolbar-divider" />
            
            <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Quote"
            >
                " Quote
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Line"
            >
                ─
            </MenuButton>
            
            <span className="toolbar-divider" />
            
            <MenuButton
                onClick={onImageClick}
                title="Insert Image"
            >
                🖼️ Image
            </MenuButton>
        </div>
    );
};

export default function NovelEditor({ initialContent, onUpdate }) {
    const fileInputRef = useRef(null);
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
        ],
        content: initialContent || `
            <h2>Lịch Sử Đền Đuổm</h2>
            <p>Đền Đuổm nằm dưới chân núi Đuổm, thuộc xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên, cách trung tâm thành phố Thái Nguyên khoảng 25km về phía Bắc.</p>
            <p>Đây là di tích lịch sử - văn hóa tiêu biểu của vùng Việt Bắc, được xếp hạng Di tích lịch sử cấp Quốc gia vào năm 1993.</p>
            <h3>Nhân vật thờ tự</h3>
            <p>Đền là nơi thờ tự <strong>Phò mã Đô úy Dương Tự Minh</strong> (còn được tôn xưng là Thánh Đuổm) – một vị anh hùng dân tộc người Tày.</p>
            <ul>
                <li>Hai lần được các vua Lý gả công chúa</li>
                <li>Có công dẹp loạn giữ yên bờ cõi</li>
                <li>Phát triển kinh tế và nông nghiệp tại vùng phủ Phú Lương</li>
            </ul>
        `,
        onUpdate: ({ editor }) => {
            if (onUpdate) {
                onUpdate({
                    json: editor.getJSON(),
                    html: editor.getHTML(),
                    text: editor.getText()
                });
            }
        },
    });

    // Trigger initial update
    useEffect(() => {
        if (editor && onUpdate) {
            const timeout = setTimeout(() => {
                onUpdate({
                    json: editor.getJSON(),
                    html: editor.getHTML(),
                    text: editor.getText()
                });
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [editor]);

    // Handle image button click
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        try {
            // Create FormData for upload
            const formData = new FormData();
            formData.append('file', file);

            // Try to upload to backend
            const response = await fetch(UPLOAD_API, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // Insert uploaded image URL
                const imageUrl = `http://localhost:3000${data.url}`;
                editor.chain().focus().setImage({ src: imageUrl, alt: file.name }).run();
            } else {
                // Fallback: use base64 if upload fails
                console.warn('Upload failed, using base64 fallback');
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target?.result;
                    if (base64) {
                        editor.chain().focus().setImage({ src: base64, alt: file.name }).run();
                    }
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            // Fallback: use base64 if backend is not available
            console.warn('Backend not available, using base64 fallback:', error);
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    editor.chain().focus().setImage({ src: base64, alt: file.name }).run();
                }
            };
            reader.readAsDataURL(file);
        }

        // Clear the input
        event.target.value = '';
    };

    return (
        <div className="tiptap-editor-wrapper">
            <MenuBar editor={editor} onImageClick={handleImageClick} />
            <EditorContent editor={editor} className="tiptap-editor-content" />
            
            {/* Hidden file input for image upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}
