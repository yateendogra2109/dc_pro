import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './noteSlice';
import remindersReducer from './reminderSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    reminders: remindersReducer,
    user: userReducer,
  },
});

export default store;