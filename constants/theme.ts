import colors from './colors';

const theme = {
  colors,

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    none: 0,
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32,
    full: 999,
  },

  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
  },

  fonts: {
    regular: 'System',
    bold: 'System',
    // Możesz podmienić np. na Poppins, Inter itp. gdy dodasz czcionki
  },
};

export default theme;
