// core dependencies
import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
// custom components
import FolderNav from 'components/Nav/FolderNav';
import NoteNav from 'components/Nav/NoteNav';
import Error404 from 'components/Common/Error404';
import ErrorBoundary from 'components/Common/ErrorBoundary';

/*
 * Nav Component
 * =============
 * - Grid Area Container
 * - Handles its own switch and route components
 * - views: FolderNav, NoteNav, Error404
 *
 */
const Nav = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Switch>
          <Route path={['/folder/:folderId', '/']}>
            <FolderNav />
          </Route>
          <Route path='/note/:noteId'>
            <NoteNav />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </ErrorBoundary>
    </Container>
  );
};

// custom styled components
const Container = styled.nav`
  grid-area: nav;
  background-color: ${props => props.theme.color.background};
  padding: 15px 10px;
  word-wrap: break-word;
  min-height: calc(50vh - 75px);
  overflow-y: scroll;
`;

export default Nav;
