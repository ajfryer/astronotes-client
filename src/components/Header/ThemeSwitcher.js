import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import Context from 'context/Context';

/*
 * ThemeSwitcher Component
 * ===============
 * - form to switch between themes
 *
 */
const ThemeSwitcher = props => {
  const value = useContext(Context);
  return (
    <Form>
      <label>
        <ThemeSwitcherIcon icon={faPalette} />
        Theme:
      </label>
      <Select value={value.theme} onChange={value.switchTheme}>
        <option value='moon'>Moon</option>
        <option value='mars'>Mars</option>
        <option value='asteroid'>Asteroid</option>
        <option value='europa'>Europa</option>
        <option value='jupiter'>Jupiter</option>
        <option value='titan'>Titan</option>
        <option value='neptune'>Neptune</option>
        <option value='pluto'>Pluto</option>
      </Select>
    </Form>
  );
};

const Form = styled.form`
  label {
    font-weight: bold;
  }
  display: flex;
  align-items: center;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    label {
      display: none;
    }
  }
`;

const ThemeSwitcherIcon = styled(FontAwesomeIcon)`
  margin-right: 0.25rem;
`;

const Select = styled.select`
  border-color: ${props => props.theme.color.accent2};
  background-color: ${props => props.theme.color.accent1};
  color: ${props => props.theme.color.background};
  margin-left: 0.5rem;
  padding: 1rem 0.25rem;
  border-radius: 0.25rem;
  background-image: linear-gradient(
    to bottom,
    #fff,
    ${props => props.theme.color.accent1}
  );

  &:hover {
    cursor: pointer;
  }
`;

export default ThemeSwitcher;
