import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import RemindersPage from './pages/RemindersPage';
import CategoriesPage from './pages/CategoriesPage';
import RecentActivityPage from './pages/RecentActivityPage';
import LoginPage from './pages/LoginPage';

function App() {
  console.log('App component rendering - Current URL:', window.location.pathname);
  
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="py-6">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/notes" element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              } />
              <Route path="/reminders" element={
                <ProtectedRoute>
                  <RemindersPage />
                </ProtectedRoute>
              } />
              <Route path="/categories" element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              } />
              <Route path="/recent" element={
                <ProtectedRoute>
                  <RecentActivityPage />
                </ProtectedRoute>
              } />
              {/* Catch all route - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
