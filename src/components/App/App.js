import React from 'react';
//TODO: Investigate styld components
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import AppHeader from 'components/Header/AppHeader';
import FolderNav from 'components/Nav/FolderNav';
import NoteNav from 'components/Nav/NoteNav';
import NoteContent from 'components/Main/NoteContent';
import NoteList from 'components/Main/NoteList';
import Error404 from 'components/Error404';
import dummyStore from 'dummystore';
import themes from 'styles/themes';
import GlobalStyles from 'styles/GlobalStyles';
import AppContext from 'contexts/AppContext';

import config from 'config';

// app container styles
const AppGrid = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'nav content';
  grid-template-columns: minmax(100px, 290px) 1fr;
  grid-template-rows: 80px 1fr;
  grid-gap: 0rem;
  row-gap: 0rem;
  height: 100vh;

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      'header header'
      'nav nav'
      'content content';
  }
`;

const HeaderArea = styled.header`
  grid-area: header;
  padding: 0 15px;
  background-color: ${props => props.theme.color.foreground};
  color: ${props => props.theme.color.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1030;
`;

const NavArea = styled.nav`
  grid-area: nav;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  word-wrap: break-word;
`;

const MainArea = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  overflow: auto;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      theme: 'moon'
    };
  }

  componentDidMount() {
    //TODO: load data from api call
    this.setState(dummyStore);
    // fetch data and returns {notes: [], folders: []}
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok) return Promise.reject(notesResponse.statusText);
        if (!foldersResponse.ok)
          return Promise.reject(foldersResponse.statusText);
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.log(error);
      });
  }

  switchTheme = event => {
    this.setState({ theme: event.target.value });
  };

  addNote = () => {};
  addFolder = () => {};

  deleteNote = noteId => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, options)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    //TODO: set the theme to light or dark depending on state
    return (
      <AppContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          addNote: this.addNote,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder
        }}
      >
        <ThemeProvider theme={themes[this.state.theme]}>
          <GlobalStyles />
          <AppGrid>
            <HeaderArea>
              <AppHeader
                switchTheme={this.switchTheme}
                theme={this.state.theme}
              />
            </HeaderArea>
            <NavArea>
              <Switch>
                <Route path='/note/:noteId'>
                  <NoteNav />
                </Route>
                <Route path={['/folder/:folderId', '/']}>
                  <FolderNav />
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
            </NavArea>
            <MainArea>
              <Switch>
                <Route path='/note/:noteId'>
                  <NoteContent />
                </Route>
                <Route path='/folder/:folderId'>
                  <NoteList />
                </Route>
                <Route path='/' exact>
                  <NoteList />
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
            </MainArea>
          </AppGrid>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}
