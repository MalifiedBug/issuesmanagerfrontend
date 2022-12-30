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
import DeleteIcon from '@mui/icons-material/Delete';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useState } from "react";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { serverUrl } from "../App";

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
  const [uniqueUsers,setUniqueUsers] = useState([])
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleteResponse,setDeleteResponse] = useState([])

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

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

 async function handleDelete(id){
   await axios.delete(`${serverUrl}/deleteissue/${id}`).then(response =>{setDeleteResponse(response);alert("issue deleted")})
    setDeleteOpen(false)
  }

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

      const users = await axios.get(`${serverUrl}/uniqueusers`).then((response)=>{setUniqueUsers(response.data.users);console.log(response.data)})
      console.log(users)
    })();
  }, [updateResponse, name, deleteResponse]);

  function createData(
    id,
    name,
    issueType,
    issueTitle,
    issueDescription,
    status,
    date
  ) {
    return { id,name, issueType, issueTitle, issueDescription, status, date };
  }

  const rows = data.map((ele) =>
    createData(
      ele._id,
      ele.name,
      ele.issueType,
      ele.issueTitle,
      ele.issueDescription,
      ele.status,
      ele.date
    )
  );

  const users = uniqueUsers; 

  return (
    <>
      {admin === "true" ? (
        <div className="text-2xl text-left p-2 text-stone-800 font-serif bg-slate-400">
          <label for="users">Select User: </label>
          <select 
          className="p-2 rounded-lg"
            onChange={(e) => {
              setUser(e.target.value);
            }}
            id="users"
          >
            {users.map((u) => (
              <option value={u} selected={u===name?true:false}>{u}</option>
            ))}
          </select>
        </div>
      ) : null}
      <TableContainer component={Paper} className="px-2">
        <h1 className="text-2xl font-serif text-left p-4">User-{name}</h1>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Ticket-Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Controls</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{index+1}</StyledTableCell>
                <StyledTableCell
                  className="break-all"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.issueType}</StyledTableCell>
                <StyledTableCell align="left">{row.issueTitle}</StyledTableCell>
                <StyledTableCell align="left" className="break-all">
                  {row.issueDescription}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status==="pending"?<h1 className="text-orange-400">Pending</h1>:<h1 className="text-green-400">Resolved</h1>}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left" className="flex flex-row">
                  {row.status !== "resolved" ? (
                    <div>
                      <IconButton onClick={handleEditOpen}>
                        <DriveFileRenameOutlineIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleDeleteOpen}>
                      <DeleteIcon />
                    </IconButton>
                    </div>
                  ) : (
                    "Resolved"
                  )}
                </StyledTableCell>
                <Dialog open={editOpen} onClose={handleEditClose}>
                  <DialogTitle>Edit {row.issueType} Issue!</DialogTitle>
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
                        <MySelect className="p-1 m-1 rounded-lg text-xl" label="Issue Type: " name="issueType">
                          <option value="">Select a job type</option>
                          <option value="Maintainance">Maintainance</option>
                          <option value="Hygeine">Hygeine</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Other">Other</option>
                        </MySelect>
                        <MyTextInput
                          className="border-2 rounded-lg p-1"
                          label="Issue Title:"
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
                        <button className="border rounded-lg hover:bg-gray-300" type="submit">Submit</button>
                      </Form>
                    </Formik>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                  <DialogTitle>Delete {row.issueType} Issue!</DialogTitle>
                  <DialogContent  className="self-center">
                    Are you sure? <button onClick={()=>handleDelete(row.id)} className="border bg-red-500 text-white rounded-lg p-1">Delete</button>
                  </DialogContent> 
                  <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
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
