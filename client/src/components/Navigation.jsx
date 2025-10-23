import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  console.log('Navigation rendering - Current location:', location.pathname, 'Authenticated:', isAuthenticated);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/notes', label: 'Notes', icon: '📝' },
    { path: '/reminders', label: 'Reminders', icon: '⏰' },
    { path: '/categories', label: 'Categories', icon: '🏷️' },
    { path: '/recent', label: 'Recent Activity', icon: '📊' },
  ];

  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 mr-8 hover:text-blue-800 transition duration-200">
              📋 NotesApp
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:flex space-x-1">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      location.pathname === item.path
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="text-gray-600 text-sm">
                Welcome! Use navigation above to explore.
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && (
          <div className="md:hidden pb-3">
            <div className="flex space-x-1 overflow-x-auto">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}