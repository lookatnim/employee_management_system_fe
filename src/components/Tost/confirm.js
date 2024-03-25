import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Confirm = (props) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const handleDeleteClick = () => {
    setDeleteButtonDisabled(true); // Disable the button
    props.handleDelete();
  };

  const handleDialogClose = () => {
    setDeleteButtonDisabled(false); // Reset button status when the dialog is closed
    props.handleClose();
  };


  return (
    <>
      <Dialog open={props.open} onClose={handleDialogClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteClick} color="primary" disabled={deleteButtonDisabled}>
            {props.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default Confirm;
