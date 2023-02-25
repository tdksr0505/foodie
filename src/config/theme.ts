import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#f0a4c6',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#f0a4c6',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#f0a4c6',
        },
      },
    },
  },
});
export default theme;
