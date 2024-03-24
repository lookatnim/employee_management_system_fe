import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../../assets/images/EMS_Logo.png";
import { useNavigate } from "react-router";
import {
  handleErrorMassage,
  handleSuccessResponse,
} from "../../components/Tost/Response";
import Confirm from "../../components/Tost/confirm";

const EmployeeHome = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingID] = useState(0);

  const fetchEmployee = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}employee`
      );

      if (response.status === 200) {
        setEmpData(response.data);
      }
    } catch (error) {
      console.error("Error getting employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phoneNumber",
        header: "Mobile Number",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
    ],
    []
  );

  const deleteEmployee = async () => {
    try {
      const response = await Axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}employee/${deletingId}`
      );

      if (response.status === 200) {
        handleSuccessResponse(response.data.message);
        fetchEmployee();
        handleConfirmClose();
      }
    } catch (error) {
      handleErrorMassage(error.response.data.message);
    }
  };

  const redirectToEdit = (data) => {
    navigate(`/employee/edit/${data._id}`, { state: data });
  };

  const handleConfirmClose = () => {
    setIsOpen(false);
    setDeletingID(0);
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
        title={<Typography variant="h3">Employee Management System</Typography>}
      />
      <CardActionArea>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/employee/add");
          }}
          style={{ flex: 1, marginLeft: "20px" }}
        >
          Add Employee
        </Button>
      </CardActionArea>
      <CardContent>
        <MaterialReactTable
          columns={columns}
          data={empData}
          layoutMode="grid"
          displayColumnDefOptions={{
            "mrt-row-actions": {
              size: 180,
              grow: false,
            },
          }}
          enableRowNumbers
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                onClick={() => {
                  redirectToEdit(row.original);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setDeletingID(row.original._id);
                  setIsOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />

        {isOpen && (
          <Confirm
            open={isOpen}
            desc={`Are you sure you want to delete this employee?`}
            title="Confirm Delete"
            buttonText="Delete"
            handleClose={handleConfirmClose}
            handleDelete={deleteEmployee}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeHome;
