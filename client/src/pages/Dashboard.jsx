import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                <p className="text-gray-600">0 total</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Reminders</h3>
                <p className="text-gray-600">0 pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                <p className="text-gray-600">0 created</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-200 transform hover:scale-105">
              <span className="text-2xl mb-2 block">✏️</span>
              <span className="font-medium">New Note</span>
            </button>
            
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition duration-200 transform hover:scale-105">
              <span className="text-2xl mb-2 block">⏰</span>
              <span className="font-medium">Set Reminder</span>
            </button>
            
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition duration-200 transform hover:scale-105">
              <span className="text-2xl mb-2 block">📁</span>
              <span className="font-medium">New Category</span>
            </button>
            
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition duration-200 transform hover:scale-105">
              <span className="text-2xl mb-2 block">🔍</span>
              <span className="font-medium">Search Notes</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
