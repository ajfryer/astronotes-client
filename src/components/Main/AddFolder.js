import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from 'contexts/AppContext';
import styled from 'styled-components';
import ValidationError from 'components/Common/ValidationError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

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
    const { addFolder } = this.context;
    addFolder(name);
    this.props.history.push('/');
  };

  validateName() {
    const name = this.state.folderName.value;
    const spacelessName = name.replace(/\s/g, '');
    if (spacelessName.length === 0) {
      return 'The name must have more than 1 non-space character';
    }
  }

  render() {
    this.value = this.context;
    return (
      <>
        <Header>
          <Title>
            <FontAwesomeIcon icon={faFolder} />
            Add A New Folder
          </Title>
        </Header>
        <AddFolderForm onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='folderName'>Enter A Name For The New Folder:</label>
          <input
            type='text'
            name='folderName'
            id='folderName'
            required
            onChange={e => this.updateName(e.target.value)}
          />
          <button type='submit' disabled={this.validateName()}>
            Submit
          </button>
          {this.state.folderName.touched && (
            <ValidationError message={this.validateName()}></ValidationError>
          )}
        </AddFolderForm>
      </>
    );
  }
}

const Title = styled.h2`
  margin: auto 0;
  text-align: left;
  svg {
    margin-right: 0.5rem;
  }
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  margin: 0.5rem 0 2rem 0;
  justify-content: center;
`;

const AddFolderForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.color.foreground};

  label,
  input,
  button {
    width: 290px;
  }

  input,
  button {
    height: 3rem;
    margin: 1rem 0;
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
`;

export default withRouter(AddFolder);
