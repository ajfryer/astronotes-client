import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeSwitcher from 'components/Header/ThemeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

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

const AppHeader = props => {
  return (
    <>
      <Brand to='/'>
        <Logo>
          <FontAwesomeIcon icon={faUserAstronaut} />
        </Logo>
        <div>
          <Name>Astronotes</Name>
          <Slogan>Notetaking For Spaceheads</Slogan>
        </div>
      </Brand>
      <ThemeSwitcher switchTheme={props.switchTheme} theme={props.theme} />
    </>
  );
};

export default AppHeader;
