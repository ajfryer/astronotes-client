import React from 'react';

export default React.createContext({
  theme: [],
  switchTheme: () => null,
  notes: [],
  folders: [],
  deleteNote: () => null,
  addNote: () => null,
  addFolder: () => null,
  updateNote: () => null
});
