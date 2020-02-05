// core dependencies
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// custom components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

/*
 * Brand Component
 * ===============
 * - pre-built brand component
 * - Only one view
 *
 */
const Brand = props => {
  return (
    <Container to='/'>
      <Logo icon={faUserAstronaut} />
      <Name>
        Astronotes
        <Slogan>Notetaking For Spaceheads</Slogan>
      </Name>
    </Container>
  );
};

// custom styled components
const Container = styled(Link)`
  display: flex;

  &:hover {
    text-decoration: none;
  }
`;

const Logo = styled(FontAwesomeIcon)`
  color: ${props => props.theme.color.background};
  height: 100%;
  align-self: center;
  font-size: 2.5rem;
  margin: auto 0.5rem auto auto;

  @media only screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

const Name = styled.h1`
  color: ${props => props.theme.color.background};
  margin: 0;
  display: flex;
  flex-direction: column;
  max-width: 13rem;
  margin: auto auto;

  @media only screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
`;

const Slogan = styled.span`
  color: ${props => props.theme.color.background};
  font-size: 0.87rem;
  font-weight: normal;

  @media only screen and (max-width: 450px) {
    display: none;
  }
`;

export default Brand;
