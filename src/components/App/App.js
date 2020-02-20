// core dependency
import React from 'react';
// custom components
import Theme from 'components/Common/Theme';
import Page from 'components/Page/Page';
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import Main from 'components/Main/Main';
import Loader from 'components/Common/Loader';
// react context
import Context from 'context/Context.js';
// server api
import jsonServer from 'client/jsonServerAPI';

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

  updateNote = async note => {
    // try/catch to update note to server and state
    try {
      const updateRequest = await jsonServer.updateNote(note);
      if (updateRequest === true) {
        this.setState(prevState => ({
          notes: [...prevState.notes.filter(n => n.id !== note.id), note]
        }));
      } else throw new Error(`Failed to modify note ${note.id}`);
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
      addFolder: this.addFolder,
      updateNote: this.updateNote
    };
    return (
      <Context.Provider value={value}>
        <Theme>
          <Page>
            <Header />
            <Loader loaded={this.state.loaded}>
              <Nav />
              <Main />
            </Loader>
          </Page>
        </Theme>
      </Context.Provider>
    );
  }
}

export default App;
