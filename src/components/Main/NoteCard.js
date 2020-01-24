import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as moment from 'moment';

const Card = styled.div`
  background-color: ${props => props.theme.color.surface};
  padding: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const NoteCard = props => {
  return (
    <Card>
      <h2>
        <Link to={`/note/${props.note.id}`}>{props.note.name}</Link>
      </h2>
      <p>
        Last modified on {moment(props.note.modified).format('Do MMM YYYY')}
      </p>
      <button>Delete</button>
    </Card>
  );
};

export default NoteCard;
