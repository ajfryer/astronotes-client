// core dependencies: react and styled components
import React from 'react';
import styled from 'styled-components';

const Page = props => {
  return <Container>{props.children}</Container>;
};

// custom styled components
const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'nav content';
  grid-template-columns: minmax(100px, 290px) 1fr;
  grid-template-rows: 80px 1fr;
  grid-gap: 0rem;
  row-gap: 0rem;
  height: 100vh;

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      'header header'
      'nav nav'
      'content content';
  }
`;

export default Page;
