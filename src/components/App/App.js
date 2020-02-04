// core dependencies: react and styled components
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
// custom components
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import NoteContent from 'components/Main/NoteContent';
import NoteList from 'components/Main/NoteList';
import AddFolder from 'components/Forms/AddFolder';
import Error404 from 'components/Error404';
import AddNote from 'components/Forms/AddNote';
import Loader from 'components/common/Loader';
// global dynamic styles
import themes from 'styles/themes';
import GlobalStyles from 'styles/GlobalStyles';
// contexts
import AppContext from 'contexts/AppContext';
// server api
import jsonServerApi from 'api/jsonServerApi';

/*
 * App Component
 * =============
 * - lowest common ancestor component
 * - maintains state for most of the remaining components
 * - handles callback functions for api interactivity
 * - sets global context value
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      loaded: false,
      theme: 'moon',
      error: false
    };
  }

  async componentDidMount() {
    try {
      const { notes, folders } = await jsonServerApi.getAll();
      this.setState({ notes, folders, loaded: true }); // success
    } catch (error) {
      console.log(error); // failure
    }
  }

  addNote = async note => {
    try {
      note = await jsonServerApi.addNote(note);
      this.setState(prevState => ({
        notes: [...prevState.notes, note]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  addFolder = async folderName => {
    try {
      const folder = await jsonServerApi.addFolder(folderName);
      this.setState(prevState => ({
        folders: [...prevState.folders, folder]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  deleteNote = async noteId => {
    try {
      await jsonServerApi.deleteNote(noteId);
      this.setState(prevState => ({
        notes: prevState.notes.filter(note => note.id !== noteId)
      }));
    } catch (error) {
      console.log(error);
    }
  };

  switchTheme = event => {
    this.setState({ theme: event.target.value });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          theme: this.state.theme,
          switchTheme: this.switchTheme,
          notes: this.state.notes,
          folders: this.state.folders,
          addNote: this.addNote,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder
        }}
      >
        <ThemeProvider theme={themes[this.state.theme]}>
          <GlobalStyles />
          <Grid>
            <Header />
            <Loader loaded={this.state.loaded}>
              <Nav />
              <Main>
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
              </Main>
            </Loader>
          </Grid>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}

// app container styles
const Grid = styled.div`
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

const Main = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.color.background};
  padding: 15px;
  overflow: auto;
`;

export default withRouter(App);
