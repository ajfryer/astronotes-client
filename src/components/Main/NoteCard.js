import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import Context from 'context/Context';
import PropTypes from 'prop-types';

const NoteCard = props => {
  const history = useHistory();
  const params = useParams();
  const { deleteNote } = useContext(Context);
  //handle the button click
  const handleClick = (event, noteId) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.name === 'edit') {
      history.push(`/editnote/${noteId}`);
    }

    if (event.target.name === 'delete') {
      deleteNote(noteId);
      if (params.noteId === String(noteId)) history.push('/');
    }
  };
  return (
    <Card>
      <h3>
        <TitleIcon icon={faStickyNote} />
        {props.note.name}
      </h3>
      <LastModified>
        Last modified on {moment(props.note.modified).format('Do MMM YYYY')}
      </LastModified>
      {props.content &&
        props.content.split(/\n \r|\n/).map((para, i) => <p key={i}>{para}</p>)}
      <Options>
        <OptionButton
          name="edit"
          onClick={event => handleClick(event, props.note.id)}
        >
          <EditNoteIcon icon={faPen} />
          Edit
        </OptionButton>
        <OptionButton
          name="delete"
          onClick={event => handleClick(event, props.note.id)}
        >
          <DeleteNoteIcon icon={faTrash} />
          Delete
        </OptionButton>
      </Options>
    </Card>
  );
};

const TitleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const DeleteNoteIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  font-size: 85%;
  vertical-align: -5%;
`;

const EditNoteIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  font-size: 85%;
  vertical-align: -5%;
`;

const Card = styled.div`
  padding: 2rem 1rem 1.5rem 1rem;
  background-color: ${props => props.theme.color.accent1};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    cursor: pointer;
  }

  h3 {
    margin-top: 0px;
    color: ${props => props.theme.color.background};
  }

  a {
    color: ${props => props.theme.color.background};
    margin: 0;
  }
`;

const LastModified = styled.p`
  margin: 0.5rem 0rem 2rem 0rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

const OptionButton = styled(Button)`
  color: ${props => props.theme.color.background};
  background-color: ${props => props.theme.color.accent1};
  border-color: ${props => props.theme.color.accent2};
  padding: 0.25rem 0.5rem;
  background-image: linear-gradient(
    to bottom,
    #fff,
    ${props => props.theme.color.accent1}
  );
  cursor: no-drop;
  margin-left: 2rem;
`;

NoteCard.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    folderId: PropTypes.string,
    id: PropTypes.number,
    modified: PropTypes.string,
    name: PropTypes.string
  })
};

export default NoteCard;
