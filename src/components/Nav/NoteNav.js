import React from 'react';
// used a hook instead of passing routeprops
import { useHistory } from 'react-router-dom';

const NoteNav = props => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.goBack()}>Back To All Folders</button>
      <h2>{props.folder && props.folder.name}</h2>
    </div>
  );
};

export default NoteNav;
