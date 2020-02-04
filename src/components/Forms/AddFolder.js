import React from 'react';
import AppContext from 'contexts/AppContext';
import styled from 'styled-components';
import ValidationError from 'components/Forms/ValidationError';

const AddFolderForm = styled.form`
  button {
    display: block;
  }
`;

class AddFolder extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
        touched: false
      }
    };
  }

  updateName(name) {
    this.setState({ folderName: { value: name, touched: true } });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const name = this.state.folderName.value;
    console.log(name);
    let value = this.context;
    console.log(value);
    console.log(this.value);
    const { addFolder } = this.context;
    addFolder(name);
  };

  validateName() {
    const name = this.state.folderName.value;
    console.log(name);
    const spacelessName = name.replace(/\s/g, '');
    if (spacelessName.length === 0) {
      return 'The name must have more than 1 non-space character';
    }
  }

  render() {
    this.value = this.context;
    return (
      <AddFolderForm onSubmit={e => this.handleSubmit(e)}>
        <h2>Add A New Folder</h2>

        <label htmlFor='folderName'>Enter A Name For The New Folder:</label>
        <input
          type='text'
          name='folderName'
          id='folderName'
          required
          onChange={e => this.updateName(e.target.value)}
        />
        {this.state.folderName.touched && (
          <ValidationError message={this.validateName()}></ValidationError>
        )}
        <button
          type='submit'
          className='registration__button'
          disabled={this.validateName()}
        >
          Submit
        </button>
      </AddFolderForm>
    );
  }
}

export default AddFolder;
