import React from 'react';
import AppContext from 'contexts/AppContext';
import styled from 'styled-components';
//import ValidationError from 'components/Forms/ValidationError';

const AddNoteForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 85%;

  label,
  select,
  input {
    width: 290px;
  }

  textarea {
    height: 250px;
  }

  label {
    margin: 1rem 0 1rem 0;
  }

  button {
    width: 100px;
    align-self: flex-end;
    margin-top: 1rem;
  }
`;

class AddNote extends React.Component {
  static contextType = AppContext;

  constructor(props, context) {
    super(props, context);
    const { folders } = context;
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folderName: {
        value: folders[0].name,
        touched: false
      }
    };
  }

  handleSubmit = event => {
    console.log(event.target);
    event.preventDefault();
    const { folders } = this.context;
    const {
      name: { value: name },
      content: { value: content },
      folderName: { value: folderName }
    } = this.state;
    const folderId = folders.filter(folder => folder.name === folderName)[0].id;
    const modified = new Date();
    const { addNote } = this.context;
    addNote({ name, folderId, content, modified });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: { value: value, touched: true }
    });
  };

  validateName = () => {
    const name = this.state.name.value.replace(/\s/g, '');
    if (name.length === 0) {
      return 'Name of new note must have more than 1 non-space character';
    }
  };

  validateContent = () => {
    const content = this.state.content.value.replace(/\s/g, '');
    if (content.length === 0) {
      return 'No note content. Please enter some content!';
    }
  };

  render() {
    const { folders } = this.context;
    return (
      <AddNoteForm onSubmit={e => this.handleSubmit(e)}>
        <fieldset>
          <label htmlFor='name'>Name New Note:</label>
          <input
            type='text'
            name='name'
            id='name'
            required
            onChange={e => this.handleInputChange(e)}
          />
          <label htmlFor='folderName'>Select A Folder:</label>
          <select
            value={this.state.folderName.value}
            onChange={e => this.handleInputChange(e)}
            name='folderName'
            id='folderName'
          >
            {folders.map(folder => (
              <option value={folder.name} key={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </fieldset>
        <label htmlFor='content'>Add Note Content:</label>
        <textarea
          name='content'
          id='content'
          value={this.state.content.value}
          onChange={e => this.handleInputChange(e)}
          required
        />
        <button
          type='submit'
          disabled={this.validateName() || this.validateContent()}
        >
          Submit
        </button>
      </AddNoteForm>
    );
  }
}

export default AddNote;
