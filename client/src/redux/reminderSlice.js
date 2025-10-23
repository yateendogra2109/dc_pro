import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [
    {
      id: '1',
      title: 'Explore the App',
      description: 'Take some time to explore all the features of NotesApp',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      dueTime: '10:00',
      priority: 'medium',
      category: 'personal',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Create Your First Note',
      description: 'Try creating your own note using the Notes page',
      dueDate: new Date().toISOString().split('T')[0], // Today
      dueTime: '14:00',
      priority: 'high',
      category: 'general',
      isCompleted: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const newReminder = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        dueTime: action.payload.dueTime,
        priority: action.payload.priority || 'medium',
        category: action.payload.category || 'general',
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.reminders.push(newReminder);
      // Sort by due date
      state.reminders.sort((a, b) => new Date(a.dueDate + ' ' + a.dueTime) - new Date(b.dueDate + ' ' + b.dueTime));
    },
    
    updateReminder: (state, action) => {
      const { id, title, description, dueDate, dueTime, priority, category } = action.payload;
      const reminderIndex = state.reminders.findIndex(reminder => reminder.id === id);
      if (reminderIndex !== -1) {
        state.reminders[reminderIndex] = {
          ...state.reminders[reminderIndex],
          title,
          description,
          dueDate,
          dueTime,
          priority,
          category,
          updatedAt: new Date().toISOString(),
        };
        // Re-sort after update
        state.reminders.sort((a, b) => new Date(a.dueDate + ' ' + a.dueTime) - new Date(b.dueDate + ' ' + b.dueTime));
      }
    },
    
    toggleReminderComplete: (state, action) => {
      const reminderIndex = state.reminders.findIndex(reminder => reminder.id === action.payload);
      if (reminderIndex !== -1) {
        state.reminders[reminderIndex].isCompleted = !state.reminders[reminderIndex].isCompleted;
        state.reminders[reminderIndex].updatedAt = new Date().toISOString();
      }
    },
    
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(reminder => reminder.id !== action.payload);
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addReminder,
  updateReminder,
  toggleReminderComplete,
  deleteReminder,
  setLoading,
  setError,
  clearError,
} = reminderSlice.actions;

export default reminderSlice.reducer;