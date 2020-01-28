// light and dark themes
const baseTheme = {
  fontSize: {
    small: '0.85rem',
    normal: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
    xxLarge: '2rem'
  },
  font: {
    montserrat: "'Montserrat', sans-serif;",
    lato: "'Lato', sans-serif;"
  },
  fontWeight: {
    normal: '400',
    bold: '700'
  },
  space: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    extraLarge: '4rem'
  },
  breakpoint: {
    medium: '600px',
    large: '1000px'
  }
};

const moon = {
  ...baseTheme,
  color: {
    background: '#1c4958',
    foreground: '#a1ccde',

    accent1: '#f4c8a5',
    accent2: '#b47368',
    accent3: '#923621',

    text1: '#c6cfd3',
    text2: '#808186'
  }
};

const mars = {
  ...baseTheme,
  color: {
    background: '#a53237',
    foreground: '#f66f40',

    accent1: '#f8986d',
    accent2: '#9c4952',
    accent3: '#f66f40',

    text1: '#f5e5e1',
    text2: '#354f55'
  }
};

const asteroid = {
  ...baseTheme,
  color: {
    background: '#43505c',
    foreground: '#888b8e',

    accent1: '#f5dda1',
    accent2: '#e4b634',
    accent3: '#c29f37',

    text1: '#f2ece6',
    text2: '#5a5a4a'
  }
};

const europa = {
  ...baseTheme,
  color: {
    background: '#24468a',
    foreground: '#0d9ff0',

    accent1: '#de885f',
    accent2: '#f58746',
    accent3: '#a16e63',

    text1: '#7d9cc0',
    text2: '#544577'
  }
};

const jupiter = {
  ...baseTheme,
  color: {
    background: '#cc3404',
    foreground: '#ee7814',

    accent1: '#edb190',
    accent2: '#bf715e',
    accent3: '#e8960f',

    text1: '#ebe1d5',
    text2: '#685a5b'
  }
};

const titan = {
  ...baseTheme,
  color: {
    background: '#7c6956',
    foreground: '#f2ddc5',

    accent1: '#efc45a',
    accent2: '#cb9f4a',
    accent3: '#ae8e5a',

    text1: '#e8e7e7',
    text2: '#5c4e46'
  }
};

const neptune = {
  ...baseTheme,
  color: {
    background: '#195f64',
    foreground: '#97d7d5',

    accent1: '#90a7a4',
    accent2: '#a79a6e',
    accent3: '#c29a4b',

    text1: '#f7f4e6',
    text2: '#344e3d'
  }
};

const pluto = {
  ...baseTheme,
  color: {
    background: '#937e81',
    foreground: '#ebeeed',

    accent1: '#a9a3a4',
    accent2: '#638685',
    accent3: '#5b5c5c',

    text1: '#ab9471',
    text2: '#161616'
  }
};

export default {
  moon,
  mars,
  asteroid,
  europa,
  jupiter,
  titan,
  neptune,
  pluto
};
