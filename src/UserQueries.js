import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { IconButton } from "@mui/material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useState } from "react";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { serverUrl } from "./App";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-left px-1 text-xl"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="text-xl" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserQueries() {
  const [editOpen, setEditOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [updateResponse, setUpdateResponse] = useState([]);
  const [user, setUser] = useState("");

  var name = user;

  let admin = window.localStorage.getItem("admin");

  if (user === "") {
    name = window.localStorage.getItem("user");
  } else {
    name = user;
  }

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  async function handleEditSubmit(id, values) {
    const submit = await axios
      .put(`${serverUrl}/editissue/${id}`, values)
      .then((response) => {
        setUpdateResponse(response);
      });

    console.log(submit);
  }

  useEffect(() => {
    (async () => {
      const data = await axios
        .get(`${serverUrl}/issue/${name}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error));
      console.log(data);
    })();
  }, [updateResponse, name]);

  function createData(
    id,
    issueType,
    issueTitle,
    issueDescription,
    status,
    date
  ) {
    return { id, issueType, issueTitle, issueDescription, status, date };
  }

  const rows = data.map((ele) =>
    createData(
      ele._id,
      ele.issueType,
      ele.issueTitle,
      ele.issueDescription,
      ele.status,
      ele.date
    )
  );

  const users = ["Tharun", "Varun"];

  return (
    <>
      {admin === "true" ? (
        <div className="text-2xl m-2 text-stone-800 font-serif">
          <label for="users">Select User: </label>
          <select 
          className="p-2 rounded-lg"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            id="users"
          >
            {users.map((u) => (
              <option value={u}>{u}</option>
            ))}
          </select>
        </div>
      ) : null}
      <TableContainer component={Paper} className="px-2">
        <h1 className="text-2xl font-serif text-left p-4">User-{name}</h1>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Controls</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  className="break-all"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.issueType}</StyledTableCell>
                <StyledTableCell align="left">{row.issueTitle}</StyledTableCell>
                <StyledTableCell align="left" className="break-all">
                  {row.issueDescription}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left" className="flex flex-row">
                  {row.status !== "resolved" ? (
                    <IconButton onClick={handleEditOpen}>
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                  ) : (
                    "Resolved"
                  )}
                </StyledTableCell>
                <Dialog open={editOpen} onClose={handleEditClose}>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogContent>
                    <Formik
                      initialValues={{
                        issueType: row.issueType, // added for our select
                        issueTitle: row.issueTitle,
                        issueDescription: row.issueDescription,
                      }}
                      validationSchema={Yup.object({
                        issueType: Yup.string().oneOf(
                          ["Maintainance", "Hygeine", "Electrical", "Other"],
                          "Invalid Job Type"
                        ),
                        issueTitle: Yup.string(),
                        issueDescription: Yup.string(),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          setSubmitting(false);
                        }, 400);
                        handleEditSubmit(row.id, values)
                          .then(alert("Issue Edited Successfully"))
                          .then(handleEditClose());
                      }}
                    >
                      <Form className="flex flex-col m-2 gap-2 border-4 border-black rounded-lg p-2">
                        <MySelect label="Issue Type: " name="issueType">
                          <option value="">Select a job type</option>
                          <option value="Maintainance">Maintainance</option>
                          <option value="Hygeine">Hygeine</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Other">Other</option>
                        </MySelect>
                        <MyTextInput
                          className="border-2 rounded-lg p-1"
                          label="Issue Title"
                          name="issueTitle"
                          type="text"
                          placeholder="Title"
                        />
                        <MyTextArea
                          className="border-2 rounded-lg p-1"
                          name="issueDescription"
                          type="text"
                          placeholder="Description"
                        />
                        <button type="submit">Submit</button>
                      </Form>
                    </Formik>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditClose}>Subscribe</Button>
                  </DialogActions>
                </Dialog>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
