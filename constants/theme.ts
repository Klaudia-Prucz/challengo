const colors = {
  primary: {
    base: '#3F51B5',
    hover: '#3547A3',
    pressed: '#2B3C91',
    disabled: '#BCC3E0',
    light: '#E5E9F7',
  },
  accent: {
    base: '#FF914D',
    pressed: '#E76617',
    disabled: '#FFD7BF',
    light: '#FFF2EB',
  },
  text: {
    primary: '#333333',
    secondary: '#555555',
    muted: '#888888',
    disabled: '#BBBBBB',
    onPrimary: '#FFFFFF',
  },
  background: '#FFFFFF',
  backgroundLight: '#FFFDF9',
  lightGray: '#F0F0F0',
  gray: '#D9D9D9',
  darkGray: '#777777',
  lightPink: '#FFE9EE',
  peachLight: '#FFF2EB',
  primaryDark: '#2B3C91',
  textDark: '#333333',
};

const fonts = {
  regular: 'Fredoka-Regular',
  medium: 'Fredoka-Medium',
  bold: 'Fredoka-Bold',
  light: 'Fredoka-Light',
};

const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
};

const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  full: 1000,
};

const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};

const theme = {
  colors,
  fonts,
  fontSizes,
  spacing,
  radius,
  shadows,
};

export default theme;
