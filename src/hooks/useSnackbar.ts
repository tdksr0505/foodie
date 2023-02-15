import { SnackbarContext } from '../context/snackbarContext';
import { useContext } from 'react';

export const useSnackbar = () => useContext(SnackbarContext);
