import React, { useState, useRef } from 'react';

type Props = {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
};

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start writing...",
  className = ""
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const isCommandActive = (command: string): boolean => {
    return document.queryCommandState(command);
  };

  return (
    <div className={`border border-[#d0c0a0] rounded-lg bg-white ${className}`}>
      <div className="border-b border-[#d0c0a0] p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isCommandActive('bold') 
              ? 'bg-[#5fb3b3] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isCommandActive('italic') 
              ? 'bg-[#5fb3b3] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isCommandActive('underline') 
              ? 'bg-[#5fb3b3] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <u>U</u>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'h1')}
          className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'h2')}
          className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          H2
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isCommandActive('insertUnorderedList') 
              ? 'bg-[#5fb3b3] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isCommandActive('insertOrderedList') 
              ? 'bg-[#5fb3b3] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          1. List
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="text-[#5a4a3a] min-h-[200px] p-4 focus:outline-none"
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          minHeight: '200px',
        }}
        data-placeholder={placeholder}
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}