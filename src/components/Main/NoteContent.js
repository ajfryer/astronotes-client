import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from 'components/Main/NoteCard';
import Context from 'context/Context';

const NoteContentContainer = styled.div``;

const NoteContent = props => {
  const params = useParams();
  console.log(params, typeof params.noteId);
  const { notes } = useContext(Context);
  console.log(notes);
  const note = notes.find(note => note.id === parseInt(params.noteId));
  console.log(note);
  return (
    <NoteContentContainer>
      <NoteCard note={note} content={note.content} />
    </NoteContentContainer>
  );
};

export default NoteContent;
