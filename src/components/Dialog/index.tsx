import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
interface IDialog {
  title: string;
  handleAgree: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default ({ title, handleAgree, open, setOpen }: IDialog) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAgree}>確定</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
