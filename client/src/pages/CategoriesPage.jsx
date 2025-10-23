import React from 'react';
import { useSelector } from 'react-redux';

export default function CategoriesPage() {
  const { shortNotes, longNotes } = useSelector(state => state.notes);
  const { reminders } = useSelector(state => state.reminders);

  // Get all unique categories from notes and reminders
  const allItems = [...shortNotes, ...longNotes, ...reminders];
  const categories = [...new Set(allItems.map(item => item.category))];
  
  const getCategoryStats = (category) => {
    const shortNotesCount = shortNotes.filter(note => note.category === category).length;
    const longNotesCount = longNotes.filter(note => note.category === category).length;
    const remindersCount = reminders.filter(reminder => reminder.category === category).length;
    
    return {
      shortNotes: shortNotesCount,
      longNotes: longNotesCount,
      reminders: remindersCount,
      total: shortNotesCount + longNotesCount + remindersCount
    };
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Debug indicator */}
      <div className="bg-purple-100 border border-purple-300 text-purple-800 px-4 py-2 rounded-lg mb-6 text-center font-medium">
        📍 You are currently on the <strong>CATEGORIES PAGE</strong> - Use the navigation above to go to Dashboard, Notes, etc.
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage and view your note categories
          </p>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏷️</div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            No categories yet
          </h3>
          <p className="text-gray-400">
            Create some notes or reminders to see categories here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const stats = getCategoryStats(category);
            return (
              <div key={category} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {category}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                    {stats.total} items
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">📝 Short Notes:</span>
                    <span className="font-medium">{stats.shortNotes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">📄 Long Notes:</span>
                    <span className="font-medium">{stats.longNotes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">⏰ Reminders:</span>
                    <span className="font-medium">{stats.reminders}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
