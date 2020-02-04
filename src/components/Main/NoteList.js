import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import NoteCard from 'components/Main/NoteCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppContext from 'contexts/AppContext';

const PlusIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  font-size: 75%;
  vertical-align: 0%;
`;

const NoteIcon = styled(FontAwesomeIcon)``;

const AddNoteIcon = styled.div`
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  svg {
    margin-right: 0.5rem;
  }
`;

const AddNoteLink = styled(Link)`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: 0.25rem dashed ${props => props.theme.color.foreground};
  color: ${props => props.theme.color.foreground};

  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NoteListContainer = styled.ul`
  list-style: none;
  padding-left: 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  grid-gap: 1rem;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
`;

const Container = styled.div`
  h2 {
    text-align: center;
  }
`;

const NoteList = props => {
  const params = useParams();
  const { notes } = useContext(AppContext);
  let renderNotes = notes;
  if (params.folderId)
    renderNotes = notes.filter(note => note.folderId === params.folderId);
  return (
    <Container>
      <Title>
        <FontAwesomeIcon icon={faStickyNote} />
        Notes
      </Title>
      <NoteListContainer>
        {renderNotes.map(note => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              <NoteCard note={note} />
            </Link>
          </li>
        ))}
        <li>
          <AddNoteLink to={`/addnote`}>
            <AddNoteIcon>
              <PlusIcon icon={faPlus} />
              <NoteIcon icon={faStickyNote} />
            </AddNoteIcon>
            Add New Note
          </AddNoteLink>
        </li>
      </NoteListContainer>
    </Container>
  );
};

export default NoteList;
