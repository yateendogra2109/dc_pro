import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReminderForm from '../components/ReminderForm';
import ReminderCard from '../components/ReminderCard';

export default function RemindersPage() {
  const { reminders } = useSelector(state => state.reminders);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'pending') return !reminder.isCompleted;
    if (filter === 'completed') return reminder.isCompleted;
    return true;
  });

  const pendingCount = reminders.filter(r => !r.isCompleted).length;
  const completedCount = reminders.filter(r => r.isCompleted).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Debug indicator */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg mb-6 text-center font-medium">
        📍 You are currently on the <strong>REMINDERS PAGE</strong> - Use the navigation above to go to Dashboard, Notes, etc.
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reminders</h1>
          <p className="text-gray-600 mt-1">
            {pendingCount} pending, {completedCount} completed
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
        >
          {showForm ? '✕ Cancel' : '+ Add Reminder'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { key: 'all', label: 'All', count: reminders.length },
          { key: 'pending', label: 'Pending', count: pendingCount },
          { key: 'completed', label: 'Completed', count: completedCount }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              filter === key
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Add Reminder Form */}
      {showForm && (
        <ReminderForm onClose={() => setShowForm(false)} />
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              {filter === 'all' ? 'No reminders yet' : 
               filter === 'pending' ? 'No pending reminders' : 
               'No completed reminders'}
            </h3>
            <p className="text-gray-400">
              {filter === 'all' ? 'Create your first reminder to get started!' : ''}
            </p>
          </div>
        ) : (
          filteredReminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))
        )}
      </div>
    </div>
  );
}
