import React from "react";
import { useLocation } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/Form/EmployeeForm";
import Logo from "../../assets/images/EMS_Logo.png";
import { Home } from "@mui/icons-material";
import Axios from "axios";
import {
  handleErrorMassage,
  handleSuccessResponse,
} from "../../components/Tost/Response";

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialValues = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    phoneNumber: state.phoneNumber,
    gender: state.gender,
    salary: state.salary,
  };

  const handleUpdate = (values) => {
    updateEmployee(values);
  };

  const updateEmployee = async (values) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}employee/${state._id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        handleSuccessResponse(response.data.message);
        navigate("/employee/list");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.reload();
      } else {
        handleErrorMassage(error.response.data.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <img
            src={Logo}
            alt="icon"
            style={{ width: "50px", height: "50px" }}
          />
        }
        title={<Typography variant="h3">Edit Employee</Typography>}
      />
      <CardActionArea>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          onClick={() => {
            navigate("/employee/list");
          }}
          style={{ flex: 1, marginLeft: "20px" }}
        >
          Home
        </Button>
      </CardActionArea>
      <CardContent>
        <EmployeeForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          btnText="Update"
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeEdit;
