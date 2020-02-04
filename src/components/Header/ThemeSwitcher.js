import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import AppContext from 'contexts/AppContext';

const Form = styled.form`
  label {
    font-weight: bold;
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

const ThemeSwitcher = props => {
  const value = useContext(AppContext);
  /*
  const renderItem = (destination, index) => {
    return (
      <KitDropdownItem
        onSelect={() => props.setDestinationIndex(index)}
        key={index}
      >
        {destination.title}
      </KitDropdownItem>
    );
  };*/

  /*
  const renderDestinationMenu = () => {
    const { destinations, destinationIndex: current } = props;
    return (
      <KitDropdown
        alignRight
        label={destinations[current].title}
        items={props.destinations.map((destination, index) =>
          renderItem(destination, index)
        )}
      />
    );
  };*/

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
  /*
  return (
    <Container onClick={props.toggleTheme}>
      {props.isDarkTheme ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </Container>
  );*/
};

export default ThemeSwitcher;
