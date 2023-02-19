import { SnackbarContext } from '../context/snackbarContext';
import { useContext } from 'react';

const useSnackbar = () => useContext(SnackbarContext);
export default useSnackbar;
