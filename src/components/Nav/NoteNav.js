import React, { useContext } from 'react';
// used a hook instead of passing routeprops
import { useHistory, useParams } from 'react-router-dom';
import Context from 'context/Context';

const NoteNav = props => {
  const history = useHistory();
  const params = useParams();
  const { notes, folders } = useContext(Context);
  const note = notes.find(note => note.id === params.noteId);
  const folder = folders.find(folder => folder.id === note.folderId);
  return (
    <div>
      <button onClick={() => history.goBack()}>Back To All Folders</button>
      <h2>{folder && folder.name}</h2>
    </div>
  );
};

export default NoteNav;
