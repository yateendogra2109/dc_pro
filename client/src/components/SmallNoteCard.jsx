import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteShortNote } from '../redux/noteSlice';
import ShortNoteForm from './ShortNoteForm';

export default function SmallNoteCard({ note }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteShortNote(note.id));
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal': return 'bg-green-100 text-green-800 border-green-200';
      case 'ideas': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'quotes': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'todo': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isEditing) {
    return (
      <ShortNoteForm 
        note={note} 
        onClose={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800 flex-1 mr-3">
          {note.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 p-1"
            title="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-3 leading-relaxed">
        {note.content}
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className={`px-2 py-1 rounded-full border ${getCategoryColor(note.category)}`}>
          {note.category}
        </span>
        <span className="text-gray-400">
          {formatDate(note.createdAt)}
        </span>
      </div>
    </div>
  );
}
