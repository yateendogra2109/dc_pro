import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  // Try to get data from Redux store, fallback to empty arrays if not available
  const notes = useSelector(state => state.notes || { shortNotes: [], longNotes: [] });
  const reminders = useSelector(state => state.reminders || { reminders: [] });
  const { user } = useAuth();

  const { shortNotes = [], longNotes = [] } = notes;
  const { reminders: reminderList = [] } = reminders;

  const pendingReminders = reminderList.filter(r => !r.isCompleted).length;
  const completedReminders = reminderList.filter(r => r.isCompleted).length;
  const totalNotes = shortNotes.length + longNotes.length;

  const recentShortNotes = shortNotes.slice(0, 3);
  const recentLongNotes = longNotes.slice(0, 2);
  const upcomingReminders = reminderList
    .filter(r => !r.isCompleted)
    .slice(0, 3);

  console.log('Dashboard rendering - Current URL:', window.location.pathname);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📝 NotesApp
              </h1>
              <p className="text-gray-600 mt-1">Your personal note-taking companion</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug indicator */}
        <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-lg mb-6 text-center font-medium">
          📍 You are currently on the <strong>DASHBOARD</strong> - This is the main page with overview and stats
        </div>
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to organize your thoughts and boost your productivity?
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Short Notes</h3>
                <p className="text-gray-600">{shortNotes.length} total</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Long Notes</h3>
                <p className="text-gray-600">{longNotes.length} total</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pending Reminders</h3>
                <p className="text-gray-600">{pendingReminders} pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Completed Tasks</h3>
                <p className="text-gray-600">{completedReminders} completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Notes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/notes"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-200 transform hover:scale-105 text-center"
            >
              <span className="text-2xl mb-2 block">✏️</span>
              <span className="font-medium">New Note</span>
            </Link>
            
            <Link 
              to="/reminders"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition duration-200 transform hover:scale-105 text-center"
            >
              <span className="text-2xl mb-2 block">⏰</span>
              <span className="font-medium">Set Reminder</span>
            </Link>
            
            <Link 
              to="/categories"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition duration-200 transform hover:scale-105 text-center"
            >
              <span className="text-2xl mb-2 block">📁</span>
              <span className="font-medium">New Category</span>
            </Link>
            
            <Link 
              to="/recent"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition duration-200 transform hover:scale-105 text-center"
            >
              <span className="text-2xl mb-2 block">🔍</span>
              <span className="font-medium">Recent Activity</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}