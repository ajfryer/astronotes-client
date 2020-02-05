// core dependencies
import React from 'react';
import styled from 'styled-components';
// custom components
import ThemeSwitcher from 'components/Header/ThemeSwitcher';
import Brand from 'components/Header/Brand';

/*
 * Header Component
 * ================
 * - Grid Area Container
 * - Only one view
 *
 */
const Header = props => {
  return (
    <Container>
      <Brand />
      <ThemeSwitcher />
    </Container>
  );
};

// custom styled components
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
