// core dependencies: react and styled components
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
// custom components
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Main from 'components/Main/Main';

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
              <Main />
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

export default withRouter(App);
