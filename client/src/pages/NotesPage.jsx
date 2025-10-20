import React, { useState } from 'react';
import SmallNoteCard from '../components/SmallNoteCard';
import LongNoteEditor from '../components/LongNoteEditor';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      <LongNoteEditor onSave={addNote} />

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note, idx) => <SmallNoteCard key={idx} note={note} />)
      )}
    </div>
  );
}
