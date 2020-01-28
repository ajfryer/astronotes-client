import React, { useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/common/Button';
import AppContext from 'contexts/AppContext';

const TitleIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const DeleteNoteIcon = styled(FontAwesomeIcon)`
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

  button {
  }

  figure {
    max-height: 220px;
    overflow: hidden;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    position: relative;
    margin: 0;
  }

  img {
    width: 100%;
  }

  figcaption {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
  }

  h3 {
  }

  a {
    color: ${props => props.theme.color.background};
    margin: 0;
  }

  p {
  }
`;

const LastModified = styled.p`
  margin: 0.5rem 0rem 2rem 0rem;
`;

const DeleteButton = styled(Button)`
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
`;

const NoteCard = props => {
  const history = useHistory();
  const params = useParams();
  const { deleteNote } = useContext(AppContext);
  //handle the button click
  const handleDeleteClick = (event, noteId) => {
    event.preventDefault();
    event.stopPropagation();
    deleteNote(noteId);
    if (params.noteId === String(noteId)) history.push('/');
  };
  return (
    <Card>
      {/*
      <figure>
        <img
          src='https://uploads.codesandbox.io/uploads/user/13a9d4ab-104d-4152-bf41-621a9097470b/JBWA-luna.jpg'
          alt='beer!'
        />
        <figcaption></figcaption>
      </figure>      
      */}
      <h3>
        <TitleIcon icon={faStickyNote} />
        {props.note.name}
      </h3>
      <LastModified>
        Last modified on {moment(props.note.modified).format('Do MMM YYYY')}
      </LastModified>
      {props.content &&
        props.content.split(/\n \r|\n/).map((para, i) => <p key={i}>{para}</p>)}
      <DeleteButton onClick={event => handleDeleteClick(event, props.note.id)}>
        <DeleteNoteIcon icon={faTrash} />
        Delete
      </DeleteButton>
    </Card>
  );
};

export default NoteCard;
