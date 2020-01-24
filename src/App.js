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
import 'App.css';

// app container styles
const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'nav content';
  grid-template-columns: 0.33fr 0.66fr;
  grid-template-rows: 120px 1fr;
  grid-gap: 0px;
  height: 100vh;
`;

const HeaderContainer = styled.header`
  grid-area: header;
  padding: 0 15px;
  background-color: ${props => props.theme.color.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavContainer = styled.nav`
  grid-area: nav;
  background-color: ${props => props.theme.color.primaryVariant};
  padding: 15px;
`;

const MainContainer = styled.main`
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
      isDarkTheme: false
    };
  }

  componentDidMount() {
    //TODO: load data from api call
    this.setState(dummyStore);
  }

  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  };

  render() {
    //TODO: set the theme to light or dark depending on state
    return (
      <ThemeProvider
        theme={this.state.isDarkTheme ? themes.dark : themes.light}
      >
        <GlobalStyles />
        <AppContainer>
          <HeaderContainer>
            <AppHeader
              toggleTheme={this.toggleTheme}
              isDarkTheme={this.state.isDarkTheme}
            />
          </HeaderContainer>
          <Switch>
            {/*TODO: use Context to eliminate the use of children method*/}
            <Route
              path='/note/:noteId'
              children={({ match }) => {
                const note = this.state.notes.find(
                  n => n.id === match.params.noteId
                );
                const folder = this.state.folders.find(
                  f => f.id === note.folderId
                );
                console.log(note, folder);
                return (
                  <>
                    <NavContainer>
                      <NoteNav folder={folder} />
                    </NavContainer>
                    <MainContainer>
                      <NoteContent note={note} />
                    </MainContainer>
                  </>
                );
              }}
            />
            {/*TODO: use Context to eliminate the use of children method*/}
            <Route
              path='/folder/:folderId'
              children={({ match }) => {
                const folder = this.state.folders.find(
                  f => f.id === match.params.folderId
                );
                const notes = this.state.notes.filter(
                  n => n.folderId === match.params.folderId
                );
                return (
                  <>
                    <NavContainer>
                      <FolderNav
                        folders={this.state.folders}
                        activeFolder={folder}
                      />
                    </NavContainer>
                    <MainContainer>
                      <NoteList notes={notes} />
                    </MainContainer>
                  </>
                );
              }}
            />
            <Route path='/' exact>
              <NavContainer>
                <FolderNav folders={this.state.folders} />
              </NavContainer>
              <MainContainer>
                <NoteList notes={this.state.notes} />
              </MainContainer>
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </AppContainer>
      </ThemeProvider>
    );
  }
}
