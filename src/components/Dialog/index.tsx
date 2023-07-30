import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
interface IDialog {
  title: string;
  handleAgree: () => void;
  open: boolean;
  onRequestClose: () => void;
}
const MyDialog = ({ title, handleAgree, open, onRequestClose }: IDialog) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={onRequestClose}>取消</Button>
          <Button onClick={handleAgree}>確定</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyDialog;
