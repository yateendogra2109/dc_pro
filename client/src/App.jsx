import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import RemindersPage from './pages/RemindersPage';
import CategoriesPage from './pages/CategoriesPage';
import RecentActivityPage from './pages/RecentActivityPage';
import LoginPage from './pages/LoginPage';
import TailwindTest from './TailwindTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/recent" element={<RecentActivityPage />} />
        <Route path="/test-tailwind" element={<TailwindTest />} />
      </Routes>
    </Router>
  );
}

export default App;

//eeeeee
