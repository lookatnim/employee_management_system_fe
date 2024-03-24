import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm";
import Logo from "../../assets/images/EMS_Logo.png";
import { Home } from "@mui/icons-material";
import Axios from "axios";
import {
  handleErrorMassage,
  handleSuccessResponse,
} from "../../components/Tost/Response";

const EmployeeAdd = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
    createEmployee(values);
  };

  const createEmployee = async (values) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}employee`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        handleSuccessResponse(response.data.message);
        navigate("/employee/list");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.reload();
      } else {
        console.log(error.response.data);
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
            style={{ width: "75px", height: "75px" }}
          />
        }
        title={<Typography variant="h2">Add Employee</Typography>}
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
        <EmployeeForm initialValues={initialValues} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
};

export default EmployeeAdd;
