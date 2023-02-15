import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TChildren } from '@/type';

const contextDefaultValue = {
  showSnackbar: (msg: string) => {},
};
export const SnackbarContext = createContext(contextDefaultValue);
export const SnackbarProvider = ({ children }: TChildren) => {
  const [message, setMessage] = useState<string>('');
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setOpenSnackBar(true);
  };
  const handleClose = () => {
    setOpenSnackBar(false);
  };
  const providerValue = {
    showSnackbar: showSnackbar,
  };
  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MuiAlert severity="info">{message}</MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
