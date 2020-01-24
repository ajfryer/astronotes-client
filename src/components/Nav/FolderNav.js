import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

const FolderList = styled.ul`
  .active {
    color: red;
  }
`;

const FolderNav = props => {
  //const history = useHistory();
  return (
    <>
      <h2>Folders</h2>
      <FolderList>
        {props.folders.map(folder => (
          <li key={folder.id}>
            <NavLink className='' to={`/folder/${folder.id}`}>
              {folder.name}
            </NavLink>
          </li>
        ))}
      </FolderList>
      <button>Add Folder</button>
    </>
  );
};

export default FolderNav;
