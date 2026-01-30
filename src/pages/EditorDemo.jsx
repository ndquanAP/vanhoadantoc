import { useState } from 'react';
import NovelEditor from '../components/NovelEditor';
import './css/EditorDemo.css';

// Sample content from DiTichDetail - converted to Novel format
const SAMPLE_CONTENT = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Lịch Sử Đền Đuổm" }]
        },
        {
            type: "paragraph",
            content: [{ 
                type: "text", 
                text: "Đền Đuổm nằm dưới chân núi Đuổm, thuộc xã Động Đạt, huyện Phú Lương, tỉnh Thái Nguyên, cách trung tâm thành phố Thái Nguyên khoảng 25km về phía Bắc." 
            }]
        },
        {
            type: "paragraph",
            content: [{ 
                type: "text", 
                text: "Đây là di tích lịch sử - văn hóa tiêu biểu của vùng Việt Bắc, được xếp hạng Di tích lịch sử cấp Quốc gia vào năm 1993." 
            }]
        },
        {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Nhân vật thờ tự" }]
        },
        {
            type: "paragraph",
            content: [
                { type: "text", text: "Đền là nơi thờ tự " },
                { type: "text", marks: [{ type: "bold" }], text: "Phò mã Đô úy Dương Tự Minh" },
                { type: "text", text: " (còn được tôn xưng là Thánh Đuổm) – một vị anh hùng dân tộc người Tày." }
            ]
        },
        {
            type: "bulletList",
            content: [
                {
                    type: "listItem",
                    content: [{
                        type: "paragraph",
                        content: [{ type: "text", text: "Hai lần được các vua Lý gả công chúa" }]
                    }]
                },
                {
                    type: "listItem",
                    content: [{
                        type: "paragraph",
                        content: [{ type: "text", text: "Có công dẹp loạn giữ yên bờ cõi" }]
                    }]
                },
                {
                    type: "listItem",
                    content: [{
                        type: "paragraph",
                        content: [{ type: "text", text: "Phát triển kinh tế và nông nghiệp tại vùng phủ Phú Lương" }]
                    }]
                }
            ]
        }
    ]
};

export default function EditorDemo() {
    const [editorOutput, setEditorOutput] = useState(null);
    const [activeTab, setActiveTab] = useState('editor');

    const handleEditorUpdate = (content) => {
        setEditorOutput(content);
    };

    return (
        <div className="editor-demo-page">
            <header className="editor-demo-header">
                <h1>📝 Novel Editor Demo</h1>
                <p>Prototype: WYSIWYG editor for Di Tích content management</p>
            </header>

            <div className="editor-demo-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editor')}
                >
                    ✏️ Editor
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                    onClick={() => setActiveTab('html')}
                >
                    🌐 HTML Output
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'json' ? 'active' : ''}`}
                    onClick={() => setActiveTab('json')}
                >
                    📦 JSON Output
                </button>
            </div>

            <main className="editor-demo-content">
                {activeTab === 'editor' && (
                    <div className="editor-panel">
                        <div className="editor-info">
                            <p>💡 Try typing <kbd>/</kbd> to see formatting options, or select text for formatting toolbar</p>
                        </div>
                        <NovelEditor 
                            initialContent={SAMPLE_CONTENT}
                            onUpdate={handleEditorUpdate}
                        />
                    </div>
                )}

                {activeTab === 'html' && (
                    <div className="output-panel">
                        <h3>HTML Output (for rendering)</h3>
                        <pre className="code-output">
                            {editorOutput?.html || 'Start editing to see HTML output...'}
                        </pre>
                        
                        <h3>Preview</h3>
                        <div 
                            className="html-preview"
                            dangerouslySetInnerHTML={{ __html: editorOutput?.html || '' }}
                        />
                    </div>
                )}

                {activeTab === 'json' && (
                    <div className="output-panel">
                        <h3>JSON Output (for database storage)</h3>
                        <pre className="code-output">
                            {editorOutput?.json 
                                ? JSON.stringify(editorOutput.json, null, 2)
                                : 'Start editing to see JSON output...'}
                        </pre>
                    </div>
                )}
            </main>

            <footer className="editor-demo-footer">
                <div className="integration-notes">
                    <h3>🔧 Integration Notes</h3>
                    <ul>
                        <li><strong>Store as HTML:</strong> Use <code>editor.getHTML()</code> and render with <code>dangerouslySetInnerHTML</code></li>
                        <li><strong>Store as JSON:</strong> Use <code>editor.getJSON()</code> for full document structure</li>
                        <li><strong>Admin panel:</strong> Embed this editor in your admin page for content management</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
