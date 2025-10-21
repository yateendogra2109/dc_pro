import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import RemindersPage from './pages/RemindersPage';
import CategoriesPage from './pages/CategoriesPage';
import RecentActivityPage from './pages/RecentActivityPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/recent" element={<RecentActivityPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
