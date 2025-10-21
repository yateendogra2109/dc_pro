import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { shortNotes, longNotes } = useSelector(state => state.notes);
  const { reminders } = useSelector(state => state.reminders);

  const pendingReminders = reminders.filter(r => !r.isCompleted).length;
  const completedReminders = reminders.filter(r => r.isCompleted).length;
  const totalNotes = shortNotes.length + longNotes.length;

  const recentShortNotes = shortNotes.slice(0, 3);
  const recentLongNotes = longNotes.slice(0, 2);
  const upcomingReminders = reminders
    .filter(r => !r.isCompleted)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your notes, reminders, and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📝</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Short Notes</p>
              <p className="text-2xl font-bold text-gray-900">{shortNotes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📄</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Long Notes</p>
              <p className="text-2xl font-bold text-gray-900">{longNotes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏰</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reminders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingReminders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{completedReminders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Notes</h2>
            <Link 
              to="/notes" 
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          
          {totalNotes === 0 ? (
            <p className="text-gray-500 text-center py-8">No notes yet. Create your first note!</p>
          ) : (
            <div className="space-y-3">
              {recentShortNotes.map(note => (
                <div key={note.id} className="border-l-4 border-blue-400 pl-3 py-2">
                  <h4 className="font-medium text-gray-800">{note.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{note.content}</p>
                  <span className="text-xs text-gray-400">Short Note</span>
                </div>
              ))}
              {recentLongNotes.map(note => (
                <div key={note.id} className="border-l-4 border-green-400 pl-3 py-2">
                  <h4 className="font-medium text-gray-800">{note.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{note.content}</p>
                  <span className="text-xs text-gray-400">Long Note</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Reminders</h2>
            <Link 
              to="/reminders" 
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          
          {upcomingReminders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending reminders. You're all caught up!</p>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.map(reminder => (
                <div key={reminder.id} className="border-l-4 border-yellow-400 pl-3 py-2">
                  <h4 className="font-medium text-gray-800">{reminder.title}</h4>
                  <p className="text-sm text-gray-600">{reminder.description}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-400">
                      {new Date(reminder.dueDate).toLocaleDateString()}
                      {reminder.dueTime && ` at ${reminder.dueTime}`}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
                      reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {reminder.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/notes"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-medium text-gray-800">Create Note</h3>
              <p className="text-sm text-gray-600">Add a new short or long note</p>
            </div>
          </Link>
          
          <Link 
            to="/reminders"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <span className="text-2xl">⏰</span>
            <div>
              <h3 className="font-medium text-gray-800">Set Reminder</h3>
              <p className="text-sm text-gray-600">Create a new reminder</p>
            </div>
          </Link>
          
          <Link 
            to="/categories"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <span className="text-2xl">🏷️</span>
            <div>
              <h3 className="font-medium text-gray-800">Organize</h3>
              <p className="text-sm text-gray-600">Manage categories</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
