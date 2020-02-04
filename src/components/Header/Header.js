import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeSwitcher from 'components/Header/ThemeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

/*
 * Component
 * =========
 * - lowest common ancestor component
 *
 */

const Header = props => {
  return (
    <Container>
      <Brand to='/'>
        <Logo>
          <FontAwesomeIcon icon={faUserAstronaut} />
        </Logo>
        <div>
          <Name>Astronotes</Name>
          <Slogan>Notetaking For Spaceheads</Slogan>
        </div>
      </Brand>
      <ThemeSwitcher />
    </Container>
  );
};

// custom styled components
const Brand = styled(Link)`
  display: flex;
`;

const Name = styled.h1`
  color: ${props => props.theme.color.background};
  margin: 0;
`;

const Logo = styled.div`
  color: ${props => props.theme.color.background};
  font-size: 2.5rem;
  align-self: center;
  margin-right: 1rem;
`;

const Slogan = styled.span`
  color: ${props => props.theme.color.background};
`;

const Container = styled.header`
  grid-area: header;
  padding: 0 15px;
  background-color: ${props => props.theme.color.foreground};
  color: ${props => props.theme.color.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1030;
`;

export default Header;
