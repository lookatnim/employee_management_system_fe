import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Card, CardActions, CardContent, Grid } from "@mui/material";

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should only contain alphabets")
    .min(6, "First name should be at least 6 characters")
    .max(10, "First name should be at most 10 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should only contain alphabets")
    .min(6, "Last name should be at least 6 characters")
    .max(10, "Last name should be at most 10 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^(?:\+?94)?(?:\(0\))?\d{9}$/, "Invalid LK phone number")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const EmployeeForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid item xs={6}>
        <Card>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                id="gender"
                name="gender"
                select
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                style={{ marginBottom: "10px" }}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
