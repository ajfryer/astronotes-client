import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeSwitcher from 'components/ThemeSwitcher';

const Title = styled.h1``;

const AppHeader = props => {
  return (
    <>
      <Title>
        <Link to='/'>Noteful</Link>{' '}
      </Title>
      <ThemeSwitcher
        toggleTheme={props.toggleTheme}
        isDarkTheme={props.isDarkTheme}
      />
    </>
  );
};

export default AppHeader;
