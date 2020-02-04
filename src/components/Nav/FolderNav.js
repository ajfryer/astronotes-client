import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolder,
  faFolderPlus
} from '@fortawesome/free-solid-svg-icons';
import AppContext from 'contexts/AppContext';

const Title = styled.h2`
  text-align: left;
  svg {
    margin-right: 0.5rem;
  }
`;

const FolderList = styled.ul`
  .active {
    color: red;
  }
  list-style: none;
  padding-left: 0.5rem;
  margin: 0;

  li {
    margin: 1.5rem 0;

    a {
      text-decoration: none;
      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;

const AddFolderLink = styled(NavLink)`
  display: block;
  text-align: center;
  width: 100%;
  border-color: ${props => props.theme.color.foreground};
  background-color: transparent;
  border: 0.15rem dashed ${props => props.theme.color.foreground};
  color: ${props => props.theme.color.foreground};
  padding: 1rem 1rem;
  font-weight: normal;
  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: none;
  }
`;

const FolderNav = props => {
  const params = useParams();
  const { folders } = useContext(AppContext);

  const renderFolderLink = folder => {
    return (
      <NavLink to={`/folder/${folder.id}`}>
        <h3>
          {params.folderId === folder.id || !params.folderId ? (
            <FontAwesomeIcon icon={faFolderOpen} />
          ) : (
            <FontAwesomeIcon icon={faFolder} />
          )}
          {folder.name}
        </h3>
      </NavLink>
    );
  };
  return (
    <>
      <Title>
        <FontAwesomeIcon icon={faFolderOpen} />
        Folders
      </Title>

      <FolderList>
        {folders.map(folder => (
          <li key={folder.id}>{renderFolderLink(folder)}</li>
        ))}
      </FolderList>

      <AddFolderLink to={`/addfolder/`}>
        <FontAwesomeIcon icon={faFolderPlus} />
        Add New Folder
      </AddFolderLink>
    </>
  );
};

export default FolderNav;
