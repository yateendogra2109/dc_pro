import React, { useState } from 'react';

export default function LongNoteEditor({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    onSave({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="border rounded p-4 mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full mb-2 p-1"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border w-full mb-2 p-1"
        rows={5}
      ></textarea>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded">
        Save
      </button>
    </div>
  );
}
