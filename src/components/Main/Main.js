// core dependencies
import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
// custom components
import NoteContent from 'components/Main/NoteContent';
import NoteList from 'components/Main/NoteList';
import AddFolder from 'components/Main/AddFolder';
import Error404 from 'components/Common/Error404';
import AddNote from 'components/Main/AddNote';
import ErrorBoundary from 'components/Common/ErrorBoundary';

/*
 * Main Component
 * ==============
 * - Handles its own switch and route components
 * - views: NoteList, NoteContent, AddFolder, AddNote
 *
 */
const Main = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Switch>
          <Route exact path={['/folder/:folderId', '/']}>
            <NoteList />
          </Route>
          <Route path='/note/:noteId'>
            <NoteContent />
          </Route>
          <Route path='/addfolder/'>
            <AddFolder />
          </Route>
          <Route path='/addnote/'>
            <AddNote />
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
const Container = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  overflow: auto;

  @media only screen and (max-width: 600px) {
    overflow: visible;
  }
`;

export default Main;
