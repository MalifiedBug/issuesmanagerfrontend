import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { serverUrl } from "./App";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function AdminQueries() {
  const [data, setData] = useState([]);

  const [updateAdminResponse, setUpdateAdminResponse] = useState("");

  const [deleteQResponse,setDeleteQResponse] = useState("")

  const [uniqueUsers, setUniqueUsers] = useState([]) 
  console.log(uniqueUsers) 

  const adminName = window.localStorage.getItem("user");

  useEffect(() => {
    (async () => {
      const data = await axios
        .get(`${serverUrl}/allissues`)
        .then((response) => {
          setData(response.data);
          console.log(response.data)
          var names = Array(new Set(response.data.map(({name})=>name)))
          setUniqueUsers(names[0])
        })
        .catch((error) => console.log(error));
      console.log(data);
    })();
  }, [updateAdminResponse, deleteQResponse]);

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

  async function ChangeStatus(id) {
    const statusResponse = await axios
      .put(`${serverUrl}/updateissue/${id}`, {
        status: "resolved",
      })
      .then((response) => {
        setUpdateAdminResponse(response);
      });
    console.log(statusResponse);
  }

  async function deleteQueries(){
    const queriesDelete = await axios.delete(`${serverUrl}/deleteresolved`).then(response=>setDeleteQResponse(response))
    console.log(queriesDelete)
  }

  return (
    <TableContainer component={Paper} className="px-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-serif text-left p-4">Admin - {adminName}</h1>
        <h1 className="self-center text-md">Delete Resolved Queries <IconButton onClick={()=>{deleteQueries()}} color="error"><DeleteIcon /></IconButton></h1>
      </div>
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
              <StyledTableCell>{index+1}</StyledTableCell>
              <StyledTableCell className="break-all" component="th" scope="row">
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
              <StyledTableCell align="left">
                <IconButton
                  onClick={() => {
                    if (row.status === "pending") {
                      ChangeStatus(row.id);
                    } else {
                      alert("already resolved");
                    }
                  }}
                >
                  {row.status !== "resolved" ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <CheckCircleIcon sx={{ color: green[500] }} />
                  )}
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
