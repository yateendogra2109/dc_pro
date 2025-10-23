import React from 'react';
import { useSelector } from 'react-redux';

export default function RecentActivityPage() {
  const { shortNotes, longNotes } = useSelector(state => state.notes);
  const { reminders } = useSelector(state => state.reminders);

  // Combine all items and sort by updatedAt
  const allItems = [
    ...shortNotes.map(note => ({ ...note, type: 'short-note', icon: '📝' })),
    ...longNotes.map(note => ({ ...note, type: 'long-note', icon: '📄' })),
    ...reminders.map(reminder => ({ ...reminder, type: 'reminder', icon: '⏰' }))
  ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'short-note': return 'bg-blue-100 text-blue-800';
      case 'long-note': return 'bg-green-100 text-green-800';
      case 'reminder': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Debug indicator */}
      <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-2 rounded-lg mb-6 text-center font-medium">
        📍 You are currently on the <strong>RECENT ACTIVITY PAGE</strong> - Use the navigation above to go to Dashboard, Notes, etc.
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Recent Activity</h1>
          <p className="text-gray-600 mt-1">
            Track your recently created and updated items
          </p>
        </div>
      </div>

      {allItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            No activity yet
          </h3>
          <p className="text-gray-400">
            Create some notes or reminders to see recent activity here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allItems.slice(0, 20).map((item, index) => (
            <div key={`${item.type}-${item.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.content || item.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Category: {item.category}</span>
                      <span>Updated: {formatDate(item.updatedAt)}</span>
                      {item.type === 'reminder' && (
                        <span className={`px-2 py-1 rounded ${
                          item.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {allItems.length > 20 && (
            <div className="text-center py-4">
              <p className="text-gray-500">Showing 20 most recent items out of {allItems.length} total</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
