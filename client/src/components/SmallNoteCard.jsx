import React from 'react';

export default function SmallNoteCard({ note }) {
  return (
    <div className="border rounded p-2 mb-2 shadow-sm">
      <h2 className="font-semibold">{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
