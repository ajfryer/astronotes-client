import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import NoteCard from 'components/Main/NoteCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faPlus } from '@fortawesome/free-solid-svg-icons';
import Context from 'context/Context';

const AddNoteIcon = styled.div``;

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
  margin: 0.5rem 0;
  justify-content: center;
`;

const AddNoteLink = styled(Link)`
  text-align: center;
  display: flex;
  padding: 0rem 0rem;
  font-weight: normal;
  text-decoration: none;
  height: auto;
  max-width: 125px;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.color.background};
  background-color: ${props => props.theme.color.accent1};
  border-color: ${props => props.theme.color.accent2};
  padding: 0.25rem 0.5rem;
  background-image: linear-gradient(
    to bottom,
    #fff,
    ${props => props.theme.color.accent1}
  );

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    text-decoration: none;
  }
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
  const { notes } = useContext(Context);
  let renderNotes = notes;
  if (params.folderId)
    renderNotes = notes.filter(note => note.folderId === params.folderId);
  return (
    <Container>
      <Header>
        <Title>
          <FontAwesomeIcon icon={faStickyNote} />
          Notes
        </Title>
        <AddNoteLink to={`/addnote`}>
          <AddNoteIcon>
            <span className='fa-layers fa-fw'>
              <FontAwesomeIcon icon={faStickyNote} />
              <FontAwesomeIcon
                icon={faPlus}
                className='fa-inverse'
                style={{ fontSize: '50%' }}
              />
            </span>
          </AddNoteIcon>
          Add Note
        </AddNoteLink>
      </Header>
      <NoteListContainer>
        {renderNotes.map(note => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              <NoteCard note={note} />
            </Link>
          </li>
        ))}
      </NoteListContainer>
    </Container>
  );
};

export default NoteList;
