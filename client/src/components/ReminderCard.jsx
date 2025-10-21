import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleReminderComplete, deleteReminder } from '../redux/reminderSlice';
import ReminderForm from './ReminderForm';

export default function ReminderCard({ reminder }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    dispatch(toggleReminderComplete(reminder.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      dispatch(deleteReminder(reminder.id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString();
    return time ? `${dateStr} at ${time}` : dateStr;
  };

  if (isEditing) {
    return (
      <ReminderForm 
        reminder={reminder} 
        onClose={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className={`border-l-4 rounded-lg shadow-sm p-4 mb-3 ${getPriorityColor(reminder.priority)} ${reminder.isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={reminder.isCompleted}
              onChange={handleToggleComplete}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <h3 className={`font-semibold text-lg ${reminder.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {reminder.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
              reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {reminder.priority}
            </span>
          </div>

          {reminder.description && (
            <p className={`text-gray-600 mb-2 ${reminder.isCompleted ? 'line-through' : ''}`}>
              {reminder.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              📅 {formatDateTime(reminder.dueDate, reminder.dueTime)}
            </span>
            <span className="flex items-center gap-1">
              🏷️ {reminder.category}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 p-1"
            title="Edit reminder"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete reminder"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}