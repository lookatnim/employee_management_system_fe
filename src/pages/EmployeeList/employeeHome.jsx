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

const EmployeeHome = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);

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
        // Cell: ({ renderedCellValue, row }) => {
        //   console.log(row.original);
        //   return <>{renderedCellValue}</>;
        // },
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
        title={<Typography variant="h2">EMS</Typography>}
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
                //   onClick={() => {
                //     table.setEditingRow(row);
                //   }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                //   onClick={() => {
                //     data.splice(row.index, 1); //assuming simple data table
                //     setData([...data]);
                //   }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeHome;
