import React from 'react';

/**
 * TipTapContentRenderer - Renders TipTap JSON content to styled React elements
 * Supports: heading, paragraph, bulletList, orderedList, blockquote, horizontalRule, image
 * Text marks: bold, italic, underline
 * Groups consecutive images into a flex layout
 */

// Render text with marks (bold, italic, underline)
function renderTextWithMarks(textNode) {
    let content = textNode.text || '';
    const marks = textNode.marks || [];

    marks.forEach(mark => {
        switch (mark.type) {
            case 'bold':
                content = <strong key="bold">{content}</strong>;
                break;
            case 'italic':
                content = <em key="italic">{content}</em>;
                break;
            case 'underline':
                content = <u key="underline">{content}</u>;
                break;
            case 'link':
                content = (
                    <a
                        key="link"
                        href={mark.attrs?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tiptap-link"
                    >
                        {content}
                    </a>
                );
                break;
            default:
                break;
        }
    });

    return content;
}

// Render inline content (array of text nodes)
function renderInlineContent(content) {
    if (!content || !Array.isArray(content)) return null;

    return content.map((node, idx) => {
        if (node.type === 'text') {
            return <React.Fragment key={idx}>{renderTextWithMarks(node)}</React.Fragment>;
        }
        if (node.type === 'hardBreak') {
            return <br key={idx} />;
        }
        return null;
    });
}

// Render a single node
function renderNode(node, index) {
    if (!node) return null;

    switch (node.type) {
        case 'heading': {
            const level = node.attrs?.level || 1;
            const Tag = `h${level}`;
            const className = `tiptap-heading tiptap-h${level}`;
            return (
                <Tag key={index} className={className}>
                    {renderInlineContent(node.content)}
                </Tag>
            );
        }

        case 'paragraph':
            return (
                <p key={index} className="tiptap-paragraph">
                    {renderInlineContent(node.content)}
                </p>
            );

        case 'bulletList':
            return (
                <ul key={index} className="tiptap-bullet-list">
                    {node.content?.map((item, idx) => renderNode(item, idx))}
                </ul>
            );

        case 'orderedList':
            return (
                <ol key={index} className="tiptap-ordered-list">
                    {node.content?.map((item, idx) => renderNode(item, idx))}
                </ol>
            );

        case 'listItem':
            return (
                <li key={index} className="tiptap-list-item">
                    {node.content?.map((item, idx) => renderNode(item, idx))}
                </li>
            );

        case 'blockquote':
            return (
                <blockquote key={index} className="tiptap-blockquote">
                    {node.content?.map((item, idx) => renderNode(item, idx))}
                </blockquote>
            );

        case 'horizontalRule':
            return <hr key={index} className="tiptap-hr" />;

        case 'image':
            return (
                <div key={index} className="tiptap-image-single">
                    <img
                        src={node.attrs?.src}
                        alt={node.attrs?.alt || ''}
                        className="tiptap-img"
                    />
                </div>
            );

        case 'doc':
            // Document root - render children
            return renderNodes(node.content);

        default:
            // Unknown node type - try to render content if exists
            if (node.content) {
                return (
                    <div key={index}>
                        {node.content.map((item, idx) => renderNode(item, idx))}
                    </div>
                );
            }
            return null;
    }
}

// Image group component for consecutive images
function ImageGroup({ images, startIndex }) {
    const count = images.length;

    // Determine layout based on count
    let layoutClass = 'tiptap-image-group';
    if (count === 2) {
        layoutClass += ' tiptap-image-group-2';
    } else if (count === 3) {
        layoutClass += ' tiptap-image-group-3';
    } else if (count >= 4) {
        layoutClass += ' tiptap-image-group-4';
    }

    return (
        <div className={layoutClass}>
            {images.map((img, idx) => (
                <div key={startIndex + idx} className="tiptap-image-item">
                    <img
                        src={img.attrs?.src}
                        alt={img.attrs?.alt || ''}
                    />
                </div>
            ))}
        </div>
    );
}

// Main render function that groups consecutive images
function renderNodes(nodes) {
    if (!nodes || !Array.isArray(nodes)) return null;

    const elements = [];
    let i = 0;

    while (i < nodes.length) {
        const node = nodes[i];

        // Check if this is an image - collect consecutive images
        if (node.type === 'image') {
            const imageGroup = [];
            const startIndex = i;

            while (i < nodes.length && nodes[i].type === 'image') {
                imageGroup.push(nodes[i]);
                i++;
            }

            // If single image, render normally; if multiple, use ImageGroup
            if (imageGroup.length === 1) {
                elements.push(renderNode(imageGroup[0], startIndex));
            } else {
                elements.push(
                    <ImageGroup
                        key={`img-group-${startIndex}`}
                        images={imageGroup}
                        startIndex={startIndex}
                    />
                );
            }
            continue;
        }

        elements.push(renderNode(node, i));
        i++;
    }

    return elements;
}

// Main component
export default function TipTapContentRenderer({ content, className = '' }) {
    if (!content) {
        return null;
    }

    // Handle both doc wrapper and direct content array
    const nodes = content.type === 'doc' ? content.content : content;

    return (
        <div className={`tiptap-content ${className}`.trim()}>
            {renderNodes(nodes)}
        </div>
    );
}
