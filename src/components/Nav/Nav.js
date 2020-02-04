import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import FolderNav from 'components/Nav/FolderNav';
import NoteNav from 'components/Nav/NoteNav';
import Error404 from 'components/Error404';

const Nav = () => {
  return (
    <Container>
      <Switch>
        <Route path='/note/:noteId'>
          <NoteNav />
        </Route>
        <Route exact path={['/folder/:folderId', '/']}>
          <FolderNav />
        </Route>
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </Container>
  );
};

const Container = styled.nav`
  grid-area: nav;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  word-wrap: break-word;
`;

export default Nav;
