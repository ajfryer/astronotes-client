import React from 'react';
import AppContext from 'contexts/AppContext';

const AddFolderForm = styled.form``;

class AddFolder extends React.Component {
  static contextText = AppContext;
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
    this.setState({ folderame: { value: name, touched: true } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
  }

  validateName() {
    const name = this.state.folderName.value;
    spacelessName = name.replace(/\s/g, '');
    if (spacelessName.length === 0) {
      return 'The name must have more than 1 non-space character';
    }
  }

  render() {
    return (
      <AddFolderForm>
        <h2>Add A New Folder</h2>
        {this.state.folderName && (
          <ValidationError message={this.validateName()}></ValidationError>
        )}
        <label htmlFor='folderName'>Enter A Name For The New Folder:</label>
        <input
          type='text'
          name='folderName'
          id='folderName'
          required
          onChange={e => this.updateName(e.target.value)}
        />
        <button
          type='submit'
          className='registration__button'
          disabled={this.validateName()}
        >
          Add New Folder
        </button>
      </AddFolderForm>
    );
  }
}
