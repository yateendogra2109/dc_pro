import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLongNote } from '../redux/noteSlice';
import LongNoteForm from './LongNoteForm';

export default function LongNoteCard({ note }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteLongNote(note.id));
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal': return 'bg-green-100 text-green-800 border-green-200';
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'project': return 'bg-red-100 text-red-800 border-red-200';
      case 'learning': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPreview = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getWordCount = (content) => {
    return content.trim().split(/\s+/).length;
  };

  if (isEditing) {
    return (
      <LongNoteForm 
        note={note} 
        onClose={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-xl text-gray-800 flex-1 mr-3">
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

      <div className="mb-4">
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {isExpanded ? note.content : getPreview(note.content)}
        </p>
        
        {note.content.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 text-sm mt-2 font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full border ${getCategoryColor(note.category)}`}>
            {note.category}
          </span>
          <span className="text-gray-500">
            {getWordCount(note.content)} words
          </span>
        </div>
        <span className="text-gray-400">
          {formatDate(note.createdAt)}
        </span>
      </div>

      {/* Future AI functionality placeholder */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <button
            disabled
            className="bg-gray-100 text-gray-400 px-3 py-1 rounded-md text-sm cursor-not-allowed"
            title="AI Summarize - Coming Soon"
          >
            🤖 Summarize (Coming Soon)
          </button>
          <button
            disabled
            className="bg-gray-100 text-gray-400 px-3 py-1 rounded-md text-sm cursor-not-allowed"
            title="AI Analysis - Coming Soon"
          >
            📊 Analyze (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}