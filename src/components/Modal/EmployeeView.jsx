import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

const EmployeeView = (props) => {
  const {
    isOpen,
    handleClose,
    setDeletingID,
    setIsOpen,
    handleEdit,
    employeeData,
  } = props;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "-40px" }}>
          <Typography variant="h5" component="div" gutterBottom>
            Employee Details
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="subtitle1">First Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employeeData.firstName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Last Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employeeData.lastName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employeeData.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Mobile:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employeeData.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Gender:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{employeeData.gender}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDeletingID(employeeData._id);
              setIsOpen(true);
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={() => {
              handleEdit(employeeData);
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmployeeView;
