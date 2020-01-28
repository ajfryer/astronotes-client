import React, { useContext } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolder,
  faFolderPlus
} from '@fortawesome/free-solid-svg-icons';
import Button from 'components/common/Button';
import AppContext from 'contexts/AppContext';

const Title = styled.h2`
  text-align: center;
  svg {
    margin-right: 0.5rem;
  }
`;

const FolderList = styled.ul`
  .active {
    color: red;
  }
  list-style: none;
  padding-left: 0px;
  margin: 0;

  li {
    margin: 1.5rem 0;
  }
`;

const AddFolderButton = styled(Button)`
  width: 100%;
  border-color: ${props => props.theme.color.foreground};
  background-color: transparent;
  border: 0.15rem dashed ${props => props.theme.color.foreground};
  color: ${props => props.theme.color.foreground};
  padding: 0.75rem 1rem;
  font-size: 1.25rem;
  font-weight: normal;

  svg {
    margin-right: 0.5rem;
  }
`;

const FolderNav = props => {
  const history = useHistory();
  const params = useParams();
  console.log(AppContext);
  const { folders } = useContext(AppContext);
  console.log(folders);
  const renderFolderLink = folder => {
    return (
      <NavLink to={`/folder/${folder.id}`}>
        <h3>
          {params.folderId === folder.id || !params.folderId ? (
            <FontAwesomeIcon icon={faFolderOpen} />
          ) : (
            <FontAwesomeIcon icon={faFolder} />
          )}
          &nbsp;{folder.name}
        </h3>
      </NavLink>
    );
  };
  return (
    <>
      <Title>
        <FontAwesomeIcon icon={faFolder} />
        Folders
      </Title>

      <FolderList>
        {folders.map(folder => (
          <li key={folder.id}>{renderFolderLink(folder)}</li>
        ))}
      </FolderList>

      <AddFolderButton>
        <FontAwesomeIcon icon={faFolderPlus} />
        Add Folder
      </AddFolderButton>
    </>
  );
};

export default FolderNav;
