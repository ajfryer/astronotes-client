import React from 'react';
import styled from 'styled-components';
import NoteCard from 'components/Main/NoteCard';

const NoteListContainer = styled.ul`
  list-style: none;
  padding-left: 0;
  li {
    margin: 2rem 0;
  }
`;

const NoteList = props => {
  return (
    <>
      <NoteListContainer>
        {props.notes.map(note => (
          <li key={note.id}>
            <NoteCard note={note} />
          </li>
        ))}
      </NoteListContainer>
      <button>Add Note</button>
    </>
  );
};

export default NoteList;
