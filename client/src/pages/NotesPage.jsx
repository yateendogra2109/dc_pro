import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SmallNoteCard from '../components/SmallNoteCard';
import LongNoteCard from '../components/LongNoteCard';
import ShortNoteForm from '../components/ShortNoteForm';
import LongNoteForm from '../components/LongNoteForm';

export default function NotesPage() {
  const { shortNotes, longNotes } = useSelector(state => state.notes);
  const [activeTab, setActiveTab] = useState('short'); // 'short' or 'long'
  const [showForm, setShowForm] = useState(false);

  const currentNotes = activeTab === 'short' ? shortNotes : longNotes;
  const FormComponent = activeTab === 'short' ? ShortNoteForm : LongNoteForm;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notes</h1>
          <p className="text-gray-600 mt-1">
            {shortNotes.length} short notes, {longNotes.length} long notes
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
        >
          {showForm ? '✕ Cancel' : `+ Add ${activeTab === 'short' ? 'Short' : 'Long'} Note`}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab('short');
            setShowForm(false);
          }}
          className={`px-6 py-3 rounded-lg transition duration-200 font-medium ${
            activeTab === 'short'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📝 Short Notes ({shortNotes.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('long');
            setShowForm(false);
          }}
          className={`px-6 py-3 rounded-lg transition duration-200 font-medium ${
            activeTab === 'long'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📄 Long Notes ({longNotes.length})
        </button>
      </div>

      {/* Add Note Form */}
      {showForm && (
        <FormComponent onClose={() => setShowForm(false)} />
      )}

      {/* Notes List */}
      <div className={activeTab === 'short' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {currentNotes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              {activeTab === 'short' ? '📝' : '📄'}
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              No {activeTab} notes yet
            </h3>
            <p className="text-gray-400">
              Create your first {activeTab} note to get started!
            </p>
          </div>
        ) : (
          currentNotes.map(note => 
            activeTab === 'short' ? (
              <SmallNoteCard key={note.id} note={note} />
            ) : (
              <LongNoteCard key={note.id} note={note} />
            )
          )
        )}
      </div>
    </div>
  );
}
