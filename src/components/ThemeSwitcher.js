import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Container = styled.span`
  font-size: 1.5rem;
`;

const ThemeSwitcher = props => (
  <Container onClick={props.toggleTheme}>
    {props.isDarkTheme ? (
      <FontAwesomeIcon icon={faSun} />
    ) : (
      <FontAwesomeIcon icon={faMoon} />
    )}
  </Container>
);

export default ThemeSwitcher;
