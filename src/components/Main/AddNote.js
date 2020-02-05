import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from 'context/Context';
import styled from 'styled-components';
//import ValidationError from 'components/Forms/ValidationError';

const AddNoteForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.color.foreground};

  label,
  select,
  input,
  button {
    width: 260px;
    align-self: center;
    margin: 1rem auto;
  }

  input,
  button,
  select {
    height: 3rem;
  }

  textarea {
    width: 100%;
    height: auto;
    min-height: 100%;
  }

  label {
  }

  fieldset {
    border: none;
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
  }

  button {
    color: ${props => props.theme.color.background};
    background-color: ${props => props.theme.color.accent1};
    border-color: ${props => props.theme.color.accent2};
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    border-width: 1px;
    background-image: linear-gradient(
      to bottom,
      #fff,
      ${props => props.theme.color.accent1}
    );

    &:disabled {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      background-image: none;
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

class AddNote extends React.Component {
  static contextType = Context;

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
    this.props.history.push('/');
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
          <button
            type='submit'
            disabled={this.validateName() || this.validateContent()}
          >
            Submit
          </button>
        </fieldset>
        <fieldset>
          <label htmlFor='content'>Add Note Content:</label>
          <textarea
            name='content'
            id='content'
            value={this.state.content.value}
            onChange={e => this.handleInputChange(e)}
            required
          />
        </fieldset>
      </AddNoteForm>
    );
  }
}

export default withRouter(AddNote);
