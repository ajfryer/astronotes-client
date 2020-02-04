import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import NoteContent from 'components/Main/NoteContent';
import NoteList from 'components/Main/NoteList';
import AddFolder from 'components/Forms/AddFolder';
import Error404 from 'components/Error404';
import AddNote from 'components/Forms/AddNote';

const Main = () => {
  return (
    <Container>
      <Switch>
        <Route path='/note/:noteId'>
          <NoteContent />
        </Route>
        <Route exact path={['/folder/:folderId', '/']}>
          <NoteList />
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
    </Container>
  );
};

const Container = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  overflow: auto;
`;

export default Main;
