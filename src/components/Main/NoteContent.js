import React from 'react';
import styled from 'styled-components';
import NoteCard from 'components/Main/NoteCard';

const NoteContentContainer = styled.div``;

const NoteContent = props => {
  return (
    <NoteContentContainer>
      <NoteCard note={props.note} />
      {props.note.content.split(/\n \r|\n/).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </NoteContentContainer>
  );
};

export default NoteContent;
