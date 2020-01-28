import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoteCard from 'components/Main/NoteCard';
import AppContext from 'contexts/AppContext';

const NoteContentContainer = styled.div``;

const NoteContent = props => {
  const params = useParams();
  const { notes } = useContext(AppContext);
  const note = notes.find(note => note.id === params.noteId);
  return (
    <NoteContentContainer>
      <NoteCard note={note} content={note.content} />
    </NoteContentContainer>
  );
};

export default NoteContent;
