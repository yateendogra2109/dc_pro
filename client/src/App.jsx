import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import RemindersPage from './pages/RemindersPage';
import CategoriesPage from './pages/CategoriesPage';
import RecentActivityPage from './pages/RecentActivityPage';
import LoginPage from './pages/LoginPage';
import TailwindTest from './TailwindTest';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
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
          <Route path="/test-tailwind" element={
            <ProtectedRoute>
              <TailwindTest />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

//eeeeee
