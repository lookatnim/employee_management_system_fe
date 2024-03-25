import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EmployeeAdd from "./pages/EmployeeAdd/employeeAdd";
import EmployeeEdit from "./pages/EmployeeEdit/employeeEdit";
import EmployeeHome from "./pages/EmployeeList/employeeHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/employee/list",
    element: <EmployeeHome />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "employee/add",
    element: <EmployeeAdd />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "employee/edit/:id",
    element: <EmployeeEdit />,
    errorElement: <div>404 Not Found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
  </React.StrictMode>
);
