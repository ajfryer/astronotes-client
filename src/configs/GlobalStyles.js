import { createGlobalStyle } from 'styled-components';

// global app styles
export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.color.foreground};
    font-family: ${props => props.theme.font.lato};
    color: ${props => props.theme.color.text2};
    font-weight: normal;
  }
  a {
    color: ${props => props.theme.color.background};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  h1,h2,h3,h4,h5,h6 {
    color: ${props => props.theme.color.foreground};
    font-weight: normal;
    font-family: ${props => props.theme.font.montserrat};
    margin: 1rem 0;
  }
  h2 {
    font-weight: 600;
  }
  h1 {
    font-weight: 900;
  }
`;
