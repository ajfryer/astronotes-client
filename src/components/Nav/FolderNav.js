import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolder,
  faFolderPlus,
  faLevelUpAlt
} from '@fortawesome/free-solid-svg-icons';
import Context from 'context/Context';

const Title = styled.h2`
  margin: auto 0;
  text-align: left;
  svg {
    margin-right: 0.5rem;
  }
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
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
  text-align: center;
  padding: 0rem 0rem;
  font-weight: normal;
  text-decoration: none;
  height: auto;
  max-width: 125px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.color.background};
  background-color: ${props => props.theme.color.accent1};
  border-color: ${props => props.theme.color.accent2};
  padding: 0.25rem 0.5rem;
  background-image: linear-gradient(
    to bottom,
    #fff,
    ${props => props.theme.color.accent1}
  );

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: none;
  }
`;

const FolderNav = props => {
  const params = useParams();
  const { folders } = useContext(Context);

  const renderFolderLink = folder => {
    return (
      <NavLink to={`/folder/${folder.id}`}>
        <h3>
          <FontAwesomeIcon icon={faLevelUpAlt} className="fa-rotate-90" />
          {Number(params.folderId) === folder.id || !params.folderId ? (
            <FontAwesomeIcon icon={faFolderOpen} className="fa-fw" />
          ) : (
            <FontAwesomeIcon icon={faFolder} className="fa-fw" />
          )}
          {folder.name}
        </h3>
      </NavLink>
    );
  };
  return (
    <>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faFolderOpen} />
          Folders
        </Title>
        <AddFolderLink to={`/addfolder/`}>
          <FontAwesomeIcon icon={faFolderPlus} />
          <div>Add Folder</div>
        </AddFolderLink>
      </Header>
      <FolderList>
        {folders.map(folder => (
          <li key={folder.id}>{renderFolderLink(folder)}</li>
        ))}
      </FolderList>
    </>
  );
};

export default FolderNav;
