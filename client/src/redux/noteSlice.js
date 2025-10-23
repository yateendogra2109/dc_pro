import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shortNotes: [
    {
      id: '1',
      title: 'Welcome to NotesApp!',
      content: 'This is your first short note. You can create, edit, and delete notes easily.',
      category: 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Quick Reminder',
      content: 'Don\'t forget to check out all the different pages using the navigation above!',
      category: 'personal',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ],
  longNotes: [
    {
      id: '1',
      title: 'Getting Started Guide',
      content: 'Welcome to NotesApp! This application helps you manage your notes and reminders efficiently.\n\nFeatures:\n- Create short and long notes\n- Set reminders with due dates\n- Organize by categories\n- View recent activity\n\nNavigation:\nUse the navigation bar above to switch between different sections of the app.',
      category: 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Short Notes Actions
    addShortNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
        category: action.payload.category || 'general',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.shortNotes.unshift(newNote);
    },
    
    updateShortNote: (state, action) => {
      const { id, title, content, category } = action.payload;
      const noteIndex = state.shortNotes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.shortNotes[noteIndex] = {
          ...state.shortNotes[noteIndex],
          title,
          content,
          category,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    
    deleteShortNote: (state, action) => {
      state.shortNotes = state.shortNotes.filter(note => note.id !== action.payload);
    },
    
    // Long Notes Actions
    addLongNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
        category: action.payload.category || 'general',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.longNotes.unshift(newNote);
    },
    
    updateLongNote: (state, action) => {
      const { id, title, content, category } = action.payload;
      const noteIndex = state.longNotes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.longNotes[noteIndex] = {
          ...state.longNotes[noteIndex],
          title,
          content,
          category,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    
    deleteLongNote: (state, action) => {
      state.longNotes = state.longNotes.filter(note => note.id !== action.payload);
    },
    
    // General Actions
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
  addShortNote,
  updateShortNote,
  deleteShortNote,
  addLongNote,
  updateLongNote,
  deleteLongNote,
  setLoading,
  setError,
  clearError,
} = noteSlice.actions;

export default noteSlice.reducer;