// core dependencies: react and styled components
import React from 'react';
import styled from 'styled-components';
// custom components
import Theme from 'components/Common/Theme';
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Main from 'components/Main/Main';
import Loader from 'components/Common/Loader';
// react contexts
import AppContext from 'contexts/AppContext';
// json server api
import jsonServer from 'apis/jsonServer';

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
      const { notes, folders } = await jsonServer.getAll();
      this.setState({ notes, folders, loaded: true }); // success
    } catch (error) {
      console.log(error); // failure
    }
  }

  addNote = async note => {
    // try/catch to add note to server and state
    try {
      note = await jsonServer.addNote(note);
      this.setState(prevState => ({
        notes: [...prevState.notes, note]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  addFolder = async folderName => {
    // try/catch to add folder to server and state
    try {
      const folder = await jsonServer.addFolder(folderName);
      this.setState(prevState => ({
        folders: [...prevState.folders, folder]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  deleteNote = async noteId => {
    // try/catch to delete note from server and set
    try {
      await jsonServer.deleteNote(noteId);
      this.setState(prevState => ({
        notes: prevState.notes.filter(note => note.id !== noteId)
      }));
    } catch (error) {
      console.log(error);
    }
  };

  switchTheme = event => {
    // sets theme in state
    this.setState({ theme: event.target.value });
  };

  render() {
    const value = {
      theme: this.state.theme,
      switchTheme: this.switchTheme,
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder
    };
    return (
      <AppContext.Provider value={value}>
        <Theme>
          <Grid>
            <Header />
            <Loader loaded={this.state.loaded}>
              <Nav />
              <Main />
            </Loader>
          </Grid>
        </Theme>
      </AppContext.Provider>
    );
  }
}

// custom styled components

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

export default App;
