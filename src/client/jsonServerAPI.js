/*
 * json server API methods
 */

// configuration
import config from 'config/config';

// API base url
const baseUrl = config.API_BASE_URL;

// GET: /notes and /folders
const getAll = async () => {
  const [notesResponse, foldersResponse] = await Promise.all([
    fetch(`${baseUrl}/notes`),
    fetch(`${baseUrl}/folders`)
  ]);
  if (!notesResponse.ok) throw new Error(notesResponse.statusText);
  if (!foldersResponse.ok) throw new Error(foldersResponse.statusText);
  const [notes, folders] = await Promise.all([
    notesResponse.json(),
    foldersResponse.json()
  ]);
  return { notes, folders };
};

// POST: /notes
const addNote = async note => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  };
  const noteResponse = await fetch(`${baseUrl}/notes`, options);
  if (!noteResponse.ok) throw new Error(noteResponse.statusText);
  const id = await noteResponse.json();
  return { id: id, ...note };
};

// PATCH: /notes
const updateNote = async note => {
  const modifiedNote = Object.assign({}, note);
  delete modifiedNote.id;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modifiedNote)
  };
  const noteResponse = await fetch(
    `${baseUrl}/notes/${Number(note.id)}`,
    options
  );
  if (!noteResponse.ok) throw new Error(noteResponse.statusText);
  return true;
};

// POST: /folders
const addFolder = async folderName => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: folderName })
  };
  const folderResponse = await fetch(`${baseUrl}/folders`, options);
  if (!folderResponse.ok) throw new Error(folderResponse.statusText);
  const folder = await folderResponse.json();
  return { name: folderName, ...folder };
};

// DELETE: /notes/:noteId
const deleteNote = async noteId => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
  if (!response.ok) throw new Error(response.statusText);
};

export default { getAll, addNote, addFolder, deleteNote, updateNote };
