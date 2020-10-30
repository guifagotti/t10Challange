import { createMuiTheme } from '@material-ui/core/styles';


declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    themeName?: string
  }
}

const themeName = 'T10Challenge';

const palette = {
  primary: { main: '#5cc3dd' },
  secondary: { main: '#ffffff' }
};

const typography = {
  fontFamily: 'Microsoft Sans Serif',
}

export const ThemeUI = createMuiTheme({ palette, typography, themeName });
